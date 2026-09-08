from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

from database.demo_db import PATIENTS, DOCTORS, HOSPITALS, DONORS, BLOOD_REQUESTS, APPOINTMENTS, AUDIT_LOGS

router = APIRouter(prefix="/admin", tags=["Admin & Operations"])

@router.get("/statistics")
def get_admin_statistics():
    return {
        "is_demo_data": True,
        "disclaimer": "DEMO DATA — NOT REAL PATIENT OR CLINICAL INFORMATION",
        "summary": {
            "total_patients": len(PATIENTS),
            "active_follow_ups": 14,
            "total_doctors": len(DOCTORS),
            "available_doctors": len([d for d in DOCTORS if d["today_status"] == "AVAILABLE"]),
            "total_hospitals": len(HOSPITALS),
            "registered_donors": len(DONORS),
            "active_blood_requests": len([r for r in BLOOD_REQUESTS if r["status"] == "ACTIVE"]),
            "fulfilled_blood_requests": len([r for r in BLOOD_REQUESTS if r["status"] == "FULFILLED"]),
            "avg_donor_eta_mins": 6.8,
            "emergency_fulfillment_rate": 94.2
        },
        "monthly_care_activity": [
            {"month": "Oct", "survivorship_reviews": 38, "blood_coordinations": 12, "teleconsults": 24},
            {"month": "Nov", "survivorship_reviews": 45, "blood_coordinations": 15, "teleconsults": 30},
            {"month": "Dec", "survivorship_reviews": 52, "blood_coordinations": 18, "teleconsults": 35},
            {"month": "Jan", "survivorship_reviews": 60, "blood_coordinations": 22, "teleconsults": 42},
            {"month": "Feb", "survivorship_reviews": 74, "blood_coordinations": 26, "teleconsults": 48},
            {"month": "Mar", "survivorship_reviews": 85, "blood_coordinations": 31, "teleconsults": 56}
        ],
        "donor_response_speed": [
            {"range": "< 5 min", "count": 16},
            {"range": "5 - 10 min", "count": 22},
            {"range": "10 - 15 min", "count": 8},
            {"range": "> 15 min", "count": 2}
        ]
    }

@router.get("/audit-logs", response_model=List[Dict[str, Any]])
def get_audit_logs():
    return AUDIT_LOGS

@router.put("/verify/{entity_type}/{entity_id}")
def verify_entity(entity_type: str, entity_id: str):
    if entity_type == "hospital":
        for h in HOSPITALS:
            if h["id"] == entity_id:
                h["verified"] = not h.get("verified", False)
                return {"message": f"Hospital {h['name']} verification status set to {h['verified']}", "entity": h}
    elif entity_type == "doctor":
        for d in DOCTORS:
            if d["id"] == entity_id:
                d["verified"] = not d.get("verified", True)
                return {"message": f"Doctor {d['name']} verification status set to {d['verified']}", "entity": d}
    elif entity_type == "donor":
        for d in DONORS:
            if d["id"] == entity_id:
                d["verified"] = not d.get("verified", True)
                return {"message": f"Donor {d['name']} verification status set to {d['verified']}", "entity": d}
    raise HTTPException(status_code=404, detail="Entity not found")
