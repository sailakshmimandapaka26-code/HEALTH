import React, { useState } from 'react';
import {
  FileText,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Calendar,
  ShieldCheck,
  Building2,
  User,
  Phone,
  Save,
  X,
  Pill,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const HealthPassportPage: React.FC = () => {
  const { passport, updatePassport } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...passport });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassport(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Cancer Health Passport</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Personalized longitudinal oncology recovery profile & official health summary.
          </p>
          <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-500">
            <span>Last Updated: <strong className="text-slate-700">{passport.last_updated}</strong></span>
            <span>•</span>
            <span className="text-teal-700 font-medium">Verified by Treating Hospital</span>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({ ...passport });
            setIsEditing(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm self-start md:self-auto"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Passport Details</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Health passport updated successfully! Changes saved to your care record.</span>
        </div>
      )}

      {/* Patient Core Summary Card */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-700/50">
          <div>
            <div className="text-xs uppercase tracking-wider text-teal-300 font-bold">Cancer Survivorship Record</div>
            <h2 className="text-2xl font-black mt-1">{passport.patient_name}</h2>
            <div className="text-xs text-teal-100 mt-0.5">
              {passport.age} yrs • {passport.gender} • Diagnosed: {passport.diagnosis_date}
            </div>
          </div>
          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 bg-teal-600/60 border border-teal-400/40 rounded-full text-xs font-bold">
              {passport.cancer_stage}
            </span>
            <div className="text-xs text-teal-200 mt-1">{passport.cancer_type}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
          <div>
            <span className="text-teal-300 font-medium">Treating Hospital:</span>
            <div className="font-bold text-white mt-0.5">{passport.treating_hospital}</div>
          </div>
          <div>
            <span className="text-teal-300 font-medium">Treating Oncologist:</span>
            <div className="font-bold text-white mt-0.5">{passport.treating_oncologist}</div>
          </div>
          <div>
            <span className="text-teal-300 font-medium">Emergency Contact:</span>
            <div className="font-bold text-white mt-0.5">
              {passport.emergency_contact} ({passport.emergency_phone})
            </div>
          </div>
        </div>
      </div>

      {/* Structured Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Treatment Regimens */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Activity className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">Treatment Regimens & Therapies</h3>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Chemotherapy Regimen</label>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {passport.chemotherapy_details}
            </p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Radiation Therapy</label>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {passport.radiation_therapy_details}
            </p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Surgical History</label>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {passport.surgery_history}
            </p>
          </div>
        </div>

        {/* Medications & Allergies */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Pill className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Current Medications & Safety Notes</h3>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Medications</label>
            <div className="mt-1 space-y-1.5">
              {passport.current_medications.map((med, idx) => (
                <div key={idx} className="text-xs p-2 rounded-lg bg-indigo-50/50 border border-indigo-100 text-indigo-900 font-medium">
                  💊 {med}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Allergies</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {passport.allergies.map((alg, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-bold">
                  ⚠️ {alg}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Other Conditions & Complications</label>
            <div className="text-xs text-slate-700 mt-1 space-y-1">
              {passport.other_medical_conditions.map((c, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>{c}</span>
                </div>
              ))}
              {passport.previous_complications.map((comp, i) => (
                <div key={i} className="flex items-center space-x-2 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Footer */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold">Medical Safety & Data Verification Note:</div>
          <div className="mt-0.5 leading-relaxed">
            {passport.disclaimer} Always verify treatment protocols and prescription changes directly with your treating oncologist and medical team.
          </div>
        </div>
      </div>

      {/* Edit Passport Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Health Passport Information</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700">Patient Name</label>
                  <input
                    type="text"
                    value={formData.patient_name}
                    onChange={e => setFormData({ ...formData, patient_name: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Cancer Type</label>
                  <input
                    type="text"
                    value={formData.cancer_type}
                    onChange={e => setFormData({ ...formData, cancer_type: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700">Cancer Stage</label>
                  <input
                    type="text"
                    value={formData.cancer_stage}
                    onChange={e => setFormData({ ...formData, cancer_stage: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Treating Oncologist</label>
                  <input
                    type="text"
                    value={formData.treating_oncologist}
                    onChange={e => setFormData({ ...formData, treating_oncologist: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Chemotherapy Regimen</label>
                <textarea
                  rows={2}
                  value={formData.chemotherapy_details}
                  onChange={e => setFormData({ ...formData, chemotherapy_details: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Radiation Therapy</label>
                <textarea
                  rows={2}
                  value={formData.radiation_therapy_details}
                  onChange={e => setFormData({ ...formData, radiation_therapy_details: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Emergency Contact</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                  <input
                    type="text"
                    value={formData.emergency_contact}
                    onChange={e => setFormData({ ...formData, emergency_contact: e.target.value })}
                    placeholder="Contact Name"
                    className="p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={formData.emergency_phone}
                    onChange={e => setFormData({ ...formData, emergency_phone: e.target.value })}
                    placeholder="Phone Number"
                    className="p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-sm flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
