import React, { useState } from 'react';
import {
  Stethoscope,
  PlusCircle,
  Building2,
  Clock,
  Calendar,
  Star,
  CheckCircle2,
  X,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Doctor } from '../../types';
import { DemoBadge } from '../../components/common/DemoBadge';

export const DoctorManagementPage: React.FC = () => {
  const { doctors, updateDoctorStatus } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: 'Medical Oncology',
    hospital_name: 'Metro Cancer Institute & Medical Center',
    available_days: 'Monday, Wednesday, Friday',
    available_time_slots: '10:00 AM, 02:00 PM, 04:30 PM',
    next_available: 'Tomorrow – 10:00 AM'
  });

  const handleStatusChange = (
    doctorId: string,
    status: 'AVAILABLE' | 'AVAILABLE_LATER' | 'NOT_AVAILABLE'
  ) => {
    updateDoctorStatus(doctorId, status);
    setFeedback('Status updated! Synced to patient search.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Doctor Directory & Schedule Management</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure oncologist consultation slots, real-time availability statuses, and clinical specialties.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Specialist</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                  <p className="text-xs text-teal-700 font-medium">{doc.specialization}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {doc.experience_years} yrs exp
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5 text-[11px]">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{doc.hospital_name}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-[11px] text-slate-500">Available Days:</div>
                  <div className="font-semibold text-slate-800">{doc.available_days.join(', ')}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Slots:</div>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {doc.available_time_slots.map(slot => (
                      <span key={slot} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Toggle Today's Real-Time Status
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                <button
                  onClick={() => handleStatusChange(doc.id, 'AVAILABLE')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${
                    doc.today_status === 'AVAILABLE'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'
                  }`}
                >
                  🟢 Available
                </button>
                <button
                  onClick={() => handleStatusChange(doc.id, 'AVAILABLE_LATER')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${
                    doc.today_status === 'AVAILABLE_LATER'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                  }`}
                >
                  🟡 Later
                </button>
                <button
                  onClick={() => handleStatusChange(doc.id, 'NOT_AVAILABLE')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${
                    doc.today_status === 'NOT_AVAILABLE'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-rose-50'
                  }`}
                >
                  🔴 Off
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Specialist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Add Clinical Specialist</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                setShowAddModal(false);
                setFeedback(`Added ${newDoctor.name} to staff registry.`);
                setTimeout(() => setFeedback(null), 3000);
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700">Doctor Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rachel Scott, MD"
                  value={newDoctor.name}
                  onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Specialty</label>
                <select
                  value={newDoctor.specialization}
                  onChange={e => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="Medical Oncology">Medical Oncology</option>
                  <option value="Gastrointestinal Oncology">Gastrointestinal Oncology</option>
                  <option value="Radiation Oncology">Radiation Oncology</option>
                  <option value="Hematology & Transfusion">Hematology & Transfusion</option>
                  <option value="Cardio-Oncology">Cardio-Oncology</option>
                  <option value="Surgical Oncology">Surgical Oncology</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Available Days (comma-separated)</label>
                <input
                  type="text"
                  value={newDoctor.available_days}
                  onChange={e => setNewDoctor({ ...newDoctor, available_days: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Time Slots (comma-separated)</label>
                <input
                  type="text"
                  value={newDoctor.available_time_slots}
                  onChange={e => setNewDoctor({ ...newDoctor, available_time_slots: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Save Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
