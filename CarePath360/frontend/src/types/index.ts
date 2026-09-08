export type UserRole = 'PATIENT' | 'CAREGIVER' | 'HOSPITAL' | 'DOCTOR' | 'DONOR' | 'ADMIN';

export type DoctorStatus = 'AVAILABLE' | 'AVAILABLE_LATER' | 'NOT_AVAILABLE';

export type AppointmentStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export type UrgencyLevel = 'CRITICAL' | 'URGENT' | 'STANDARD';

export type BloodRequestStatus = 'ACTIVE' | 'FULFILLED' | 'EXPIRED';

export type TriageCategory = 'GREEN' | 'YELLOW' | 'RED';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  hospital_id?: string;
  treating_doctor_id?: string;
  patient_id?: string;
  blood_group?: string;
}

export interface HealthPassport {
  id: string;
  patient_id: string;
  patient_name: string;
  age: number;
  gender: string;
  cancer_type: string;
  cancer_stage: string;
  diagnosis_date: string;
  treatment_history: string;
  chemotherapy_details: string;
  radiation_therapy_details: string;
  surgery_history: string;
  current_medications: string[];
  important_lab_reports: string[];
  imaging_reports: string[];
  previous_complications: string[];
  allergies: string[];
  other_medical_conditions: string[];
  treating_hospital: string;
  treating_oncologist: string;
  emergency_contact: string;
  emergency_phone: string;
  last_updated: string;
  is_demo_data: boolean;
  disclaimer: string;
}

export interface TimelineEvent {
  id: string;
  patient_id: string;
  date: string;
  event_type: string;
  title: string;
  description: string;
  hospital_doctor: string;
  attached_report?: string | null;
  created_at: string;
}

export interface MedicalReport {
  id: string;
  patient_id: string;
  name: string;
  date: string;
  category: 'Lab' | 'Imaging' | 'Discharge Summary' | 'Treatment' | 'Follow-up' | string;
  status: string;
  file_url: string;
  notes?: string;
  disclaimer: string;
}

export interface MonitoringItem {
  area: string;
  why_monitored: string;
  what_to_discuss: string;
  monitoring_level: 'LOW' | 'MODERATE' | 'HIGH';
}

export interface MonitoringPlan {
  patient_id: string;
  items: MonitoringItem[];
  generated_at: string;
  disclaimer: string;
}

export interface AICareSummary {
  summary: string;
  suggested_questions: string[];
  follow_up_tasks: { task: string; priority: string; status: string }[];
  upcoming_care_actions: string[];
  generated_at: string;
  disclaimer: string;
}

export interface HealthConcern {
  id: string;
  patient_id: string;
  symptom: string;
  start_date: string;
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  description: string;
  related_report?: string | null;
  current_medications?: string | null;
  triage_category: TriageCategory;
  triage_guidance: string;
  created_at: string;
  disclaimer: string;
}

export interface EmergencyTimelineEvent {
  id: string;
  patient_id: string;
  timestamp: string;
  what_changed: string;
  who_reported: string;
  severity: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital_id: string;
  hospital_name: string;
  today_status: DoctorStatus;
  available_days: string[];
  available_time_slots: string[];
  consultation_types: string[];
  next_available: string;
  consultation_duration: string;
  experience_years: number;
  rating: number;
}

export interface Appointment {
  id: string;
  patient_id: string;
  patient_name: string;
  hospital_id: string;
  hospital_name: string;
  doctor_id: string;
  doctor_name: string;
  date: string;
  time_slot: string;
  consultation_type: string;
  reason: string;
  status: AppointmentStatus;
  created_at: string;
}

export interface CaregiverPermissions {
  patient_id: string;
  caregiver_id: string;
  caregiver_name: string;
  caregiver_email: string;
  appointments: boolean;
  reports: boolean;
  health_timeline: boolean;
  notifications: boolean;
}

export interface Donor {
  id: string;
  name: string;
  age: number;
  blood_group: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  available: boolean;
  verified: boolean;
  emergency_opt_in: boolean;
  notification_token: string;
  last_active: string;
  response_rate: number;
  distance_km?: number;
  eta_minutes?: number;
  priority_score?: number;
  match_rationale?: string;
  current_response_status?: 'ALERTED' | 'ACCEPTED' | 'DECLINED' | 'ON_THE_WAY' | 'NO_RESPONSE';
}

export interface BloodRequest {
  id: string;
  hospital_id: string;
  hospital_name: string;
  blood_group: string;
  units_required: number;
  units_confirmed: number;
  urgency: UrgencyLevel;
  latitude: number;
  longitude: number;
  radius_km: number;
  status: BloodRequestStatus;
  alerted_donors_count: number;
  created_at: string;
  expires_at: string;
  fallback_options?: { name: string; distance_km: number; contact: string; type: string }[];
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  category: 'APPOINTMENT' | 'DOCTOR' | 'REPORT' | 'MONITORING' | 'BLOOD_SOS' | 'CAREGIVER';
  is_read: boolean;
  timestamp: string;
  action_url?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor_name: string;
  actor_role: string;
  action: string;
  target: string;
  details: string;
}
