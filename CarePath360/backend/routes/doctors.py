from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
import uuid

from database.demo_db import DOCTORS, HOSPITALS
from models.schemas import Doctor, DoctorStatus

router = APIRouter(prefix="/doctors", tags=["Doctors"])

@router.get("", response_model=List[Dict[str, Any]])
def list_doctors(
    specialty: Optional[str] = None,
    hospital_id: Optional[str] = None,
    search: Optional[str] = None
):
    results = DOCTORS
    if hospital_id:
        results = [d for d in results if d["hospital_id"] == hospital_id]
    if specialty:
        results = [d for d in results if specialty.lower() in d["specialization"].lower()]
    if search:
        s = search.lower()
        results = [
            d for d in results
            if s in d["name"].lower() or s in d["specialization"].lower() or s in d["hospital_name"].lower()
        ]
    return results

@router.get("/{doctor_id}", response_model=Dict[str, Any])
def get_doctor(doctor_id: str):
    for d in DOCTORS:
        if d["id"] == doctor_id:
            return d
    raise HTTPException(status_code=404, detail="Doctor not found")

@router.put("/{doctor_id}/availability", response_model=Dict[str, Any])
def update_doctor_availability(doctor_id: str, payload: Dict[str, Any]):
    for idx, d in enumerate(DOCTORS):
        if d["id"] == doctor_id:
            if "today_status" in payload:
                DOCTORS[idx]["today_status"] = payload["today_status"]
            if "next_available" in payload:
                DOCTORS[idx]["next_available"] = payload["next_available"]
            if "available_time_slots" in payload:
                DOCTORS[idx]["available_time_slots"] = payload["available_time_slots"]
            if "available_days" in payload:
                DOCTORS[idx]["available_days"] = payload["available_days"]
            return DOCTORS[idx]
    raise HTTPException(status_code=404, detail="Doctor not found")

@router.post("", response_model=Dict[str, Any])
def add_doctor(doc_data: Dict[str, Any]):
    new_doc = {
        "id": f"doc-{uuid.uuid4().hex[:6]}",
        "name": doc_data.get("name", "Dr. New Specialist"),
        "specialization": doc_data.get("specialization", "Oncology"),
        "hospital_id": doc_data.get("hospital_id", "hosp-1"),
        "hospital_name": doc_data.get("hospital_name", "Metro Cancer Institute & Medical Center"),
        "today_status": doc_data.get("today_status", "AVAILABLE"),
        "available_days": doc_data.get("available_days", ["Monday", "Wednesday", "Friday"]),
        "available_time_slots": doc_data.get("available_time_slots", ["10:00 AM", "02:00 PM"]),
        "consultation_types": doc_data.get("consultation_types", ["In-person", "Teleconsultation"]),
        "next_available": doc_data.get("next_available", "Today – 2:00 PM"),
        "consultation_duration": doc_data.get("consultation_duration", "30 mins"),
        "experience_years": doc_data.get("experience_years", 10),
        "rating": 4.9
    }
    DOCTORS.append(new_doc)
    return new_doc
