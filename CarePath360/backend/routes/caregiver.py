from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from datetime import datetime

from database.demo_db import CAREGIVER_PERMISSIONS, AUDIT_LOGS, NOTIFICATIONS
from models.schemas import CaregiverPermissions

router = APIRouter(prefix="/caregiver", tags=["Caregiver"])

@router.get("/{patient_id}", response_model=Dict[str, Any])
def get_caregiver_permissions(patient_id: str):
    if CAREGIVER_PERMISSIONS["patient_id"] == patient_id:
        return CAREGIVER_PERMISSIONS
    return {
        "patient_id": patient_id,
        "caregiver_id": "cg-default",
        "caregiver_name": "Designated Caregiver",
        "caregiver_email": "caregiver@demo.carepath360.org",
        "appointments": True,
        "reports": False,
        "health_timeline": True,
        "notifications": True
    }

@router.put("/{patient_id}/permissions", response_model=Dict[str, Any])
def update_caregiver_permissions(patient_id: str, payload: Dict[str, Any]):
    global CAREGIVER_PERMISSIONS
    for key in ["appointments", "reports", "health_timeline", "notifications"]:
        if key in payload:
            CAREGIVER_PERMISSIONS[key] = bool(payload[key])
            
    AUDIT_LOGS.insert(0, {
        "id": f"aud-cg-{datetime.utcnow().strftime('%M%S')}",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "actor_name": "Sarah Jenkins",
        "actor_role": "PATIENT",
        "action": "CAREGIVER_PERMISSIONS_UPDATED",
        "target": CAREGIVER_PERMISSIONS["caregiver_name"],
        "details": f"Permissions set: Apts={CAREGIVER_PERMISSIONS['appointments']}, Reports={CAREGIVER_PERMISSIONS['reports']}, Timeline={CAREGIVER_PERMISSIONS['health_timeline']}, Notifs={CAREGIVER_PERMISSIONS['notifications']}"
    })
    
    NOTIFICATIONS.insert(0, {
        "id": f"notif-cg-{datetime.utcnow().strftime('%M%S')}",
        "user_id": CAREGIVER_PERMISSIONS["caregiver_id"],
        "title": "Portal Permissions Updated",
        "message": "Sarah Jenkins adjusted your caregiver access permissions for medical records.",
        "category": "CAREGIVER",
        "is_read": False,
        "timestamp": "Just now",
        "action_url": "/caregiver"
    })
    
    return CAREGIVER_PERMISSIONS
