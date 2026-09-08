import uuid
from datetime import datetime, timedelta
import random

# Hospital Reference Locations
HOSPITALS = [
    {
        "id": "hosp-1",
        "name": "Metro Cancer Institute & Medical Center",
        "address": "500 Medical Center Way, Metro City",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "phone": "+1 (555) 019-2830",
        "verified": True,
        "emergency_unit": "Level 1 Trauma & Oncology Emergency"
    },
    {
        "id": "hosp-2",
        "name": "St. Jude Comprehensive Oncology Hospital",
        "address": "1200 Hope Blvd, Metro City",
        "latitude": 37.7833,
        "longitude": -122.4167,
        "phone": "+1 (555) 019-8821",
        "verified": True,
        "emergency_unit": "Specialized Bone Marrow & Transfusion Center"
    },
    {
        "id": "hosp-3",
        "name": "Apex Memorial Community Hospital",
        "address": "742 Evergreen Terrace, North District",
        "latitude": 37.7649,
        "longitude": -122.4312,
        "phone": "+1 (555) 019-3344",
        "verified": True,
        "emergency_unit": "Rapid Response Blood & Infusion Unit"
    }
]

# Initial Seed Patients
PATIENTS = [
    {
        "id": "pat-1",
        "patient_id": "pat-1",
        "patient_name": "Sarah Jenkins",
        "age": 42,
        "gender": "Female",
        "cancer_type": "Invasive Ductal Carcinoma (Breast)",
        "cancer_stage": "Stage IIA (T2, N0, M0)",
        "diagnosis_date": "2024-03-15",
        "treatment_history": "Completed Neoadjuvant Chemotherapy (AC-T), Lumpectomy with Sentinel Lymph Node Biopsy, Followed by Adjuvant Chest Wall Radiation.",
        "chemotherapy_details": "Doxorubicin + Cyclophosphamide (4 cycles) followed by Paclitaxel (12 weekly cycles). Completed August 2024.",
        "radiation_therapy_details": "External beam radiation therapy: 50 Gy in 25 fractions with tumor bed boost of 10 Gy. Completed October 2024.",
        "surgery_history": "Left breast partial mastectomy + sentinel lymph node dissection (May 2024). Margins negative.",
        "current_medications": [
            "Tamoxifen 20mg daily (Endocrine therapy)",
            "Calcium + Vitamin D3 1000 IU daily",
            "Ondansetron 4mg as needed for nausea"
        ],
        "important_lab_reports": [
            "CBC with differential - WNL (Normal ANC)",
            "Comprehensive Metabolic Panel - Normal renal & liver function",
            "CA 15-3 Tumor Marker - 14.2 U/mL (Normal baseline)"
        ],
        "imaging_reports": [
            "Post-treatment Diagnostic Mammogram (Jan 2025) - No suspicious microcalcifications",
            "Bone Mineral Density DXA Scan - T-score -1.2 (Mild osteopenia)"
        ],
        "previous_complications": [
            "Mild chemotherapy-induced peripheral neuropathy (Grade 1)",
            "Post-radiation skin erythema (Resolved)"
        ],
        "allergies": [
            "Penicillin (Hives)",
            "Sulfa drugs (Rash)"
        ],
        "other_medical_conditions": [
            "Mild Osteopenia",
            "History of seasonal allergies"
        ],
        "treating_hospital": "Metro Cancer Institute & Medical Center",
        "treating_oncologist": "Dr. Priya Sharma",
        "emergency_contact": "Mark Jenkins (Spouse)",
        "emergency_phone": "+1 (555) 234-5678",
        "last_updated": "2025-02-28",
        "is_demo_data": True,
        "disclaimer": "Information should be verified with your healthcare professional. DEMO DATA — NOT REAL PATIENT INFORMATION."
    },
    {
        "id": "pat-2",
        "patient_id": "pat-2",
        "patient_name": "Robert Chen",
        "age": 58,
        "gender": "Male",
        "cancer_type": "Colorectal Adenocarcinoma",
        "cancer_stage": "Stage III (T3, N1, M0)",
        "diagnosis_date": "2023-11-10",
        "treatment_history": "Low anterior resection surgery followed by adjuvant FOLFOX chemotherapy.",
        "chemotherapy_details": "FOLFOX6 (12 cycles). Completed July 2024.",
        "radiation_therapy_details": "None required per staging protocol.",
        "surgery_history": "Laparoscopic low anterior resection with temporary ileostomy (Dec 2023), reversed March 2024.",
        "current_medications": [
            "Loperamide 2mg as needed",
            "Multivitamin daily",
            "Atorvastatin 20mg daily"
        ],
        "important_lab_reports": [
            "CEA (Carcinoembryonic Antigen) - 1.8 ng/mL (Normal)",
            "Liver Function Panel - Normal"
        ],
        "imaging_reports": [
            "CT Chest/Abdomen/Pelvis (Dec 2024) - No evidence of recurrence or metastasis"
        ],
        "previous_complications": ["Cold-induced dysesthesia (Oxaliplatin related - improved)"],
        "allergies": ["Ciprofloxacin"],
        "other_medical_conditions": ["Hypertension (Controlled)", "Hyperlipidemia"],
        "treating_hospital": "Metro Cancer Institute & Medical Center",
        "treating_oncologist": "Dr. Marcus Vance",
        "emergency_contact": "Linda Chen (Wife)",
        "emergency_phone": "+1 (555) 345-6789",
        "last_updated": "2025-01-15",
        "is_demo_data": True,
        "disclaimer": "Information should be verified with your healthcare professional. DEMO DATA — NOT REAL PATIENT INFORMATION."
    }
]

# Longitudinal Timeline Events for Sarah Jenkins
TIMELINE_EVENTS = [
    {
        "id": "tl-1",
        "patient_id": "pat-1",
        "date": "2024-03-15",
        "event_type": "Diagnosis",
        "title": "Initial Diagnostic Evaluation",
        "description": "Core needle biopsy confirmed ER+/PR+, HER2- invasive ductal carcinoma. Baseline staging CT and bone scan completed.",
        "hospital_doctor": "Metro Cancer Institute — Dr. Priya Sharma",
        "attached_report": "Biopsy_Pathology_Report_032024.pdf",
        "created_at": "2024-03-15T10:00:00Z"
    },
    {
        "id": "tl-2",
        "patient_id": "pat-1",
        "date": "2024-04-02",
        "event_type": "Treatment",
        "title": "Neoadjuvant Chemotherapy Initiated",
        "description": "Commenced AC regimen (Doxorubicin + Cyclophosphamide) every 2 weeks with G-CSF support.",
        "hospital_doctor": "Metro Cancer Institute — Infusion Center",
        "attached_report": "Chemo_Protocol_Summary.pdf",
        "created_at": "2024-04-02T09:30:00Z"
    },
    {
        "id": "tl-3",
        "patient_id": "pat-1",
        "date": "2024-05-24",
        "event_type": "Surgery",
        "title": "Partial Mastectomy & Sentinel Node Biopsy",
        "description": "Successful breast conserving surgery. Clear surgical margins achieved. Sentinel nodes negative.",
        "hospital_doctor": "Metro Cancer Institute — Surgical Oncology",
        "attached_report": "Surgical_Discharge_Summary.pdf",
        "created_at": "2024-05-24T16:00:00Z"
    },
    {
        "id": "tl-4",
        "patient_id": "pat-1",
        "date": "2024-09-05",
        "event_type": "Radiation",
        "title": "Radiation Therapy Commenced",
        "description": "Began 6-week course of adjuvant chest wall radiotherapy with deep inspiration breath hold technique.",
        "hospital_doctor": "Metro Cancer Institute — Radiation Oncology",
        "attached_report": "Radiation_Treatment_Plan.pdf",
        "created_at": "2024-09-05T11:00:00Z"
    },
    {
        "id": "tl-5",
        "patient_id": "pat-1",
        "date": "2024-11-01",
        "event_type": "Recovery",
        "title": "Transition to Endocrine Survivorship Care",
        "description": "Initiated Tamoxifen 20mg daily. Comprehensive survivorship care plan delivered to patient and primary care.",
        "hospital_doctor": "Metro Cancer Institute — Dr. Priya Sharma",
        "attached_report": "Survivorship_Care_Plan_Final.pdf",
        "created_at": "2024-11-01T14:00:00Z"
    },
    {
        "id": "tl-6",
        "patient_id": "pat-1",
        "date": "2025-01-20",
        "event_type": "Follow-up",
        "title": "3-Month Post-Treatment Surveillance",
        "description": "Diagnostic mammogram normal. Routine lab work showed normal blood counts and metabolic profile.",
        "hospital_doctor": "Metro Cancer Institute — Dr. Priya Sharma",
        "attached_report": "Surveillance_Mammogram_2025.pdf",
        "created_at": "2025-01-20T10:30:00Z"
    },
    {
        "id": "tl-7",
        "patient_id": "pat-1",
        "date": "2025-02-28",
        "event_type": "Current Status",
        "title": "Active Survivorship & Monitoring",
        "description": "Patient reports good energy, mild residual numbness in fingertips, fully adhering to endocrine therapy.",
        "hospital_doctor": "Metro Cancer Institute — Care Coordination Team",
        "attached_report": None,
        "created_at": "2025-02-28T09:00:00Z"
    }
]

# Medical Reports
MEDICAL_REPORTS = [
    {
        "id": "rep-1",
        "patient_id": "pat-1",
        "name": "Surveillance Mammogram & Ultrasound",
        "date": "2025-01-20",
        "category": "Imaging",
        "status": "Available",
        "file_url": "/reports/mammogram-jan2025.pdf",
        "notes": "BI-RADS 2 - Benign findings post-lumpectomy. No evidence of recurrence.",
        "disclaimer": "Demonstration document placeholder. Does not claim real medical verification."
    },
    {
        "id": "rep-2",
        "patient_id": "pat-1",
        "name": "Comprehensive Metabolic & CBC Panel",
        "date": "2025-01-18",
        "category": "Lab",
        "status": "Available",
        "file_url": "/reports/blood-work-jan2025.pdf",
        "notes": "Hemoglobin 12.8 g/dL, Platelets 220k, WBC 5.4, Normal kidney and liver enzymes.",
        "disclaimer": "Demonstration document placeholder. Does not claim real medical verification."
    },
    {
        "id": "rep-3",
        "patient_id": "pat-1",
        "name": "Bone Mineral Density (DXA) Scan",
        "date": "2024-11-15",
        "category": "Imaging",
        "status": "Available",
        "file_url": "/reports/dxa-scan-nov2024.pdf",
        "notes": "Lumbar spine T-score -1.2, Left femoral neck T-score -1.0. Routine calcium/Vit D recommended.",
        "disclaimer": "Demonstration document placeholder. Does not claim real medical verification."
    },
    {
        "id": "rep-4",
        "patient_id": "pat-1",
        "name": "Surgical Pathology & Margin Report",
        "date": "2024-05-28",
        "category": "Discharge Summary",
        "status": "Available",
        "file_url": "/reports/surgical-pathology.pdf",
        "notes": "1.8 cm tumor resected with 5mm clear radial margins. Sentinel node 0/3 positive.",
        "disclaimer": "Demonstration document placeholder. Does not claim real medical verification."
    }
]

# Personalized Monitoring Plan Items for Sarah Jenkins
MONITORING_ITEMS = [
    {
        "area": "Cardiovascular Health",
        "why_monitored": "Previous anthracycline chemotherapy (Doxorubicin) and chest radiation require baseline and periodic cardiac function monitoring.",
        "what_to_discuss": "Report any unusual shortness of breath, chest flutter, or lower leg swelling to your cardiologist or oncologist.",
        "monitoring_level": "MODERATE"
    },
    {
        "area": "Bone Density & Skeletal Health",
        "why_monitored": "Endocrine therapy (Tamoxifen) and past chemotherapies can impact bone mineral density over time.",
        "what_to_discuss": "Review daily calcium/Vitamin D3 supplementation and scheduled follow-up DXA bone density scan.",
        "monitoring_level": "LOW"
    },
    {
        "area": "Peripheral Nerve Health (Neuropathy)",
        "why_monitored": "Taxane therapy (Paclitaxel) can cause numbness, tingling, or hypersensitivity in fingers or toes.",
        "what_to_discuss": "Discuss changes in fine motor skills, buttoning clothes, or balance with your care team.",
        "monitoring_level": "LOW"
    },
    {
        "area": "Routine Blood Counts & Liver Function",
        "why_monitored": "Ongoing surveillance during endocrine treatment to ensure marrow recovery and healthy liver metabolism.",
        "what_to_discuss": "Upcoming scheduled 6-month CBC and hepatic panel check at next visit.",
        "monitoring_level": "MODERATE"
    },
    {
        "area": "Emotional & Survivorship Wellbeing",
        "why_monitored": "Post-treatment anxiety, fear of recurrence, and fatigue are common survivorship concerns.",
        "what_to_discuss": "Explore hospital cancer support groups, gentle exercise routines, and mindfulness resources.",
        "monitoring_level": "LOW"
    }
]

# Doctors List
DOCTORS = [
    {
        "id": "doc-1",
        "name": "Dr. Priya Sharma",
        "specialization": "Medical Oncology",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "today_status": "AVAILABLE",
        "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "available_time_slots": ["09:30 AM", "11:00 AM", "02:00 PM", "04:30 PM"],
        "consultation_types": ["In-person", "Teleconsultation"],
        "next_available": "Today – 4:30 PM",
        "consultation_duration": "30 mins",
        "experience_years": 14,
        "rating": 4.9
    },
    {
        "id": "doc-2",
        "name": "Dr. Marcus Vance",
        "specialization": "Gastrointestinal Oncology",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "today_status": "AVAILABLE_LATER",
        "available_days": ["Tuesday", "Thursday", "Friday"],
        "available_time_slots": ["02:30 PM", "03:45 PM", "05:00 PM"],
        "consultation_types": ["In-person", "Teleconsultation"],
        "next_available": "Tomorrow – 10:00 AM",
        "consultation_duration": "45 mins",
        "experience_years": 18,
        "rating": 4.8
    },
    {
        "id": "doc-3",
        "name": "Dr. Elena Rostova",
        "specialization": "Radiation Oncology",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "today_status": "AVAILABLE",
        "available_days": ["Monday", "Wednesday", "Friday"],
        "available_time_slots": ["10:00 AM", "01:30 PM", "03:15 PM"],
        "consultation_types": ["In-person"],
        "next_available": "Today – 1:30 PM",
        "consultation_duration": "30 mins",
        "experience_years": 11,
        "rating": 4.9
    },
    {
        "id": "doc-4",
        "name": "Dr. Rajesh Kumar",
        "specialization": "Hematology & Transfusion Medicine",
        "hospital_id": "hosp-2",
        "hospital_name": "St. Jude Comprehensive Oncology Hospital",
        "today_status": "AVAILABLE",
        "available_days": ["Monday", "Tuesday", "Thursday"],
        "available_time_slots": ["11:30 AM", "02:00 PM", "04:00 PM"],
        "consultation_types": ["In-person", "Teleconsultation"],
        "next_available": "Today – 2:00 PM",
        "consultation_duration": "30 mins",
        "experience_years": 16,
        "rating": 4.95
    },
    {
        "id": "doc-5",
        "name": "Dr. Sarah Al-Mansoor",
        "specialization": "Cardio-Oncology",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "today_status": "AVAILABLE_LATER",
        "available_days": ["Tuesday", "Wednesday", "Friday"],
        "available_time_slots": ["01:00 PM", "03:30 PM"],
        "consultation_types": ["In-person", "Teleconsultation"],
        "next_available": "Thursday – 1:00 PM",
        "consultation_duration": "40 mins",
        "experience_years": 12,
        "rating": 4.7
    },
    {
        "id": "doc-6",
        "name": "Dr. James Wilson",
        "specialization": "Surgical Oncology",
        "hospital_id": "hosp-3",
        "hospital_name": "Apex Memorial Community Hospital",
        "today_status": "NOT_AVAILABLE",
        "available_days": ["Monday", "Thursday"],
        "available_time_slots": ["08:00 AM", "12:00 PM"],
        "consultation_types": ["In-person"],
        "next_available": "Next Monday – 8:00 AM",
        "consultation_duration": "45 mins",
        "experience_years": 22,
        "rating": 4.85
    },
    {
        "id": "doc-7",
        "name": "Dr. Lisa Chang",
        "specialization": "Palliative & Supportive Care",
        "hospital_id": "hosp-2",
        "hospital_name": "St. Jude Comprehensive Oncology Hospital",
        "today_status": "AVAILABLE",
        "available_days": ["Monday", "Wednesday", "Friday"],
        "available_time_slots": ["10:30 AM", "02:15 PM", "04:30 PM"],
        "consultation_types": ["In-person", "Teleconsultation"],
        "next_available": "Today – 2:15 PM",
        "consultation_duration": "45 mins",
        "experience_years": 9,
        "rating": 4.9
    },
    {
        "id": "doc-8",
        "name": "Dr. Arjun Reddy",
        "specialization": "Clinical Immunology & Cellular Therapy",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "today_status": "AVAILABLE",
        "available_days": ["Tuesday", "Wednesday", "Thursday"],
        "available_time_slots": ["09:00 AM", "11:45 AM", "03:00 PM"],
        "consultation_types": ["In-person", "Teleconsultation"],
        "next_available": "Today – 11:45 AM",
        "consultation_duration": "30 mins",
        "experience_years": 13,
        "rating": 4.88
    }
]

# Initial Appointments
APPOINTMENTS = [
    {
        "id": "apt-1",
        "patient_id": "pat-1",
        "patient_name": "Sarah Jenkins",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "doctor_id": "doc-1",
        "doctor_name": "Dr. Priya Sharma",
        "date": "2025-03-12",
        "time_slot": "04:30 PM",
        "consultation_type": "In-person",
        "reason": "Routine 6-month survivorship check & endocrine therapy review",
        "status": "ACCEPTED",
        "created_at": "2025-03-01T10:00:00Z"
    },
    {
        "id": "apt-2",
        "patient_id": "pat-1",
        "patient_name": "Sarah Jenkins",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "doctor_id": "doc-5",
        "doctor_name": "Dr. Sarah Al-Mansoor",
        "date": "2025-03-20",
        "time_slot": "01:00 PM",
        "consultation_type": "Teleconsultation",
        "reason": "Cardio-oncology baseline checkup following chemotherapy",
        "status": "ACCEPTED",
        "created_at": "2025-03-02T11:30:00Z"
    },
    {
        "id": "apt-3",
        "patient_id": "pat-2",
        "patient_name": "Robert Chen",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "doctor_id": "doc-2",
        "doctor_name": "Dr. Marcus Vance",
        "date": "2025-03-15",
        "time_slot": "02:30 PM",
        "consultation_type": "In-person",
        "reason": "Routine surveillance CEA review",
        "status": "PENDING",
        "created_at": "2025-03-05T09:15:00Z"
    }
]

# Caregiver Permissions for Sarah Jenkins
CAREGIVER_PERMISSIONS = {
    "patient_id": "pat-1",
    "caregiver_id": "cg-1",
    "caregiver_name": "Mark Jenkins",
    "caregiver_email": "mark.jenkins@example.com",
    "appointments": True,
    "reports": False,
    "health_timeline": True,
    "notifications": True
}

# Emergency Health Timeline Events (for tracking condition changes)
EMERGENCY_HEALTH_TIMELINE = [
    {
        "id": "eht-1",
        "patient_id": "pat-1",
        "timestamp": "08:00 AM",
        "what_changed": "Patient reported normal condition with mild morning fatigue.",
        "who_reported": "Sarah Jenkins (Patient)",
        "severity": "NORMAL"
    },
    {
        "id": "eht-2",
        "patient_id": "pat-1",
        "timestamp": "02:00 PM",
        "what_changed": "Patient logged localized swelling and warmth in left lower leg.",
        "who_reported": "Sarah Jenkins (Patient)",
        "severity": "MODERATE"
    },
    {
        "id": "eht-3",
        "patient_id": "pat-1",
        "timestamp": "05:00 PM",
        "what_changed": "Pain rating increased to 6/10 when walking.",
        "who_reported": "Sarah Jenkins (Patient)",
        "severity": "MODERATE_HIGH"
    },
    {
        "id": "eht-4",
        "patient_id": "pat-1",
        "timestamp": "07:30 PM",
        "what_changed": "Caregiver notified via automated portal notification.",
        "who_reported": "System Alert Dispatcher",
        "severity": "STATUS_UPDATE"
    },
    {
        "id": "eht-5",
        "patient_id": "pat-1",
        "timestamp": "08:15 PM",
        "what_changed": "Telehealth nurse triage contact requested for clinical evaluation.",
        "who_reported": "Mark Jenkins (Caregiver)",
        "severity": "URGENT_ACTION"
    }
]

# 40 Synthetic Donors Distributed near Metro Cancer Institute (lat: 37.7749, lng: -122.4194)
# 1 km is roughly 0.009 degrees latitude.
# Distance rings:
# Ring 1 (<= 1 km): 0.2 to 0.9 km
# Ring 2 (1 km to 3 km): 1.2 to 2.9 km
# Ring 3 (3 km to 5 km): 3.1 to 4.9 km
# Outliers (> 5 km): 5.5 to 7.0 km

DONOR_NAMES = [
    ("Alex Rivera", "B+", 0.35, 37.7765, -122.4170),
    ("Devon Miller", "B+", 0.72, 37.7710, -122.4230),
    ("Chloe Patel", "O-", 0.85, 37.7790, -122.4260),
    ("Ethan Wright", "A+", 0.60, 37.7720, -122.4140),
    ("Marcus Brody", "B+", 1.45, 37.7650, -122.4100),
    ("Elena Gomez", "B+", 2.10, 37.7850, -122.4350),
    ("Jordan Blake", "O+", 1.80, 37.7600, -122.4250),
    ("Liam Tanaka", "B-", 2.40, 37.7900, -122.4050),
    ("Sophia Martinez", "B+", 2.75, 37.7550, -122.4120),
    ("Noah Henderson", "AB+", 2.90, 37.7880, -122.4400),
    ("Aaliyah Khan", "B+", 3.20, 37.7500, -122.4350),
    ("Lucas Dupont", "O-", 3.60, 37.8000, -122.4150),
    ("Maya Lin", "B+", 4.10, 37.7450, -122.4000),
    ("Daniel O'Connor", "A-", 4.40, 37.7950, -122.4500),
    ("Hannah Scott", "B+", 4.80, 37.7400, -122.4450),
    ("Tyler Vance", "AB-", 5.60, 37.8100, -122.3900),
    ("Grace Kim", "B+", 0.45, 37.7730, -122.4150),
    ("Zachary Ross", "O+", 0.78, 37.7780, -122.4220),
    ("Jessica Taylor", "A+", 1.25, 37.7690, -122.4080),
    ("Brandon Lee", "B+", 1.95, 37.7820, -122.4300),
    ("Emily Watson", "O-", 2.30, 37.7580, -122.4180),
    ("Kevin Patel", "B+", 2.65, 37.7870, -122.4020),
    ("Rachel Green", "A-", 3.35, 37.7520, -122.4280),
    ("Justin Bell", "B+", 3.80, 37.7980, -122.4380),
    ("Olivia Sanchez", "O+", 4.25, 37.7420, -122.4100),
    ("Nathan Drake", "B+", 4.60, 37.7480, -122.4550),
    ("Samira Haque", "AB+", 5.20, 37.8050, -122.4600),
    ("Carlos Mendez", "B+", 0.92, 37.7815, -122.4135),
    ("Zoe Crawford", "B+", 1.65, 37.7630, -122.4170),
    ("Victor Hugo", "O-", 2.15, 37.7860, -122.4270),
    ("Aria Montgomery", "B+", 2.85, 37.7560, -122.4320),
    ("David Hassel", "A+", 3.15, 37.7920, -122.3980),
    ("Leila Farouk", "B+", 3.75, 37.7490, -122.4400),
    ("Peter Parker", "O+", 4.30, 37.8020, -122.4250),
    ("Amara Johnson", "B+", 4.70, 37.7380, -122.4300),
    ("Benjamin Franklin", "B+", 1.10, 37.7700, -122.4070),
    ("Selena Gomez", "A-", 1.85, 37.7840, -122.4330),
    ("Bruce Wayne", "O-", 2.50, 37.7590, -122.4230),
    ("Diana Prince", "B+", 3.05, 37.7890, -122.4080),
    ("Clark Kent", "B+", 0.55, 37.7760, -122.4160)
]

def generate_initial_donors():
    donors = []
    for idx, (name, bg, dist, lat, lng) in enumerate(DONOR_NAMES):
        donor_id = f"dnr-{idx+1:03d}"
        clean_name = name.lower().replace(' ', '.').replace("'", "")
        donors.append({
            "id": donor_id,
            "name": name,
            "age": random.randint(21, 52),
            "blood_group": bg,
            "phone": f"+1 (555) 012-{1000 + idx}",
            "email": f"{clean_name}@demo-carepath.org",
            "latitude": lat,
            "longitude": lng,
            "available": True,
            "verified": True,
            "emergency_opt_in": True,
            "notification_token": f"fcm_token_demo_{donor_id}",
            "last_active": "Active within 15 mins",
            "response_rate": random.randint(82, 98),
            "distance_km": round(dist, 2),
            "eta_minutes": max(3, int(dist * 6.5)),
            "priority_score": None,
            "match_rationale": None,
            "current_response_status": "NO_RESPONSE"
        })
    return donors

DONORS = generate_initial_donors()

# Initial Blood Requests
BLOOD_REQUESTS = [
    {
        "id": "br-101",
        "hospital_id": "hosp-1",
        "hospital_name": "Metro Cancer Institute & Medical Center",
        "blood_group": "B+",
        "units_required": 4,
        "units_confirmed": 0,
        "urgency": "CRITICAL",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "radius_km": 1.0,
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
]

# Notifications
NOTIFICATIONS = [
    {
        "id": "notif-1",
        "user_id": "pat-1",
        "title": "Follow-up Appointment Confirmed",
        "message": "Dr. Priya Sharma confirmed your 6-month survivorship review on March 12 at 4:30 PM.",
        "category": "APPOINTMENT",
        "is_read": False,
        "timestamp": "10 mins ago",
        "action_url": "/appointments"
    },
    {
        "id": "notif-2",
        "user_id": "pat-1",
        "title": "Personalized Monitoring Reminder",
        "message": "Routine cardiovascular checkup recommendation added to your active monitoring plan.",
        "category": "MONITORING",
        "is_read": False,
        "timestamp": "2 hours ago",
        "action_url": "/monitoring-plan"
    },
    {
        "id": "notif-3",
        "user_id": "doc-1",
        "title": "New Appointment Request",
        "message": "Sarah Jenkins requested consultation for survivorship follow-up.",
        "category": "APPOINTMENT",
        "is_read": True,
        "timestamp": "Yesterday",
        "action_url": "/hospital/appointments"
    },
    {
        "id": "notif-4",
        "user_id": "dnr-001",
        "title": "BloodSOS Emergency Alert (B+)",
        "message": "Critical B+ blood requirement at Metro Cancer Institute (0.35 km away).",
        "category": "BLOOD_SOS",
        "is_read": False,
        "timestamp": "Just now",
        "action_url": "/blood-sos"
    }
]

# Audit Logs
AUDIT_LOGS = [
    {
        "id": "aud-1",
        "timestamp": "2025-03-08 09:15:22",
        "actor_name": "System Security Officer",
        "actor_role": "ADMIN",
        "action": "VERIFIED_HOSPITAL",
        "target": "Metro Cancer Institute",
        "details": "Hospital credentials and transfusion license verified."
    },
    {
        "id": "aud-2",
        "timestamp": "2025-03-08 10:04:11",
        "actor_name": "Dr. Priya Sharma",
        "actor_role": "DOCTOR",
        "action": "CONFIRMED_APPOINTMENT",
        "target": "Sarah Jenkins (pat-1)",
        "details": "Consultation slot 4:30 PM confirmed."
    },
    {
        "id": "aud-3",
        "timestamp": "2025-03-08 11:20:45",
        "actor_name": "Sarah Jenkins",
        "actor_role": "PATIENT",
        "action": "UPDATED_CAREGIVER_PERMISSIONS",
        "target": "Mark Jenkins",
        "details": "Restricted reports permission; enabled appointment & timeline access."
    }
]
