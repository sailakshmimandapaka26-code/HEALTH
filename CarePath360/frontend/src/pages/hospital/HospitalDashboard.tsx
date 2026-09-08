import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Stethoscope,
  Calendar,
  Users,
  Droplet,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const HospitalDashboard: React.FC = () => {
  const { doctors, updateDoctorStatus, appointments, updateAppointmentStatus, activeBloodRequest } = useApp();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleStatusToggle = (
    doctorId: string,
    status: 'AVAILABLE' | 'AVAILABLE_LATER' | 'NOT_AVAILABLE'
  ) => {
    updateDoctorStatus(doctorId, status);
    setFeedback(`Doctor availability updated to ${status}. Patient dashboard synchronized!`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleAppointmentAction = (aptId: string, action: 'ACCEPTED' | 'REJECTED') => {
    updateAppointmentStatus(aptId, action);
    setFeedback(`Appointment #${aptId} marked as ${action}. Patient notified.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const pendingAppointments = appointments.filter(a => a.status === 'PENDING');
  const availableDoctorsCount = doctors.filter(d => d.today_status === 'AVAILABLE').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Hospital Oncology Command Center</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Metro Cancer Institute & Medical Center • Centralized clinical coordination, appointments & BloodSOS dispatch.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/blood-sos"
            className="flex items-center space-x-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Droplet className="w-4 h-4" />
            <span>BloodSOS Emergency Map</span>
          </Link>
          <Link
            to="/hospital/doctors"
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Manage All Doctors</span>
          </Link>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-900 text-xs rounded-xl flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Hospital Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Oncologists Available</span>
            <Stethoscope className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {availableDoctorsCount} <span className="text-xs text-slate-400 font-normal">/ {doctors.length} on duty</span>
          </div>
          <p className="text-[11px] text-teal-700 mt-1 font-medium">Real-time patient schedule open</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Pending Consult Requests</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{pendingAppointments.length}</div>
          <p className="text-[11px] text-amber-700 mt-1 font-medium">Awaiting coordinator review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Active Blood Requests</span>
            <Droplet className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600 mt-2">
            {activeBloodRequest.status === 'ACTIVE' ? '1 CRITICAL' : '0 (Fulfilled)'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Radius: {activeBloodRequest.radius_km} KM</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Active Cancer Survivors</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">4 Patients</div>
          <p className="text-[11px] text-indigo-700 mt-1 font-medium">100% survivorship adherence</p>
        </div>
      </div>

      {/* Two Column Layout: Quick Doctor Availability Controller & Appointment Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Doctor Availability Live Switcher */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Real-Time Doctor Availability Control</h2>
              <p className="text-xs text-slate-500">
                Toggling availability here immediately updates the patient "Find Doctor" directory.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {doctors.slice(0, 5).map(doc => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900">{doc.name}</div>
                  <div className="text-[11px] text-teal-700">{doc.specialization}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Next slot: {doc.next_available}</div>
                </div>

                {/* 3-Way Availability Buttons */}
                <div className="flex items-center space-x-1.5 self-start sm:self-auto">
                  <button
                    onClick={() => handleStatusToggle(doc.id, 'AVAILABLE')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                      doc.today_status === 'AVAILABLE'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50'
                    }`}
                  >
                    🟢 Available
                  </button>
                  <button
                    onClick={() => handleStatusToggle(doc.id, 'AVAILABLE_LATER')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                      doc.today_status === 'AVAILABLE_LATER'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-amber-50'
                    }`}
                  >
                    🟡 Later
                  </button>
                  <button
                    onClick={() => handleStatusToggle(doc.id, 'NOT_AVAILABLE')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                      doc.today_status === 'NOT_AVAILABLE'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-rose-50'
                    }`}
                  >
                    🔴 Off
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Appointment Request Queue */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Live Consultation Queue</h2>
              <p className="text-xs text-slate-500">Incoming booking requests from patients</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
              {appointments.length} Total
            </span>
          </div>

          <div className="mt-4 space-y-3 max-h-[450px] overflow-y-auto">
            {appointments.map(apt => (
              <div
                key={apt.id}
                className={`p-3.5 rounded-xl border transition ${
                  apt.status === 'PENDING'
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">{apt.patient_name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          apt.status === 'ACCEPTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : apt.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Doctor: <strong>{apt.doctor_name}</strong> • {apt.date} at {apt.time_slot}
                    </p>
                    <p className="text-[11px] text-slate-500 italic mt-0.5">"{apt.reason}"</p>
                  </div>

                  {/* Actions if Pending */}
                  {apt.status === 'PENDING' && (
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <button
                        onClick={() => handleAppointmentAction(apt.id, 'ACCEPTED')}
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                        title="Accept Consultation"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAppointmentAction(apt.id, 'REJECTED')}
                        className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                        title="Reschedule / Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
