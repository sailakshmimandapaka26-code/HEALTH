from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

class UserRole(str, Enum):
    PATIENT = "PATIENT"
    CAREGIVER = "CAREGIVER"
    HOSPITAL = "HOSPITAL"
    DOCTOR = "DOCTOR"
    DONOR = "DONOR"
    ADMIN = "ADMIN"

class BloodGroup(str, Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS = "O+"
    O_NEG = "O-"

class DoctorStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    AVAILABLE_LATER = "AVAILABLE_LATER"
    NOT_AVAILABLE = "NOT_AVAILABLE"

class AppointmentStatus(str, Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class UrgencyLevel(str, Enum):
    CRITICAL = "CRITICAL"
    URGENT = "URGENT"
    STANDARD = "STANDARD"

class BloodRequestStatus(str, Enum):
    ACTIVE = "ACTIVE"
    FULFILLED = "FULFILLED"
    EXPIRED = "EXPIRED"

class TriageCategory(str, Enum):
    GREEN = "GREEN"
    YELLOW = "YELLOW"
    RED = "RED"

# Models
class HealthPassport(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    age: int
    gender: str
    cancer_type: str
    cancer_stage: str
    diagnosis_date: str
    treatment_history: str
    chemotherapy_details: str
    radiation_therapy_details: str
    surgery_history: str
    current_medications: List[str]
    important_lab_reports: List[str]
    imaging_reports: List[str]
    previous_complications: List[str]
    allergies: List[str]
    other_medical_conditions: List[str]
    treating_hospital: str
    treating_oncologist: str
    emergency_contact: str
    emergency_phone: str
    last_updated: str
    is_demo_data: bool = True
    disclaimer: str = "Information should be verified with your healthcare professional. DEMO DATA — NOT REAL PATIENT INFORMATION."

class TimelineEvent(BaseModel):
    id: str
    patient_id: str
    date: str
    event_type: str  # Diagnosis, Chemotherapy, Radiation, Surgery, Recovery, Follow-up, Current Status
    title: str
    description: str
    hospital_doctor: str
    attached_report: Optional[str] = None
    created_at: str

class MedicalReport(BaseModel):
    id: str
    patient_id: str
    name: str
    date: str
    category: str  # Lab, Imaging, Discharge Summary, Treatment, Follow-up
    status: str = "Available"
    file_url: str = "#"
    notes: Optional[str] = None
    disclaimer: str = "Demonstration document placeholder. Does not claim real medical verification."

class MonitoringItem(BaseModel):
    area: str
    why_monitored: str
    what_to_discuss: str
    monitoring_level: str  # LOW, MODERATE, HIGH

class MonitoringPlan(BaseModel):
    patient_id: str
    items: List[MonitoringItem]
    generated_at: str
    disclaimer: str = "Monitoring guidance is informational and does not constitute medical diagnosis or treatment advice."

class HealthConcern(BaseModel):
    id: str
    patient_id: str
    symptom: str
    start_date: str
    duration: str
    severity: str  # Mild, Moderate, Severe
    description: str
    related_report: Optional[str] = None
    current_medications: Optional[str] = None
    triage_category: TriageCategory
    triage_guidance: str
    created_at: str
    disclaimer: str = "This is a care coordination and decision-support feature only. It does not replace professional medical advice."

class Doctor(BaseModel):
    id: str
    name: str
    specialization: str
    hospital_id: str
    hospital_name: str
    today_status: DoctorStatus
    available_days: List[str]
    available_time_slots: List[str]
    consultation_types: List[str]
    next_available: str
    consultation_duration: str
    experience_years: int
    rating: float

class Appointment(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    hospital_id: str
    hospital_name: str
    doctor_id: str
    doctor_name: str
    date: str
    time_slot: str
    consultation_type: str
    reason: str
    status: AppointmentStatus
    created_at: str

class CaregiverPermissions(BaseModel):
    patient_id: str
    caregiver_id: str
    caregiver_name: str
    caregiver_email: str
    appointments: bool = True
    reports: bool = False
    health_timeline: bool = True
    notifications: bool = True

class Donor(BaseModel):
    id: str
    name: str
    age: int
    blood_group: BloodGroup
    phone: str
    email: str
    latitude: float
    longitude: float
    available: bool = True
    verified: bool = True
    emergency_opt_in: bool = True
    notification_token: str
    last_active: str
    response_rate: int
    # Computed fields for emergency context
    distance_km: Optional[float] = None
    eta_minutes: Optional[int] = None
    priority_score: Optional[int] = None
    match_rationale: Optional[str] = None
    current_response_status: Optional[str] = None  # ALERTED, ACCEPTED, DECLINED, ON_THE_WAY, NO_RESPONSE

class BloodRequest(BaseModel):
    id: str
    hospital_id: str
    hospital_name: str
    blood_group: BloodGroup
    units_required: int
    units_confirmed: int = 0
    urgency: UrgencyLevel
    latitude: float
    longitude: float
    radius_km: float = 1.0
    status: BloodRequestStatus = BloodRequestStatus.ACTIVE
    alerted_donors_count: int = 0
    created_at: str
    expires_at: str
    fallback_options: List[Dict[str, Any]] = []

class DonorResponse(BaseModel):
    id: str
    blood_request_id: str
    donor_id: str
    donor_name: str
    blood_group: BloodGroup
    distance_km: float
    eta_minutes: int
    status: str  # ACCEPTED, DECLINED, ON_THE_WAY
    timestamp: str

class Notification(BaseModel):
    id: str
    user_id: str
    title: str
    message: str
    category: str  # APPOINTMENT, DOCTOR, REPORT, MONITORING, BLOOD_SOS, CAREGIVER
    is_read: bool = False
    timestamp: str
    action_url: Optional[str] = None

class AuditLog(BaseModel):
    id: str
    timestamp: str
    actor_name: str
    actor_role: str
    action: str
    target: str
    details: str
