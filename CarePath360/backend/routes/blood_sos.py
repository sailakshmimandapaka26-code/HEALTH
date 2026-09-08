from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime, timedelta

from database.demo_db import BLOOD_REQUESTS, DONORS, HOSPITALS, NOTIFICATIONS, AUDIT_LOGS
from models.schemas import BloodRequest, BloodRequestStatus, BloodGroup, UrgencyLevel
from services.blood_priority import (
    filter_and_rank_donors,
    calculate_haversine_distance,
    calculate_eta_minutes,
    calculate_operational_priority
)

router = APIRouter(prefix="/blood-sos", tags=["BloodSOS"])

@router.get("/requests", response_model=List[Dict[str, Any]])
def list_blood_requests():
    return sorted(BLOOD_REQUESTS, key=lambda x: x["created_at"], reverse=True)

@router.get("/requests/{request_id}", response_model=Dict[str, Any])
def get_blood_request(request_id: str):
    for req in BLOOD_REQUESTS:
        if req["id"] == request_id:
            return req
    raise HTTPException(status_code=404, detail="Blood emergency request not found")

@router.post("/requests", response_model=Dict[str, Any])
def create_blood_request(payload: Dict[str, Any]):
    hospital_id = payload.get("hospital_id", "hosp-1")
    hospital = next((h for h in HOSPITALS if h["id"] == hospital_id), HOSPITALS[0])
    
    new_req = {
        "id": f"br-{uuid.uuid4().hex[:6]}",
        "hospital_id": hospital["id"],
        "hospital_name": hospital["name"],
        "blood_group": payload.get("blood_group", "B+"),
        "units_required": int(payload.get("units_required", 4)),
        "units_confirmed": 0,
        "urgency": payload.get("urgency", "CRITICAL"),
        "latitude": hospital["latitude"],
        "longitude": hospital["longitude"],
        "radius_km": 1.0,  # Progressive Stage 1 starts at 1 KM
        "status": "ACTIVE",
        "alerted_donors_count": 0,
        "created_at": datetime.utcnow().isoformat() + "Z",
        "expires_at": (datetime.utcnow() + timedelta(hours=3)).isoformat() + "Z",
        "fallback_options": [
            {"name": "Regional Red Cross Blood Hub", "distance_km": 6.8, "contact": "+1 (555) 019-9900", "type": "Blood Bank"},
            {"name": "St. Jude Transfusion Center", "distance_km": 2.1, "contact": "+1 (555) 019-8821", "type": "Partner Hospital"},
            {"name": "Hope Life Blood Network NGO", "distance_km": 8.5, "contact": "+1 (555) 019-7733", "type": "NGO"}
        ]
    }
    
    # Calculate initially discoverable candidates in 1 km
    initial_candidates = filter_and_rank_donors(
        DONORS,
        hospital["latitude"],
        hospital["longitude"],
        new_req["blood_group"],
        1.0
    )
    new_req["alerted_donors_count"] = len(initial_candidates)
    
    # Mark these donors as ALERTED
    for cand in initial_candidates:
        for d in DONORS:
            if d["id"] == cand["id"]:
                d["current_response_status"] = "ALERTED"
                
    BLOOD_REQUESTS.insert(0, new_req)
    
    AUDIT_LOGS.insert(0, {
        "id": f"aud-{uuid.uuid4().hex[:6]}",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "actor_name": hospital["name"],
        "actor_role": "HOSPITAL",
        "action": "EMERGENCY_BLOOD_REQUEST_CREATED",
        "target": f"{new_req['blood_group']} ({new_req['units_required']} units)",
        "details": f"Stage 1 radius: 1 KM. Alerted {len(initial_candidates)} registered opted-in candidates."
    })
    
    return new_req

@router.get("/requests/{request_id}/candidates", response_model=List[Dict[str, Any]])
def get_request_candidates(request_id: str):
    req = next((r for r in BLOOD_REQUESTS if r["id"] == request_id), None)
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
        
    candidates = filter_and_rank_donors(
        DONORS,
        req["latitude"],
        req["longitude"],
        req["blood_group"],
        req["radius_km"]
    )
    return candidates

@router.post("/requests/{request_id}/expand-radius", response_model=Dict[str, Any])
def expand_emergency_radius(request_id: str):
    for idx, req in enumerate(BLOOD_REQUESTS):
        if req["id"] == request_id:
            current_radius = req["radius_km"]
            if current_radius < 3.0:
                new_radius = 3.0
            elif current_radius < 5.0:
                new_radius = 5.0
            else:
                new_radius = current_radius  # Max reached
                
            BLOOD_REQUESTS[idx]["radius_km"] = new_radius
            
            # Re-rank candidates in new radius
            candidates = filter_and_rank_donors(
                DONORS,
                req["latitude"],
                req["longitude"],
                req["blood_group"],
                new_radius
            )
            BLOOD_REQUESTS[idx]["alerted_donors_count"] = len(candidates)
            
            # Mark alerted
            for cand in candidates:
                for d in DONORS:
                    if d["id"] == cand["id"] and d.get("current_response_status") in ["NO_RESPONSE", None]:
                        d["current_response_status"] = "ALERTED"
            
            AUDIT_LOGS.insert(0, {
                "id": f"aud-{uuid.uuid4().hex[:6]}",
                "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
                "actor_name": req["hospital_name"],
                "actor_role": "HOSPITAL",
                "action": "RADIUS_ESCALATED",
                "target": f"Request {request_id}",
                "details": f"Escalated from {current_radius} KM to {new_radius} KM. Total candidates now: {len(candidates)}."
            })
            
            return BLOOD_REQUESTS[idx]
            
    raise HTTPException(status_code=404, detail="Request not found")

@router.post("/requests/{request_id}/respond", response_model=Dict[str, Any])
def record_donor_response(request_id: str, payload: Dict[str, Any]):
    donor_id = payload.get("donor_id")
    response_status = payload.get("status", "ACCEPTED")  # ACCEPTED, DECLINED, ON_THE_WAY
    
    req_idx = next((i for i, r in enumerate(BLOOD_REQUESTS) if r["id"] == request_id), None)
    if req_idx is None:
        raise HTTPException(status_code=404, detail="Request not found")
        
    donor = next((d for d in DONORS if d["id"] == donor_id), None)
    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")
        
    donor["current_response_status"] = response_status
    
    if response_status == "ACCEPTED":
        BLOOD_REQUESTS[req_idx]["units_confirmed"] += 1
        if BLOOD_REQUESTS[req_idx]["units_confirmed"] >= BLOOD_REQUESTS[req_idx]["units_required"]:
            BLOOD_REQUESTS[req_idx]["status"] = "FULFILLED"
            
            AUDIT_LOGS.insert(0, {
                "id": f"aud-{uuid.uuid4().hex[:6]}",
                "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
                "actor_name": "BloodSOS Coordinator",
                "actor_role": "SYSTEM",
                "action": "EMERGENCY_FULFILLED",
                "target": f"Request {request_id}",
                "details": f"Required units reached ({BLOOD_REQUESTS[req_idx]['units_confirmed']}/{BLOOD_REQUESTS[req_idx]['units_required']}). Coordination halted."
            })
            
    return {
        "message": f"Response recorded: {response_status}",
        "request": BLOOD_REQUESTS[req_idx],
        "donor": donor
    }

@router.post("/requests/{request_id}/simulate-hackathon-flow", response_model=Dict[str, Any])
def simulate_hackathon_demo_flow(request_id: str):
    """
    Executes the exact hackathon demo scenario:
    1. Stage 1: 1 KM search (Candidate 1 accepts, Candidate 2 declines) -> 1/4 confirmed
    2. Stage 2: Automatic expansion to 3 KM (2 more candidates accept) -> 3/4 confirmed
    3. Stage 3: 4th candidate accepts -> FULFILLED!
    """
    req_idx = next((i for i, r in enumerate(BLOOD_REQUESTS) if r["id"] == request_id), None)
    if req_idx is None:
        raise HTTPException(status_code=404, detail="Request not found")
        
    req = BLOOD_REQUESTS[req_idx]
    
    # Expand to 3 KM
    req["radius_km"] = 3.0
    req["units_confirmed"] = req["units_required"]  # Fulfill all units
    req["status"] = "FULFILLED"
    
    # Set realistic donor responses for display on map
    # 1 KM donors
    for d in DONORS:
        if d["distance_km"] <= 0.5:
            d["current_response_status"] = "ACCEPTED"
        elif d["distance_km"] <= 1.0:
            d["current_response_status"] = "DECLINED"
        elif 1.0 < d["distance_km"] <= 2.8:
            d["current_response_status"] = "ON_THE_WAY" if d["distance_km"] <= 2.1 else "ACCEPTED"
        elif d["distance_km"] <= 3.0:
            d["current_response_status"] = "ALERTED"
            
    req["alerted_donors_count"] = len([d for d in DONORS if d["distance_km"] <= 3.0 and d["blood_group"] in ["B+", "O-", "O+"]])
    
    return {
        "message": "Emergency simulation completed successfully. 4 units confirmed across progressive radius.",
        "request": req
    }

@router.get("/donors", response_model=List[Dict[str, Any]])
def list_donors(blood_group: Optional[str] = None):
    results = DONORS
    if blood_group:
        results = [d for d in results if d["blood_group"] == blood_group]
    return results

@router.post("/donors/register", response_model=Dict[str, Any])
def register_donor(payload: Dict[str, Any]):
    new_id = f"dnr-{len(DONORS) + 1:03d}"
    new_donor = {
        "id": new_id,
        "name": payload.get("name", "New Registered Donor"),
        "age": int(payload.get("age", 28)),
        "blood_group": payload.get("blood_group", "B+"),
        "phone": payload.get("phone", "+1 (555) 019-9999"),
        "email": payload.get("email", "donor@carepath360.org"),
        "latitude": float(payload.get("latitude", 37.7760)),
        "longitude": float(payload.get("longitude", -122.4180)),
        "available": bool(payload.get("available", True)),
        "verified": True,
        "emergency_opt_in": bool(payload.get("emergency_opt_in", True)),
        "notification_token": f"fcm_token_demo_{new_id}",
        "last_active": "Just registered",
        "response_rate": 95,
        "distance_km": 0.45,
        "eta_minutes": 5,
        "priority_score": 92,
        "match_rationale": "Registered and opted into emergency alerts.",
        "current_response_status": "NO_RESPONSE"
    }
    DONORS.insert(0, new_donor)
    return new_donor
