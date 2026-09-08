from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime

from database.demo_db import APPOINTMENTS, NOTIFICATIONS, AUDIT_LOGS
from models.schemas import Appointment, AppointmentStatus

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.get("", response_model=List[Dict[str, Any]])
def list_appointments(
    patient_id: Optional[str] = None,
    doctor_id: Optional[str] = None,
    hospital_id: Optional[str] = None
):
    results = APPOINTMENTS
    if patient_id:
        results = [a for a in results if a["patient_id"] == patient_id]
    if doctor_id:
        results = [a for a in results if a["doctor_id"] == doctor_id]
    if hospital_id:
        results = [a for a in results if a["hospital_id"] == hospital_id]
    return sorted(results, key=lambda x: x["date"], reverse=True)

@router.post("", response_model=Dict[str, Any])
def book_appointment(payload: Dict[str, Any]):
    new_id = f"apt-{uuid.uuid4().hex[:6]}"
    new_apt = {
        "id": new_id,
        "patient_id": payload.get("patient_id", "pat-1"),
        "patient_name": payload.get("patient_name", "Sarah Jenkins"),
        "hospital_id": payload.get("hospital_id", "hosp-1"),
        "hospital_name": payload.get("hospital_name", "Metro Cancer Institute & Medical Center"),
        "doctor_id": payload.get("doctor_id", "doc-1"),
        "doctor_name": payload.get("doctor_name", "Dr. Priya Sharma"),
        "date": payload.get("date", datetime.utcnow().strftime("%Y-%m-%d")),
        "time_slot": payload.get("time_slot", "04:30 PM"),
        "consultation_type": payload.get("consultation_type", "In-person"),
        "reason": payload.get("reason", "Survivorship Consultation"),
        "status": "PENDING",
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    APPOINTMENTS.insert(0, new_apt)
    
    # Trigger notification for doctor / hospital coordinator
    NOTIFICATIONS.insert(0, {
        "id": f"notif-{uuid.uuid4().hex[:6]}",
        "user_id": payload.get("doctor_id", "doc-1"),
        "title": "New Appointment Request",
        "message": f"New consultation request from {new_apt['patient_name']} for {new_apt['date']} at {new_apt['time_slot']}.",
        "category": "APPOINTMENT",
        "is_read": False,
        "timestamp": "Just now",
        "action_url": "/hospital/appointments"
    })
    
    AUDIT_LOGS.insert(0, {
        "id": f"aud-{uuid.uuid4().hex[:6]}",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "actor_name": new_apt["patient_name"],
        "actor_role": "PATIENT",
        "action": "BOOKED_APPOINTMENT",
        "target": f"{new_apt['doctor_name']} ({new_apt['date']})",
        "details": f"Reason: {new_apt['reason']}"
    })
    
    return new_apt

@router.put("/{appointment_id}/status", response_model=Dict[str, Any])
def update_appointment_status(appointment_id: str, payload: Dict[str, Any]):
    new_status = payload.get("status")
    if not new_status:
        raise HTTPException(status_code=400, detail="Status field is required")
        
    for idx, apt in enumerate(APPOINTMENTS):
        if apt["id"] == appointment_id:
            APPOINTMENTS[idx]["status"] = new_status
            
            # Notify patient of status change
            NOTIFICATIONS.insert(0, {
                "id": f"notif-{uuid.uuid4().hex[:6]}",
                "user_id": apt["patient_id"],
                "title": f"Appointment {new_status.capitalize()}",
                "message": f"Your appointment with {apt['doctor_name']} on {apt['date']} at {apt['time_slot']} is now {new_status}.",
                "category": "APPOINTMENT",
                "is_read": False,
                "timestamp": "Just now",
                "action_url": "/appointments"
            })
            
            AUDIT_LOGS.insert(0, {
                "id": f"aud-{uuid.uuid4().hex[:6]}",
                "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
                "actor_name": "Hospital Staff",
                "actor_role": "HOSPITAL",
                "action": f"APPOINTMENT_{new_status}",
                "target": f"{apt['id']} ({apt['patient_name']})",
                "details": f"Status updated to {new_status}."
            })
            
            return APPOINTMENTS[idx]
            
    raise HTTPException(status_code=404, detail="Appointment not found")
