from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime

from database.demo_db import PATIENTS, TIMELINE_EVENTS, MEDICAL_REPORTS, MONITORING_ITEMS, APPOINTMENTS
from models.schemas import HealthPassport, TimelineEvent, MedicalReport, MonitoringPlan
from services.ai_engine import generate_care_coordination_summary

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("/{patient_id}", response_model=Dict[str, Any])
def get_patient_passport(patient_id: str):
    for p in PATIENTS:
        if p["patient_id"] == patient_id:
            return p
    # Default to first patient if not found
    return PATIENTS[0]

@router.put("/{patient_id}", response_model=Dict[str, Any])
def update_patient_passport(patient_id: str, updated_data: Dict[str, Any]):
    for idx, p in enumerate(PATIENTS):
        if p["patient_id"] == patient_id:
            updated_data["last_updated"] = datetime.utcnow().strftime("%Y-%m-%d")
            PATIENTS[idx].update(updated_data)
            return PATIENTS[idx]
    raise HTTPException(status_code=404, detail="Patient record not found")

@router.get("/{patient_id}/timeline", response_model=List[Dict[str, Any]])
def get_timeline(patient_id: str):
    events = [e for e in TIMELINE_EVENTS if e["patient_id"] == patient_id]
    return sorted(events, key=lambda x: x["date"])

@router.post("/{patient_id}/timeline", response_model=Dict[str, Any])
def add_timeline_event(patient_id: str, event_data: Dict[str, Any]):
    new_event = {
        "id": f"tl-{uuid.uuid4().hex[:6]}",
        "patient_id": patient_id,
        "date": event_data.get("date", datetime.utcnow().strftime("%Y-%m-%d")),
        "event_type": event_data.get("event_type", "Follow-up"),
        "title": event_data.get("title", "Clinical Update"),
        "description": event_data.get("description", ""),
        "hospital_doctor": event_data.get("hospital_doctor", "Care Team"),
        "attached_report": event_data.get("attached_report", None),
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    TIMELINE_EVENTS.append(new_event)
    return new_event

@router.get("/{patient_id}/reports", response_model=List[Dict[str, Any]])
def get_reports(patient_id: str):
    return [r for r in MEDICAL_REPORTS if r["patient_id"] == patient_id]

@router.post("/{patient_id}/reports", response_model=Dict[str, Any])
def upload_report(patient_id: str, report_data: Dict[str, Any]):
    new_report = {
        "id": f"rep-{uuid.uuid4().hex[:6]}",
        "patient_id": patient_id,
        "name": report_data.get("name", "Uploaded Diagnostic Report"),
        "date": report_data.get("date", datetime.utcnow().strftime("%Y-%m-%d")),
        "category": report_data.get("category", "Lab"),
        "status": "Available",
        "file_url": report_data.get("file_url", "/reports/uploaded-file.pdf"),
        "notes": report_data.get("notes", "Uploaded via patient portal"),
        "disclaimer": "Demonstration document placeholder. Does not claim real medical verification."
    }
    MEDICAL_REPORTS.insert(0, new_report)
    return new_report

@router.get("/{patient_id}/monitoring", response_model=Dict[str, Any])
def get_monitoring_plan(patient_id: str):
    return {
        "patient_id": patient_id,
        "items": MONITORING_ITEMS,
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "disclaimer": "Monitoring guidance is informational and does not constitute medical diagnosis or treatment advice."
    }

@router.get("/{patient_id}/ai-summary", response_model=Dict[str, Any])
def get_ai_summary(patient_id: str):
    passport = next((p for p in PATIENTS if p["patient_id"] == patient_id), PATIENTS[0])
    timeline = [e for e in TIMELINE_EVENTS if e["patient_id"] == patient_id]
    reports = [r for r in MEDICAL_REPORTS if r["patient_id"] == patient_id]
    apts = [a for a in APPOINTMENTS if a["patient_id"] == patient_id and a["status"] in ["PENDING", "ACCEPTED"]]
    
    return generate_care_coordination_summary(passport, timeline, reports, apts)
