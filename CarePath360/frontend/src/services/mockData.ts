import {
  UserProfile,
  HealthPassport,
  TimelineEvent,
  MedicalReport,
  MonitoringItem,
  Doctor,
  Appointment,
  CaregiverPermissions,
  Donor,
  BloodRequest,
  NotificationItem,
  AuditLog,
  EmergencyTimelineEvent
} from '../types';

export const DEMO_USERS: Record<string, UserProfile> = {
  patient: {
    id: 'pat-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@demo.carepath360.org',
    role: 'PATIENT',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    hospital_id: 'hosp-1',
    treating_doctor_id: 'doc-1'
  },
  hospital: {
    id: 'hosp-1',
    name: 'Metro Cancer Institute & Medical Center',
    email: 'coordinator@metrocancer.org',
    role: 'HOSPITAL',
    avatar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=150&auto=format&fit=crop&q=80',
    hospital_id: 'hosp-1'
  },
  doctor: {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@metrocancer.org',
    role: 'DOCTOR',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    hospital_id: 'hosp-1'
  },
  caregiver: {
    id: 'cg-1',
    name: 'Mark Jenkins',
    email: 'mark.jenkins@demo.carepath360.org',
    role: 'CAREGIVER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    patient_id: 'pat-1'
  },
  donor: {
    id: 'dnr-001',
    name: 'Alex Rivera',
    email: 'alex.rivera@demo-carepath.org',
    role: 'DONOR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    blood_group: 'B+'
  },
  admin: {
    id: 'adm-1',
    name: 'Admin Supervisor',
    email: 'admin@carepath360.org',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
};

export const INITIAL_HEALTH_PASSPORT: HealthPassport = {
  id: 'hp-1',
  patient_id: 'pat-1',
  patient_name: 'Sarah Jenkins',
  age: 42,
  gender: 'Female',
  cancer_type: 'Invasive Ductal Carcinoma (Breast)',
  cancer_stage: 'Stage IIA (T2, N0, M0)',
  diagnosis_date: '2024-03-15',
  treatment_history: 'Completed Neoadjuvant Chemotherapy (AC-T), Lumpectomy with Sentinel Lymph Node Biopsy, Followed by Adjuvant Chest Wall Radiation.',
  chemotherapy_details: 'Doxorubicin + Cyclophosphamide (4 cycles) followed by Paclitaxel (12 weekly cycles). Completed August 2024.',
  radiation_therapy_details: 'External beam radiation therapy: 50 Gy in 25 fractions with tumor bed boost of 10 Gy. Completed October 2024.',
  surgery_history: 'Left breast partial mastectomy + sentinel lymph node dissection (May 2024). Margins negative.',
  current_medications: [
    'Tamoxifen 20mg daily (Endocrine therapy)',
    'Calcium + Vitamin D3 1000 IU daily',
    'Ondansetron 4mg as needed for nausea'
  ],
  important_lab_reports: [
    'CBC with differential - WNL (Normal Absolute Neutrophil Count)',
    'Comprehensive Metabolic Panel - Normal renal & liver function',
    'CA 15-3 Tumor Marker - 14.2 U/mL (Normal baseline)'
  ],
  imaging_reports: [
    'Post-treatment Diagnostic Mammogram (Jan 2025) - No suspicious microcalcifications',
    'Bone Mineral Density DXA Scan - T-score -1.2 (Mild osteopenia)'
  ],
  previous_complications: [
    'Mild chemotherapy-induced peripheral neuropathy (Grade 1)',
    'Post-radiation skin erythema (Resolved)'
  ],
  allergies: [
    'Penicillin (Hives)',
    'Sulfa drugs (Rash)'
  ],
  other_medical_conditions: [
    'Mild Osteopenia',
    'History of seasonal allergies'
  ],
  treating_hospital: 'Metro Cancer Institute & Medical Center',
  treating_oncologist: 'Dr. Priya Sharma',
  emergency_contact: 'Mark Jenkins (Spouse)',
  emergency_phone: '+1 (555) 234-5678',
  last_updated: '2025-02-28',
  is_demo_data: true,
  disclaimer: 'Information should be verified with your healthcare professional. DEMO DATA — NOT REAL PATIENT INFORMATION.'
};

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1',
    patient_id: 'pat-1',
    date: '2024-03-15',
    event_type: 'Diagnosis',
    title: 'Initial Diagnostic Evaluation',
    description: 'Core needle biopsy confirmed ER+/PR+, HER2- invasive ductal carcinoma. Baseline staging CT and bone scan completed.',
    hospital_doctor: 'Metro Cancer Institute — Dr. Priya Sharma',
    attached_report: 'Biopsy_Pathology_Report_032024.pdf',
    created_at: '2024-03-15T10:00:00Z'
  },
  {
    id: 'tl-2',
    patient_id: 'pat-1',
    date: '2024-04-02',
    event_type: 'Treatment',
    title: 'Neoadjuvant Chemotherapy Initiated',
    description: 'Commenced AC regimen (Doxorubicin + Cyclophosphamide) every 2 weeks with G-CSF support.',
    hospital_doctor: 'Metro Cancer Institute — Infusion Center',
    attached_report: 'Chemo_Protocol_Summary.pdf',
    created_at: '2024-04-02T09:30:00Z'
  },
  {
    id: 'tl-3',
    patient_id: 'pat-1',
    date: '2024-05-24',
    event_type: 'Surgery',
    title: 'Partial Mastectomy & Sentinel Node Biopsy',
    description: 'Successful breast conserving surgery. Clear surgical margins achieved. Sentinel nodes negative.',
    hospital_doctor: 'Metro Cancer Institute — Surgical Oncology',
    attached_report: 'Surgical_Discharge_Summary.pdf',
    created_at: '2024-05-24T16:00:00Z'
  },
  {
    id: 'tl-4',
    patient_id: 'pat-1',
    date: '2024-09-05',
    event_type: 'Radiation',
    title: 'Radiation Therapy Commenced',
    description: 'Began 6-week course of adjuvant chest wall radiotherapy with deep inspiration breath hold technique.',
    hospital_doctor: 'Metro Cancer Institute — Radiation Oncology',
    attached_report: 'Radiation_Treatment_Plan.pdf',
    created_at: '2024-09-05T11:00:00Z'
  },
  {
    id: 'tl-5',
    patient_id: 'pat-1',
    date: '2024-11-01',
    event_type: 'Recovery',
    title: 'Transition to Endocrine Survivorship Care',
    description: 'Initiated Tamoxifen 20mg daily. Comprehensive survivorship care plan delivered to patient and primary care.',
    hospital_doctor: 'Metro Cancer Institute — Dr. Priya Sharma',
    attached_report: 'Survivorship_Care_Plan_Final.pdf',
    created_at: '2024-11-01T14:00:00Z'
  },
  {
    id: 'tl-6',
    patient_id: 'pat-1',
    date: '2025-01-20',
    event_type: 'Follow-up',
    title: '3-Month Post-Treatment Surveillance',
    description: 'Diagnostic mammogram normal. Routine lab work showed normal blood counts and metabolic profile.',
    hospital_doctor: 'Metro Cancer Institute — Dr. Priya Sharma',
    attached_report: 'Surveillance_Mammogram_2025.pdf',
    created_at: '2025-01-20T10:30:00Z'
  },
  {
    id: 'tl-7',
    patient_id: 'pat-1',
    date: '2025-02-28',
    event_type: 'Current Status',
    title: 'Active Survivorship & Monitoring',
    description: 'Patient reports good energy, mild residual numbness in fingertips, fully adhering to endocrine therapy.',
    hospital_doctor: 'Metro Cancer Institute — Care Coordination Team',
    attached_report: null,
    created_at: '2025-02-28T09:00:00Z'
  }
];

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-1',
    patient_id: 'pat-1',
    name: 'Surveillance Mammogram & Ultrasound',
    date: '2025-01-20',
    category: 'Imaging',
    status: 'Available',
    file_url: '#',
    notes: 'BI-RADS 2 - Benign findings post-lumpectomy. No evidence of recurrence.',
    disclaimer: 'Demonstration document placeholder. Does not claim real medical verification.'
  },
  {
    id: 'rep-2',
    patient_id: 'pat-1',
    name: 'Comprehensive Metabolic & CBC Panel',
    date: '2025-01-18',
    category: 'Lab',
    status: 'Available',
    file_url: '#',
    notes: 'Hemoglobin 12.8 g/dL, Platelets 220k, WBC 5.4, Normal kidney and liver enzymes.',
    disclaimer: 'Demonstration document placeholder. Does not claim real medical verification.'
  },
  {
    id: 'rep-3',
    patient_id: 'pat-1',
    name: 'Bone Mineral Density (DXA) Scan',
    date: '2024-11-15',
    category: 'Imaging',
    status: 'Available',
    file_url: '#',
    notes: 'Lumbar spine T-score -1.2, Left femoral neck T-score -1.0. Routine calcium/Vit D recommended.',
    disclaimer: 'Demonstration document placeholder. Does not claim real medical verification.'
  },
  {
    id: 'rep-4',
    patient_id: 'pat-1',
    name: 'Surgical Pathology & Margin Report',
    date: '2024-05-28',
    category: 'Discharge Summary',
    status: 'Available',
    file_url: '#',
    notes: '1.8 cm tumor resected with 5mm clear radial margins. Sentinel node 0/3 positive.',
    disclaimer: 'Demonstration document placeholder. Does not claim real medical verification.'
  }
];

export const INITIAL_MONITORING_ITEMS: MonitoringItem[] = [
  {
    area: 'Cardiovascular Health',
    why_monitored: 'Previous anthracycline chemotherapy (Doxorubicin) and chest radiation require baseline and periodic cardiac function monitoring.',
    what_to_discuss: 'Report any unusual shortness of breath, chest flutter, or lower leg swelling to your cardiologist or oncologist.',
    monitoring_level: 'MODERATE'
  },
  {
    area: 'Bone Density & Skeletal Health',
    why_monitored: 'Endocrine therapy (Tamoxifen) and past chemotherapies can impact bone mineral density over time.',
    what_to_discuss: 'Review daily calcium/Vitamin D3 supplementation and scheduled follow-up DXA bone density scan.',
    monitoring_level: 'LOW'
  },
  {
    area: 'Peripheral Nerve Health (Neuropathy)',
    why_monitored: 'Taxane therapy (Paclitaxel) can cause numbness, tingling, or hypersensitivity in fingers or toes.',
    what_to_discuss: 'Discuss changes in fine motor skills, buttoning clothes, or balance with your care team.',
    monitoring_level: 'LOW'
  },
  {
    area: 'Routine Blood Counts & Liver Function',
    why_monitored: 'Ongoing surveillance during endocrine treatment to ensure marrow recovery and healthy liver metabolism.',
    what_to_discuss: 'Upcoming scheduled 6-month CBC and hepatic panel check at next visit.',
    monitoring_level: 'MODERATE'
  },
  {
    area: 'Emotional & Survivorship Wellbeing',
    why_monitored: 'Post-treatment anxiety, fear of recurrence, and fatigue are common survivorship concerns.',
    what_to_discuss: 'Explore hospital cancer support groups, gentle exercise routines, and mindfulness resources.',
    monitoring_level: 'LOW'
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    specialization: 'Medical Oncology',
    hospital_id: 'hosp-1',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    today_status: 'AVAILABLE',
    available_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    available_time_slots: ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM'],
    consultation_types: ['In-person', 'Teleconsultation'],
    next_available: 'Today – 4:30 PM',
    consultation_duration: '30 mins',
    experience_years: 14,
    rating: 4.9
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    specialization: 'Gastrointestinal Oncology',
    hospital_id: 'hosp-1',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    today_status: 'AVAILABLE_LATER',
    available_days: ['Tuesday', 'Thursday', 'Friday'],
    available_time_slots: ['02:30 PM', '03:45 PM', '05:00 PM'],
    consultation_types: ['In-person', 'Teleconsultation'],
    next_available: 'Tomorrow – 10:00 AM',
    consultation_duration: '45 mins',
    experience_years: 18,
    rating: 4.8
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova',
    specialization: 'Radiation Oncology',
    hospital_id: 'hosp-1',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    today_status: 'AVAILABLE',
    available_days: ['Monday', 'Wednesday', 'Friday'],
    available_time_slots: ['10:00 AM', '01:30 PM', '03:15 PM'],
    consultation_types: ['In-person'],
    next_available: 'Today – 1:30 PM',
    consultation_duration: '30 mins',
    experience_years: 11,
    rating: 4.9
  },
  {
    id: 'doc-4',
    name: 'Dr. Rajesh Kumar',
    specialization: 'Hematology & Transfusion Medicine',
    hospital_id: 'hosp-2',
    hospital_name: 'St. Jude Comprehensive Oncology Hospital',
    today_status: 'AVAILABLE',
    available_days: ['Monday', 'Tuesday', 'Thursday'],
    available_time_slots: ['11:30 AM', '02:00 PM', '04:00 PM'],
    consultation_types: ['In-person', 'Teleconsultation'],
    next_available: 'Today – 2:00 PM',
    consultation_duration: '30 mins',
    experience_years: 16,
    rating: 4.95
  },
  {
    id: 'doc-5',
    name: 'Dr. Sarah Al-Mansoor',
    specialization: 'Cardio-Oncology',
    hospital_id: 'hosp-1',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    today_status: 'AVAILABLE_LATER',
    available_days: ['Tuesday', 'Wednesday', 'Friday'],
    available_time_slots: ['01:00 PM', '03:30 PM'],
    consultation_types: ['In-person', 'Teleconsultation'],
    next_available: 'Thursday – 1:00 PM',
    consultation_duration: '40 mins',
    experience_years: 12,
    rating: 4.7
  },
  {
    id: 'doc-6',
    name: 'Dr. James Wilson',
    specialization: 'Surgical Oncology',
    hospital_id: 'hosp-3',
    hospital_name: 'Apex Memorial Community Hospital',
    today_status: 'NOT_AVAILABLE',
    available_days: ['Monday', 'Thursday'],
    available_time_slots: ['08:00 AM', '12:00 PM'],
    consultation_types: ['In-person'],
    next_available: 'Next Monday – 8:00 AM',
    consultation_duration: '45 mins',
    experience_years: 22,
    rating: 4.85
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patient_id: 'pat-1',
    patient_name: 'Sarah Jenkins',
    hospital_id: 'hosp-1',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    doctor_id: 'doc-1',
    doctor_name: 'Dr. Priya Sharma',
    date: '2025-03-12',
    time_slot: '04:30 PM',
    consultation_type: 'In-person',
    reason: 'Routine 6-month survivorship check & endocrine therapy review',
    status: 'ACCEPTED',
    created_at: '2025-03-01T10:00:00Z'
  },
  {
    id: 'apt-2',
    patient_id: 'pat-1',
    patient_name: 'Sarah Jenkins',
    hospital_id: 'hosp-1',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    doctor_id: 'doc-5',
    doctor_name: 'Dr. Sarah Al-Mansoor',
    date: '2025-03-20',
    time_slot: '01:00 PM',
    consultation_type: 'Teleconsultation',
    reason: 'Cardio-oncology baseline checkup following chemotherapy',
    status: 'ACCEPTED',
    created_at: '2025-03-02T11:30:00Z'
  }
];

export const INITIAL_CAREGIVER_PERMISSIONS: CaregiverPermissions = {
  patient_id: 'pat-1',
  caregiver_id: 'cg-1',
  caregiver_name: 'Mark Jenkins',
  caregiver_email: 'mark.jenkins@demo.carepath360.org',
  appointments: true,
  reports: false,
  health_timeline: true,
  notifications: true
};

export const INITIAL_EMERGENCY_HEALTH_TIMELINE: EmergencyTimelineEvent[] = [
  {
    id: 'eht-1',
    patient_id: 'pat-1',
    timestamp: '08:00 AM',
    what_changed: 'Patient reported normal condition with mild morning fatigue.',
    who_reported: 'Sarah Jenkins (Patient)',
    severity: 'NORMAL'
  },
  {
    id: 'eht-2',
    patient_id: 'pat-1',
    timestamp: '02:00 PM',
    what_changed: 'Patient logged localized swelling and warmth in left lower leg.',
    who_reported: 'Sarah Jenkins (Patient)',
    severity: 'MODERATE'
  },
  {
    id: 'eht-3',
    patient_id: 'pat-1',
    timestamp: '05:00 PM',
    what_changed: 'Pain rating increased to 6/10 when walking.',
    who_reported: 'Sarah Jenkins (Patient)',
    severity: 'MODERATE_HIGH'
  },
  {
    id: 'eht-4',
    patient_id: 'pat-1',
    timestamp: '07:30 PM',
    what_changed: 'Caregiver notified via automated portal notification.',
    who_reported: 'System Alert Dispatcher',
    severity: 'STATUS_UPDATE'
  },
  {
    id: 'eht-5',
    patient_id: 'pat-1',
    timestamp: '08:15 PM',
    what_changed: 'Telehealth nurse triage contact requested for clinical evaluation.',
    who_reported: 'Mark Jenkins (Caregiver)',
    severity: 'URGENT_ACTION'
  }
];

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'dnr-001',
    name: 'Alex Rivera',
    age: 29,
    blood_group: 'B+',
    phone: '+1 (555) 012-1000',
    email: 'alex.rivera@demo-carepath.org',
    latitude: 37.7765,
    longitude: -122.4170,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-001',
    last_active: 'Active within 10 mins',
    response_rate: 96,
    distance_km: 0.35,
    eta_minutes: 5,
    priority_score: 94,
    match_rationale: 'Prioritized: Nearby (0.35 KM), available, B+ exact match, 5 min ETA.',
    current_response_status: 'NO_RESPONSE'
  },
  {
    id: 'dnr-002',
    name: 'Devon Miller',
    age: 34,
    blood_group: 'B+',
    phone: '+1 (555) 012-1001',
    email: 'devon.miller@demo-carepath.org',
    latitude: 37.7710,
    longitude: -122.4230,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-002',
    last_active: 'Active 20 mins ago',
    response_rate: 91,
    distance_km: 0.72,
    eta_minutes: 8,
    priority_score: 88,
    match_rationale: 'Prioritized: Nearby (0.72 KM), available, B+ exact match, 8 min ETA.',
    current_response_status: 'NO_RESPONSE'
  },
  {
    id: 'dnr-003',
    name: 'Chloe Patel',
    age: 26,
    blood_group: 'O-',
    phone: '+1 (555) 012-1002',
    email: 'chloe.patel@demo-carepath.org',
    latitude: 37.7790,
    longitude: -122.4260,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-003',
    last_active: 'Active 5 mins ago',
    response_rate: 94,
    distance_km: 0.85,
    eta_minutes: 9,
    priority_score: 86,
    match_rationale: 'Prioritized: Nearby (0.85 KM), universal O- compatibility, 9 min ETA.',
    current_response_status: 'NO_RESPONSE'
  },
  {
    id: 'dnr-004',
    name: 'Marcus Brody',
    age: 38,
    blood_group: 'B+',
    phone: '+1 (555) 012-1004',
    email: 'marcus.brody@demo-carepath.org',
    latitude: 37.7650,
    longitude: -122.4100,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-004',
    last_active: 'Active 15 mins ago',
    response_rate: 89,
    distance_km: 1.45,
    eta_minutes: 12,
    priority_score: 79,
    match_rationale: 'Stage 2 candidate (1.45 KM): Available, B+ exact match, 12 min ETA.',
    current_response_status: 'NO_RESPONSE'
  },
  {
    id: 'dnr-005',
    name: 'Elena Gomez',
    age: 31,
    blood_group: 'B+',
    phone: '+1 (555) 012-1005',
    email: 'elena.gomez@demo-carepath.org',
    latitude: 37.7850,
    longitude: -122.4350,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-005',
    last_active: 'Active 12 mins ago',
    response_rate: 92,
    distance_km: 2.10,
    eta_minutes: 15,
    priority_score: 73,
    match_rationale: 'Stage 2 candidate (2.10 KM): Available, B+ exact match, 15 min ETA.',
    current_response_status: 'NO_RESPONSE'
  },
  {
    id: 'dnr-006',
    name: 'Jordan Blake',
    age: 44,
    blood_group: 'O+',
    phone: '+1 (555) 012-1006',
    email: 'jordan.blake@demo-carepath.org',
    latitude: 37.7600,
    longitude: -122.4250,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-006',
    last_active: 'Active 35 mins ago',
    response_rate: 88,
    distance_km: 1.80,
    eta_minutes: 14,
    priority_score: 75,
    match_rationale: 'Stage 2 candidate (1.80 KM): O+ compatible for B+ recipient, 14 min ETA.',
    current_response_status: 'NO_RESPONSE'
  },
  {
    id: 'dnr-007',
    name: 'Sophia Martinez',
    age: 27,
    blood_group: 'B+',
    phone: '+1 (555) 012-1008',
    email: 'sophia.martinez@demo-carepath.org',
    latitude: 37.7550,
    longitude: -122.4120,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-007',
    last_active: 'Active 18 mins ago',
    response_rate: 95,
    distance_km: 2.75,
    eta_minutes: 19,
    priority_score: 68,
    match_rationale: 'Stage 2 candidate (2.75 KM): Available, B+ exact match, 19 min ETA.',
    current_response_status: 'NO_RESPONSE'
  },
  {
    id: 'dnr-008',
    name: 'Aaliyah Khan',
    age: 33,
    blood_group: 'B+',
    phone: '+1 (555) 012-1010',
    email: 'aaliyah.khan@demo-carepath.org',
    latitude: 37.7500,
    longitude: -122.4350,
    available: true,
    verified: true,
    emergency_opt_in: true,
    notification_token: 'token-dnr-008',
    last_active: 'Active 22 mins ago',
    response_rate: 90,
    distance_km: 3.20,
    eta_minutes: 22,
    priority_score: 62,
    match_rationale: 'Stage 3 candidate (3.20 KM): Available, B+ exact match, 22 min ETA.',
    current_response_status: 'NO_RESPONSE'
  }
];

export const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'br-101',
    hospital_id: 'hosp-1',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    blood_group: 'B+',
    units_required: 4,
    units_confirmed: 0,
    urgency: 'CRITICAL',
    latitude: 37.7749,
    longitude: -122.4194,
    radius_km: 1.0,
    status: 'ACTIVE',
    alerted_donors_count: 3,
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    fallback_options: [
      { name: 'Regional Red Cross Blood Hub', distance_km: 6.8, contact: '+1 (555) 019-9900', type: 'Blood Bank' },
      { name: 'St. Jude Transfusion Center', distance_km: 2.1, contact: '+1 (555) 019-8821', type: 'Partner Hospital' },
      { name: 'Hope Life Blood Network NGO', distance_km: 8.5, contact: '+1 (555) 019-7733', type: 'NGO' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'pat-1',
    title: 'Follow-up Appointment Confirmed',
    message: 'Dr. Priya Sharma confirmed your 6-month survivorship review on March 12 at 4:30 PM.',
    category: 'APPOINTMENT',
    is_read: false,
    timestamp: '10 mins ago',
    action_url: '/appointments'
  },
  {
    id: 'notif-2',
    user_id: 'pat-1',
    title: 'Personalized Monitoring Reminder',
    message: 'Routine cardiovascular checkup recommendation added to your active monitoring plan.',
    category: 'MONITORING',
    is_read: false,
    timestamp: '2 hours ago',
    action_url: '/monitoring-plan'
  },
  {
    id: 'notif-3',
    user_id: 'doc-1',
    title: 'New Appointment Request',
    message: 'Sarah Jenkins requested consultation for survivorship follow-up.',
    category: 'APPOINTMENT',
    is_read: true,
    timestamp: 'Yesterday',
    action_url: '/hospital/appointments'
  },
  {
    id: 'notif-4',
    user_id: 'dnr-001',
    title: 'BloodSOS Emergency Alert (B+)',
    message: 'Critical B+ blood requirement at Metro Cancer Institute (0.35 km away).',
    category: 'BLOOD_SOS',
    is_read: false,
    timestamp: 'Just now',
    action_url: '/blood-sos'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2025-03-08 09:15:22',
    actor_name: 'System Security Officer',
    actor_role: 'ADMIN',
    action: 'VERIFIED_HOSPITAL',
    target: 'Metro Cancer Institute',
    details: 'Hospital credentials and transfusion license verified.'
  },
  {
    id: 'aud-2',
    timestamp: '2025-03-08 10:04:11',
    actor_name: 'Dr. Priya Sharma',
    actor_role: 'DOCTOR',
    action: 'CONFIRMED_APPOINTMENT',
    target: 'Sarah Jenkins (pat-1)',
    details: 'Consultation slot 4:30 PM confirmed.'
  },
  {
    id: 'aud-3',
    timestamp: '2025-03-08 11:20:45',
    actor_name: 'Sarah Jenkins',
    actor_role: 'PATIENT',
    action: 'UPDATED_CAREGIVER_PERMISSIONS',
    target: 'Mark Jenkins',
    details: 'Restricted reports permission; enabled appointment & timeline access.'
  }
];
