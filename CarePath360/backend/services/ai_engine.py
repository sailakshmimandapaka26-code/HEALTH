from typing import Dict, Any, List
from datetime import datetime

AI_SAFETY_DISCLAIMER = (
    "CarePath 360 AI Care Coordination is an informational coordination tool only. "
    "It DOES NOT provide medical diagnoses, disease predictions, treatment decisions, or drug prescriptions. "
    "All health insights and follow-up topics must be reviewed and verified with your qualified healthcare provider."
)

def generate_care_coordination_summary(
    passport: Dict[str, Any],
    timeline_events: List[Dict[str, Any]],
    recent_reports: List[Dict[str, Any]],
    upcoming_appointments: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Synthesizes longitudinal cancer history, appointments, and monitoring status
    into actionable care coordination notes and doctor discussion prompts.
    Strictly non-diagnostic.
    """
    patient_name = passport.get("patient_name", "Patient")
    cancer_type = passport.get("cancer_type", "Cancer Survivorship")
    treatment = passport.get("treatment_history", "Standard Oncology Regimen")
    
    # 1. Timeline Summary
    total_milestones = len(timeline_events)
    latest_event = timeline_events[-1]["title"] if timeline_events else "Active Follow-up"
    timeline_summary = (
        f"{patient_name} has successfully tracked {total_milestones} milestones across diagnosis, "
        f"active therapy, and recovery. Current focus is longitudinal survivorship surveillance "
        f"and managing long-term treatment wellness."
    )
    
    # 2. Suggested Questions for Doctor
    suggested_questions = [
        "Are my current energy levels and mild peripheral numbness expected at this stage of post-chemotherapy recovery?",
        "Given my prior chest radiation and anthracycline therapy, is an updated baseline echocardiogram recommended this year?",
        "How frequently should bone mineral density (DXA) scans be scheduled while I remain on endocrine therapy?",
        "What specific red-flag symptoms or persistent localized changes should trigger an earlier consultation?"
    ]
    
    # 3. Follow-up Care Tasks
    follow_up_tasks = [
        {"task": "Schedule 6-month routine comprehensive metabolic and CBC blood draw", "priority": "Normal", "status": "Upcoming"},
        {"task": "Review daily calcium and Vitamin D3 supplementation compliance with primary care", "priority": "Routine", "status": "Ongoing"},
        {"task": "Keep a 7-day symptom log if morning fatigue or joint stiffness fluctuates", "priority": "Informational", "status": "Suggested"}
    ]
    
    # 4. Care Actions & Alerts
    care_actions = []
    if not upcoming_appointments:
        care_actions.append("No active appointments booked. Consider booking your routine 6-month survivorship review.")
    else:
        next_apt = upcoming_appointments[0]
        care_actions.append(
            f"Upcoming consultation with {next_apt.get('doctor_name')} scheduled for {next_apt.get('date')} at {next_apt.get('time_slot')}."
        )
        
    return {
        "summary": timeline_summary,
        "suggested_questions": suggested_questions,
        "follow_up_tasks": follow_up_tasks,
        "upcoming_care_actions": care_actions,
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "disclaimer": AI_SAFETY_DISCLAIMER
    }

def triage_health_concern(
    symptom: str,
    severity: str,
    duration: str,
    description: str
) -> Dict[str, Any]:
    """
    Categorizes newly reported symptoms into safe coordination triage buckets
    (GREEN / YELLOW / RED) to guide the patient on urgency of contacting their doctor.
    DOES NOT DIAGNOSE.
    """
    symp_lower = (symptom + " " + description).lower()
    
    # Severe/Critical Emergency Keywords
    red_flags = ["chest pain", "shortness of breath", "difficulty breathing", "severe bleeding", "unconscious", "high fever", "fever > 101", "hemoptysis", "sudden weakness", "confusion", "slurred speech"]
    yellow_flags = ["persistent swelling", "worsening pain", "numbness", "unusual fatigue", "rash", "fever", "nausea", "bone pain", "weight loss"]
    
    if any(rf in symp_lower for rf in red_flags) or severity.upper() == "SEVERE":
        category = "RED"
        guidance = (
            "CRITICAL COORDINATION ALERT: The reported symptoms may indicate an urgent medical situation. "
            "Seek urgent emergency medical evaluation immediately. If you are experiencing a life-threatening emergency, "
            "call your local emergency services (e.g. 911, 112, 999) or visit the nearest emergency department right away."
        )
    elif any(yf in symp_lower for yf in yellow_flags) or severity.upper() == "MODERATE":
        category = "YELLOW"
        guidance = (
            "RECOMMENDED CLINICAL CONTACT: We recommend contacting your treating oncology team or clinic coordinator "
            "within the next 24 to 48 hours to discuss these symptoms. Keep track of when symptoms start and their intensity."
        )
    else:
        category = "GREEN"
        guidance = (
            "ROUTINE MONITORING: These symptoms can be documented in your health timeline and reviewed with your "
            "doctor during your next scheduled appointment. If symptoms worsen or persist, please contact your care team sooner."
        )
        
    return {
        "category": category,
        "guidance": guidance,
        "disclaimer": "This guidance is for care coordination and triage navigation only. It does not constitute medical diagnosis or advice."
    }
