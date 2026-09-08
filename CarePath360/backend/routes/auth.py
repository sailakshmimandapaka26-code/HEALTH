from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from models.schemas import UserRole

router = APIRouter(prefix="/auth", tags=["Authentication"])

DEMO_USERS = {
    "patient": {
        "id": "pat-1",
        "name": "Sarah Jenkins",
        "email": "sarah.jenkins@demo.carepath360.org",
        "role": UserRole.PATIENT,
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "hospital_id": "hosp-1",
        "treating_doctor_id": "doc-1"
    },
    "hospital": {
        "id": "hosp-1",
        "name": "Metro Cancer Institute & Medical Center",
        "email": "coordinator@metrocancer.org",
        "role": UserRole.HOSPITAL,
        "avatar": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=150&auto=format&fit=crop&q=80",
        "hospital_id": "hosp-1"
    },
    "doctor": {
        "id": "doc-1",
        "name": "Dr. Priya Sharma",
        "email": "priya.sharma@metrocancer.org",
        "role": UserRole.DOCTOR,
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
        "hospital_id": "hosp-1",
        "specialization": "Medical Oncology"
    },
    "caregiver": {
        "id": "cg-1",
        "name": "Mark Jenkins",
        "email": "mark.jenkins@demo.carepath360.org",
        "role": UserRole.CAREGIVER,
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        "patient_id": "pat-1"
    },
    "donor": {
        "id": "dnr-001",
        "name": "Alex Rivera",
        "email": "alex.rivera@demo-carepath.org",
        "role": UserRole.DONOR,
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "blood_group": "B+",
        "latitude": 37.7765,
        "longitude": -122.4170
    },
    "admin": {
        "id": "adm-1",
        "name": "Admin Supervisor",
        "email": "admin@carepath360.org",
        "role": UserRole.ADMIN,
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    }
}

class DemoLoginRequest(BaseModel):
    role: str

class LoginResponse(BaseModel):
    token: str
    user: Dict[str, Any]
    message: str

@router.post("/demo-login", response_model=LoginResponse)
def demo_login(req: DemoLoginRequest):
    role_key = req.role.lower()
    if role_key not in DEMO_USERS:
        raise HTTPException(status_code=400, detail=f"Invalid demo role '{req.role}'. Choose from {list(DEMO_USERS.keys())}")
    
    user_data = DEMO_USERS[role_key]
    return {
        "token": f"carepath360_demo_token_{user_data['id']}",
        "user": user_data,
        "message": f"Successfully authenticated as {user_data['name']} ({user_data['role']})"
    }

@router.get("/me")
def get_current_user(user_id: Optional[str] = "pat-1"):
    for user in DEMO_USERS.values():
        if user["id"] == user_id:
            return user
    return DEMO_USERS["patient"]
