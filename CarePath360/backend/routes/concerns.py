from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import uuid
from datetime import datetime

from database.demo_db import EMERGENCY_HEALTH_TIMELINE, NOTIFICATIONS, AUDIT_LOGS
from services.ai_engine import triage_health_concern

router = APIRouter(prefix="/concerns", tags=["Health Concerns"])

# In-memory storage for submitted concerns
PATIENT_CONCERNS = [
    {
        "id": "con-1",
        "patient_id": "pat-1",
        "symptom": "Mild tingling sensation in fingertips",
        "start_date": "2025-02-25",
        "duration": "3 days",
        "severity": "Mild",
        "description": "Noticeable primarily when typing or holding cold glasses. No loss of strength.",
        "related_report": None,
        "current_medications": "Tamoxifen 20mg daily",
        "triage_category": "GREEN",
        "triage_guidance": "ROUTINE MONITORING: These symptoms can be documented in your health timeline and reviewed with your doctor during your next scheduled appointment.",
        "created_at": "2025-02-26T14:30:00Z"
    }
]

@router.get("/{patient_id}", response_model=List[Dict[str, Any]])
def get_patient_concerns(patient_id: str):
    return [c for c in PATIENT_CONCERNS if c["patient_id"] == patient_id]

@router.post("", response_model=Dict[str, Any])
def submit_health_concern(payload: Dict[str, Any]):
    patient_id = payload.get("patient_id", "pat-1")
    symptom = payload.get("symptom", "Unspecified symptom")
    severity = payload.get("severity", "Mild")
    duration = payload.get("duration", "1 day")
    description = payload.get("description", "")
    
    triage_result = triage_health_concern(symptom, severity, duration, description)
    
    new_concern = {
        "id": f"con-{uuid.uuid4().hex[:6]}",
        "patient_id": patient_id,
        "symptom": symptom,
        "start_date": payload.get("start_date", datetime.utcnow().strftime("%Y-%m-%d")),
        "duration": duration,
        "severity": severity,
        "description": description,
        "related_report": payload.get("related_report"),
        "current_medications": payload.get("current_medications", "Tamoxifen 20mg daily"),
        "triage_category": triage_result["category"],
        "triage_guidance": triage_result["guidance"],
        "created_at": datetime.utcnow().isoformat() + "Z",
        "disclaimer": "This is a care coordination and decision-support feature only. It does not replace professional medical advice."
    }
    PATIENT_CONCERNS.insert(0, new_concern)
    
    # Log to Emergency Health Timeline
    time_str = datetime.utcnow().strftime("%I:%M %p")
    EMERGENCY_HEALTH_TIMELINE.insert(0, {
        "id": f"eht-{uuid.uuid4().hex[:6]}",
        "patient_id": patient_id,
        "timestamp": time_str,
        "what_changed": f"New symptom reported: {symptom} (Severity: {severity})",
        "who_reported": "Sarah Jenkins (Patient)",
        "severity": triage_result["category"]
    })
    
    # Notify caregiver or care team if YELLOW or RED
    if triage_result["category"] in ["YELLOW", "RED"]:
        NOTIFICATIONS.insert(0, {
            "id": f"notif-{uuid.uuid4().hex[:6]}",
            "user_id": "cg-1",
            "title": f"Health Concern Logged: {symptom}",
            "message": f"Sarah Jenkins reported: {symptom}. Guidance: {triage_result['category']}.",
            "category": "CAREGIVER",
            "is_read": False,
            "timestamp": "Just now",
            "action_url": "/emergency"
        })
        
    AUDIT_LOGS.insert(0, {
        "id": f"aud-{uuid.uuid4().hex[:6]}",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "actor_name": "Patient (pat-1)",
        "actor_role": "PATIENT",
        "action": "REPORTED_HEALTH_CONCERN",
        "target": symptom,
        "details": f"Triaged as {triage_result['category']}."
    })
    
    return new_concern

@router.get("/{patient_id}/emergency-timeline", response_model=List[Dict[str, Any]])
def get_emergency_health_timeline(patient_id: str):
    return [e for e in EMERGENCY_HEALTH_TIMELINE if e["patient_id"] == patient_id]

@router.post("/{patient_id}/emergency-timeline", response_model=Dict[str, Any])
def add_emergency_timeline_entry(patient_id: str, payload: Dict[str, Any]):
    new_entry = {
        "id": f"eht-{uuid.uuid4().hex[:6]}",
        "patient_id": patient_id,
        "timestamp": payload.get("timestamp", datetime.utcnow().strftime("%I:%M %p")),
        "what_changed": payload.get("what_changed", "Condition update recorded"),
        "who_reported": payload.get("who_reported", "Patient"),
        "severity": payload.get("severity", "NORMAL")
    }
    EMERGENCY_HEALTH_TIMELINE.insert(0, new_entry)
    return new_entry
