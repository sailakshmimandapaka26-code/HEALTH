import React, { useState } from 'react';
import {
  Users,
  Shield,
  CheckCircle2,
  Calendar,
  FolderLock,
  Milestone,
  Bell,
  Mail,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const CaregiverSettingsPage: React.FC = () => {
  const { caregiverPermissions, updateCaregiverPermissions } = useApp();
  const [successNotice, setSuccessNotice] = useState(false);

  const handleToggle = (key: 'appointments' | 'reports' | 'health_timeline' | 'notifications') => {
    updateCaregiverPermissions({
      [key]: !caregiverPermissions[key]
    });
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black text-slate-900">Caregiver Access & Permissions</h1>
          <DemoBadge />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          You have sovereign control over what family members or caregivers can see. Medical history is shielded by default.
        </p>

        <div className="mt-4 p-3.5 bg-teal-50/70 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-center space-x-2">
          <Shield className="w-4 h-4 text-teal-700 flex-shrink-0" />
          <span>
            <strong>Patient Privacy Shield:</strong> Full clinical reports are restricted unless you explicitly switch them ON below.
          </span>
        </div>
      </div>

      {successNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Caregiver permissions updated and synchronized with access firewall.</span>
        </div>
      )}

      {/* Active Designated Caregiver Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900">{caregiverPermissions.caregiver_name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  Spouse / Primary Caregiver
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center space-x-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{caregiverPermissions.caregiver_email}</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center space-x-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Permission Active</span>
            </span>
          </div>
        </div>

        {/* Granular Permission Toggles Matrix */}
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Granular Data Category Access
          </h4>

          {/* Appointments Permission */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">Upcoming Appointments & Schedule</div>
                <p className="text-[11px] text-slate-500">Allow caregiver to see consultation dates and doctor slots</p>
              </div>
            </div>

            <button
              onClick={() => handleToggle('appointments')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                caregiverPermissions.appointments ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform"></span>
            </button>
          </div>

          {/* Medical Reports Permission (Critical Toggle) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                <FolderLock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">Detailed Lab & Imaging Reports</div>
                <p className="text-[11px] text-slate-500">
                  Allow caregiver to open pathology scans, mammogram notes, and lab PDFs
                </p>
              </div>
            </div>

            <button
              onClick={() => handleToggle('reports')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                caregiverPermissions.reports ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform"></span>
            </button>
          </div>

          {/* Health Timeline Permission */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Milestone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">Health Journey & Emergency Timeline</div>
                <p className="text-[11px] text-slate-500">Allow caregiver to monitor condition updates and milestones</p>
              </div>
            </div>

            <button
              onClick={() => handleToggle('health_timeline')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                caregiverPermissions.health_timeline ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform"></span>
            </button>
          </div>

          {/* Notifications Permission */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">Care Alerts & Reminders</div>
                <p className="text-[11px] text-slate-500">Send automatic SMS/portal alerts when symptoms are logged</p>
              </div>
            </div>

            <button
              onClick={() => handleToggle('notifications')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                caregiverPermissions.notifications ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
