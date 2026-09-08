import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  HealthPassport,
  TimelineEvent,
  MedicalReport,
  Doctor,
  Appointment,
  CaregiverPermissions,
  Donor,
  BloodRequest,
  NotificationItem,
  EmergencyTimelineEvent,
  HealthConcern
} from '../types';
import {
  DEMO_USERS,
  INITIAL_HEALTH_PASSPORT,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_REPORTS,
  INITIAL_DOCTORS,
  INITIAL_APPOINTMENTS,
  INITIAL_CAREGIVER_PERMISSIONS,
  INITIAL_DONORS,
  INITIAL_BLOOD_REQUESTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_EMERGENCY_HEALTH_TIMELINE
} from '../services/mockData';

interface AppContextType {
  currentUser: UserProfile;
  switchRole: (role: string) => void;
  passport: HealthPassport;
  updatePassport: (data: Partial<HealthPassport>) => void;
  timeline: TimelineEvent[];
  addTimelineEvent: (event: Omit<TimelineEvent, 'id' | 'created_at'>) => void;
  reports: MedicalReport[];
  uploadReport: (report: Omit<MedicalReport, 'id' | 'disclaimer'>) => void;
  doctors: Doctor[];
  updateDoctorStatus: (doctorId: string, status: 'AVAILABLE' | 'AVAILABLE_LATER' | 'NOT_AVAILABLE', nextAvailable?: string) => void;
  appointments: Appointment[];
  bookAppointment: (apt: { doctor_id: string; doctor_name: string; hospital_id: string; hospital_name: string; date: string; time_slot: string; reason: string; consultation_type: string }) => void;
  updateAppointmentStatus: (aptId: string, status: Appointment['status']) => void;
  caregiverPermissions: CaregiverPermissions;
  updateCaregiverPermissions: (perms: Partial<CaregiverPermissions>) => void;
  emergencyTimeline: EmergencyTimelineEvent[];
  addEmergencyTimelineEntry: (entry: { what_changed: string; who_reported: string; severity: string }) => void;
  concerns: HealthConcern[];
  submitHealthConcern: (concern: { symptom: string; severity: 'Mild' | 'Moderate' | 'Severe'; duration: string; description: string; current_medications?: string }) => HealthConcern;
  bloodRequests: BloodRequest[];
  activeBloodRequest: BloodRequest;
  createBloodRequest: (blood_group: string, units_required: number, urgency: 'CRITICAL' | 'URGENT' | 'STANDARD') => void;
  expandRadius: () => void;
  donors: Donor[];
  recordDonorResponse: (donorId: string, status: 'ACCEPTED' | 'DECLINED' | 'ON_THE_WAY') => void;
  runHackathonDemoSimulation: () => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS.patient);
  const [passport, setPassport] = useState<HealthPassport>(INITIAL_HEALTH_PASSPORT);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE_EVENTS);
  const [reports, setReports] = useState<MedicalReport[]>(INITIAL_REPORTS);
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [caregiverPermissions, setCaregiverPermissions] = useState<CaregiverPermissions>(INITIAL_CAREGIVER_PERMISSIONS);
  const [emergencyTimeline, setEmergencyTimeline] = useState<EmergencyTimelineEvent[]>(INITIAL_EMERGENCY_HEALTH_TIMELINE);
  const [concerns, setConcerns] = useState<HealthConcern[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(INITIAL_BLOOD_REQUESTS);
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const activeBloodRequest = bloodRequests[0] || INITIAL_BLOOD_REQUESTS[0];

  const switchRole = (roleKey: string) => {
    const key = roleKey.toLowerCase();
    if (DEMO_USERS[key]) {
      setCurrentUser(DEMO_USERS[key]);
    }
  };

  const updatePassport = (data: Partial<HealthPassport>) => {
    setPassport(prev => ({
      ...prev,
      ...data,
      last_updated: new Date().toISOString().split('T')[0]
    }));
  };

  const addTimelineEvent = (eventData: Omit<TimelineEvent, 'id' | 'created_at'>) => {
    const newEvent: TimelineEvent = {
      ...eventData,
      id: `tl-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setTimeline(prev => [...prev, newEvent]);
  };

  const uploadReport = (reportData: Omit<MedicalReport, 'id' | 'disclaimer'>) => {
    const newRep: MedicalReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      disclaimer: 'Demonstration document placeholder. Does not claim real medical verification.'
    };
    setReports(prev => [newRep, ...prev]);
  };

  const updateDoctorStatus = (doctorId: string, status: 'AVAILABLE' | 'AVAILABLE_LATER' | 'NOT_AVAILABLE', nextAvailable?: string) => {
    setDoctors(prev =>
      prev.map(d =>
        d.id === doctorId
          ? {
              ...d,
              today_status: status,
              next_available: nextAvailable || (status === 'AVAILABLE' ? 'Today – 2:30 PM' : status === 'AVAILABLE_LATER' ? 'Tomorrow – 10:00 AM' : 'Next Week')
            }
          : d
      )
    );
  };

  const bookAppointment = (aptData: {
    doctor_id: string;
    doctor_name: string;
    hospital_id: string;
    hospital_name: string;
    date: string;
    time_slot: string;
    reason: string;
    consultation_type: string;
  }) => {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patient_id: currentUser.id,
      patient_name: currentUser.name,
      doctor_id: aptData.doctor_id,
      doctor_name: aptData.doctor_name,
      hospital_id: aptData.hospital_id,
      hospital_name: aptData.hospital_name,
      date: aptData.date,
      time_slot: aptData.time_slot,
      consultation_type: aptData.consultation_type,
      reason: aptData.reason,
      status: 'PENDING',
      created_at: new Date().toISOString()
    };
    setAppointments(prev => [newApt, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: 'doc-1',
      title: 'New Appointment Request',
      message: `${currentUser.name} requested an appointment for ${aptData.date} at ${aptData.time_slot}.`,
      category: 'APPOINTMENT',
      is_read: false,
      timestamp: 'Just now',
      action_url: '/hospital/appointments'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateAppointmentStatus = (aptId: string, status: Appointment['status']) => {
    setAppointments(prev =>
      prev.map(a => {
        if (a.id === aptId) {
          // Add notification for patient
          const notif: NotificationItem = {
            id: `notif-${Date.now()}`,
            user_id: a.patient_id,
            title: `Appointment ${status === 'ACCEPTED' ? 'Confirmed' : status.toLowerCase()}`,
            message: `Your consultation with ${a.doctor_name} on ${a.date} at ${a.time_slot} has been marked as ${status}.`,
            category: 'APPOINTMENT',
            is_read: false,
            timestamp: 'Just now',
            action_url: '/appointments'
          };
          setNotifications(n => [notif, ...n]);
          return { ...a, status };
        }
        return a;
      })
    );
  };

  const updateCaregiverPermissions = (perms: Partial<CaregiverPermissions>) => {
    setCaregiverPermissions(prev => ({
      ...prev,
      ...perms
    }));
  };

  const addEmergencyTimelineEntry = (entry: { what_changed: string; who_reported: string; severity: string }) => {
    const newEntry: EmergencyTimelineEvent = {
      id: `eht-${Date.now()}`,
      patient_id: passport.patient_id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      what_changed: entry.what_changed,
      who_reported: entry.who_reported,
      severity: entry.severity
    };
    setEmergencyTimeline(prev => [newEntry, ...prev]);
  };

  const submitHealthConcern = (concernData: {
    symptom: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    duration: string;
    description: string;
    current_medications?: string;
  }): HealthConcern => {
    let category: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN';
    let guidance = 'Document any subtle changes; review during your routine scheduled follow-up.';
    const text = (concernData.symptom + ' ' + concernData.description).toLowerCase();

    if (
      text.includes('chest pain') ||
      text.includes('shortness of breath') ||
      text.includes('breathing') ||
      text.includes('fever') ||
      concernData.severity === 'Severe'
    ) {
      category = 'RED';
      guidance = 'Seek urgent emergency medical evaluation immediately. If this is life-threatening, contact local emergency services (911/112) or go to the nearest emergency department.';
    } else if (
      text.includes('swelling') ||
      text.includes('pain') ||
      text.includes('tingling') ||
      concernData.severity === 'Moderate'
    ) {
      category = 'YELLOW';
      guidance = 'Contact your treating oncology nurse or clinic coordinator within 24-48 hours to discuss these symptoms.';
    }

    const newConcern: HealthConcern = {
      id: `con-${Date.now()}`,
      patient_id: passport.patient_id,
      symptom: concernData.symptom,
      start_date: new Date().toISOString().split('T')[0],
      duration: concernData.duration,
      severity: concernData.severity,
      description: concernData.description,
      current_medications: concernData.current_medications || passport.current_medications.join(', '),
      triage_category: category,
      triage_guidance: guidance,
      created_at: new Date().toISOString(),
      disclaimer: 'This is a care coordination and decision-support feature only. It does not replace professional medical advice.'
    };

    setConcerns(prev => [newConcern, ...prev]);

    // Log to emergency health timeline
    addEmergencyTimelineEntry({
      what_changed: `Logged symptom: ${concernData.symptom} (${concernData.severity})`,
      who_reported: `${passport.patient_name} (Patient)`,
      severity: category
    });

    return newConcern;
  };

  const createBloodRequest = (blood_group: string, units_required: number, urgency: 'CRITICAL' | 'URGENT' | 'STANDARD') => {
    const newReq: BloodRequest = {
      id: `br-${Date.now()}`,
      hospital_id: 'hosp-1',
      hospital_name: 'Metro Cancer Institute & Medical Center',
      blood_group,
      units_required,
      units_confirmed: 0,
      urgency,
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
    };
    setBloodRequests(prev => [newReq, ...prev]);

    // Reset donors for the new request
    setDonors(prev =>
      prev.map(d =>
        d.distance_km && d.distance_km <= 1.0 ? { ...d, current_response_status: 'ALERTED' } : { ...d, current_response_status: 'NO_RESPONSE' }
      )
    );
  };

  const expandRadius = () => {
    setBloodRequests(prev =>
      prev.map(r => {
        if (r.id === activeBloodRequest.id) {
          const nextRadius = r.radius_km < 3.0 ? 3.0 : 5.0;
          return {
            ...r,
            radius_km: nextRadius,
            alerted_donors_count: nextRadius === 3.0 ? 7 : 12
          };
        }
        return r;
      })
    );

    // Update donors within expanded radius to ALERTED
    const targetRadius = activeBloodRequest.radius_km < 3.0 ? 3.0 : 5.0;
    setDonors(prev =>
      prev.map(d => {
        if (d.distance_km && d.distance_km <= targetRadius && d.current_response_status === 'NO_RESPONSE') {
          return { ...d, current_response_status: 'ALERTED' };
        }
        return d;
      })
    );
  };

  const recordDonorResponse = (donorId: string, status: 'ACCEPTED' | 'DECLINED' | 'ON_THE_WAY') => {
    setDonors(prev =>
      prev.map(d => (d.id === donorId ? { ...d, current_response_status: status } : d))
    );

    if (status === 'ACCEPTED') {
      setBloodRequests(prev =>
        prev.map(r => {
          if (r.id === activeBloodRequest.id) {
            const confirmed = r.units_confirmed + 1;
            return {
              ...r,
              units_confirmed: confirmed,
              status: confirmed >= r.units_required ? 'FULFILLED' : r.status
            };
          }
          return r;
        })
      );
    }
  };

  const runHackathonDemoSimulation = () => {
    // 1-Click interactive demonstration of Progressive Radius:
    // Stage 1 (1 km): Donor 1 accepts, Donor 2 declines (1/4 confirmed)
    // Stage 2 (expand to 3 km): Donor 4 & 5 accept (3/4 confirmed)
    // Stage 3: Donor 7 accepts -> 4/4 FULFILLED!
    setDonors(prev =>
      prev.map(d => {
        if (d.id === 'dnr-001') return { ...d, current_response_status: 'ACCEPTED' };
        if (d.id === 'dnr-002') return { ...d, current_response_status: 'DECLINED' };
        if (d.id === 'dnr-004') return { ...d, current_response_status: 'ACCEPTED' };
        if (d.id === 'dnr-005') return { ...d, current_response_status: 'ON_THE_WAY' };
        if (d.id === 'dnr-007') return { ...d, current_response_status: 'ACCEPTED' };
        return d;
      })
    );

    setBloodRequests(prev =>
      prev.map(r => {
        if (r.id === activeBloodRequest.id) {
          return {
            ...r,
            radius_km: 3.0,
            units_confirmed: 4,
            status: 'FULFILLED',
            alerted_donors_count: 7
          };
        }
        return r;
      })
    );

    // Add alert notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        user_id: 'all',
        title: '✅ BloodSOS Requirement Fulfilled',
        message: 'All 4 critical B+ units coordinated successfully. Coordination paused.',
        category: 'BLOOD_SOS',
        is_read: false,
        timestamp: 'Just now',
        action_url: '/blood-sos'
      },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        passport,
        updatePassport,
        timeline,
        addTimelineEvent,
        reports,
        uploadReport,
        doctors,
        updateDoctorStatus,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        caregiverPermissions,
        updateCaregiverPermissions,
        emergencyTimeline,
        addEmergencyTimelineEntry,
        concerns,
        submitHealthConcern,
        bloodRequests,
        activeBloodRequest,
        createBloodRequest,
        expandRadius,
        donors,
        recordDonorResponse,
        runHackathonDemoSimulation,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
