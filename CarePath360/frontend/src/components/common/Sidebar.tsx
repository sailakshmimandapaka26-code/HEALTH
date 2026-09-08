import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Milestone,
  HeartPulse,
  AlertCircle,
  FolderLock,
  Search,
  Calendar,
  Droplet,
  Users,
  Bell,
  PhoneCall,
  Shield,
  Stethoscope,
  Building2,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { currentUser, caregiverPermissions } = useApp();
  const role = currentUser.role;

  // Build navigation items based on active role
  const getNavLinks = () => {
    switch (role) {
      case 'PATIENT':
        return [
          { to: '/', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/passport', label: 'My Health Passport', icon: FileText },
          { to: '/cancer-journey', label: 'Cancer Journey', icon: Milestone },
          { to: '/monitoring-plan', label: 'Monitoring Plan', icon: HeartPulse },
          { to: '/health-concerns', label: 'Health Concerns', icon: AlertCircle },
          { to: '/reports', label: 'Reports', icon: FolderLock },
          { to: '/find-doctor', label: 'Find Doctor', icon: Search },
          { to: '/appointments', label: 'Appointments', icon: Calendar },
          { to: '/blood-sos', label: 'Blood Support (BloodSOS)', icon: Droplet },
          { to: '/caregiver', label: 'Caregiver Access', icon: Users },
          { to: '/notifications', label: 'Notifications', icon: Bell },
          { to: '/emergency', label: 'Emergency Support', icon: PhoneCall },
          { to: '/privacy', label: 'Privacy & Safety', icon: Shield }
        ];

      case 'CAREGIVER':
        const cgLinks = [
          { to: '/', label: 'Caregiver Dashboard', icon: LayoutDashboard },
          { to: '/appointments', label: 'Appointments', icon: Calendar },
          { to: '/find-doctor', label: 'Doctor Availability', icon: Search },
          { to: '/emergency', label: 'Emergency Timeline', icon: PhoneCall },
          { to: '/blood-sos', label: 'Blood Support', icon: Droplet },
          { to: '/notifications', label: 'Notifications', icon: Bell },
          { to: '/privacy', label: 'Privacy & Permissions', icon: Shield }
        ];
        // Only include Reports if patient granted permission
        if (caregiverPermissions.reports) {
          cgLinks.splice(3, 0, { to: '/reports', label: 'Medical Reports', icon: FolderLock });
        }
        return cgLinks;

      case 'HOSPITAL':
      case 'DOCTOR':
        return [
          { to: '/', label: 'Hospital Dashboard', icon: LayoutDashboard },
          { to: '/hospital/doctors', label: 'Doctors & Availability', icon: Stethoscope },
          { to: '/hospital/appointments', label: 'Appointment Queue', icon: Calendar },
          { to: '/blood-sos', label: 'BloodSOS Emergency', icon: Droplet },
          { to: '/emergency', label: 'Emergency Timeline', icon: PhoneCall },
          { to: '/admin', label: 'Analytics & Trends', icon: SlidersHorizontal },
          { to: '/notifications', label: 'Notifications', icon: Bell },
          { to: '/privacy', label: 'Privacy & Safety', icon: Shield }
        ];

      case 'DONOR':
        return [
          { to: '/', label: 'Donor Dashboard', icon: LayoutDashboard },
          { to: '/blood-sos', label: 'Emergency Blood Alerts', icon: Droplet },
          { to: '/notifications', label: 'Notifications', icon: Bell },
          { to: '/privacy', label: 'Privacy & Opt-In Policy', icon: Shield }
        ];

      case 'ADMIN':
        return [
          { to: '/', label: 'Admin Overview', icon: LayoutDashboard },
          { to: '/admin', label: 'System Analytics', icon: SlidersHorizontal },
          { to: '/blood-sos', label: 'BloodSOS Command', icon: Droplet },
          { to: '/hospital/doctors', label: 'Doctor Verification', icon: Stethoscope },
          { to: '/notifications', label: 'Audit & Alerts', icon: Bell },
          { to: '/privacy', label: 'Compliance & Safety', icon: Shield }
        ];

      default:
        return [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }];
    }
  };

  const navLinks = getNavLinks();

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between py-4 px-3">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {role} NAVIGATION
        </div>
        <nav className="space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Role Indicator Footer Card */}
      <div className="p-3 bg-gradient-to-br from-slate-50 to-teal-50/50 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center justify-between font-bold text-slate-800">
          <span>Active Session</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">Logged in as {currentUser.name}</p>
        <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-teal-700 font-semibold">
          <span>Role: {currentUser.role}</span>
          <span>Verified</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Navigation</span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
