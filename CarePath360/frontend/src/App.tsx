import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';

// Pages
import { LoginPage } from './pages/auth/LoginPage';
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { HealthPassportPage } from './pages/patient/HealthPassportPage';
import { CancerJourneyPage } from './pages/patient/CancerJourneyPage';
import { MonitoringPlanPage } from './pages/patient/MonitoringPlanPage';
import { HealthConcernPage } from './pages/patient/HealthConcernPage';
import { ReportsPage } from './pages/patient/ReportsPage';
import { FindDoctorPage } from './pages/patient/FindDoctorPage';
import { AppointmentsPage } from './pages/patient/AppointmentsPage';
import { CaregiverSettingsPage } from './pages/patient/CaregiverSettingsPage';
import { EmergencyPage } from './pages/patient/EmergencyPage';
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { DoctorManagementPage } from './pages/hospital/DoctorManagementPage';
import { BloodSOSPage } from './pages/hospital/BloodSOSPage';
import { DonorDashboard } from './pages/donor/DonorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { NotificationsPage } from './pages/common/NotificationsPage';
import { PrivacySafetyPage } from './pages/common/PrivacySafetyPage';

const RoleBasedHome: React.FC = () => {
  const { currentUser } = useApp();

  switch (currentUser.role) {
    case 'HOSPITAL':
    case 'DOCTOR':
      return <HospitalDashboard />;
    case 'DONOR':
      return <DonorDashboard />;
    case 'ADMIN':
      return <AdminDashboard />;
    case 'PATIENT':
    case 'CAREGIVER':
    default:
      return <PatientDashboard />;
  }
};

const MainLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DisclaimerBanner />
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<RoleBasedHome />} />
            <Route path="/passport" element={<HealthPassportPage />} />
            <Route path="/cancer-journey" element={<CancerJourneyPage />} />
            <Route path="/monitoring-plan" element={<MonitoringPlanPage />} />
            <Route path="/health-concerns" element={<HealthConcernPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/find-doctor" element={<FindDoctorPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/blood-sos" element={<BloodSOSPage />} />
            <Route path="/caregiver" element={<CaregiverSettingsPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/privacy" element={<PrivacySafetyPage />} />

            {/* Hospital & Doctor routes */}
            <Route path="/hospital/doctors" element={<DoctorManagementPage />} />
            <Route path="/hospital/appointments" element={<AppointmentsPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
