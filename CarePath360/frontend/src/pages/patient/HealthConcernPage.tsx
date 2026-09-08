import React, { useState } from 'react';
import {
  AlertCircle,
  Send,
  ShieldAlert,
  Clock,
  Calendar,
  Pill,
  CheckCircle2,
  AlertTriangle,
  FileText,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HealthConcern } from '../../types';
import { DemoBadge } from '../../components/common/DemoBadge';

export const HealthConcernPage: React.FC = () => {
  const { passport, concerns, submitHealthConcern } = useApp();

  const [form, setForm] = useState({
    symptom: '',
    severity: 'Mild' as 'Mild' | 'Moderate' | 'Severe',
    duration: '1-2 days',
    description: '',
    current_medications: passport.current_medications.join(', ')
  });

  const [latestResult, setLatestResult] = useState<HealthConcern | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symptom.trim()) return;

    const result = submitHealthConcern({
      symptom: form.symptom,
      severity: form.severity,
      duration: form.duration,
      description: form.description,
      current_medications: form.current_medications
    });

    setLatestResult(result);
    setForm({
      symptom: '',
      severity: 'Mild',
      duration: '1-2 days',
      description: '',
      current_medications: passport.current_medications.join(', ')
    });
  };

  const getTriageDisplay = (category: string) => {
    switch (category) {
      case 'RED':
        return {
          title: 'RED: Seek Urgent Medical Attention',
          bg: 'bg-rose-50 border-rose-300 text-rose-900',
          badge: 'bg-rose-600 text-white',
          alertNotice:
            'If this may be an emergency, contact local emergency services (911/112) or seek urgent medical care immediately.'
        };
      case 'YELLOW':
        return {
          title: 'YELLOW: Contact Treating Doctor Soon',
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badge: 'bg-amber-500 text-white',
          alertNotice:
            'Contact your treating oncologist or clinical care coordinator within the next 24 to 48 hours.'
        };
      case 'GREEN':
      default:
        return {
          title: 'GREEN: Routine Follow-Up',
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          alertNotice:
            'Document any changes and discuss during your next scheduled survivorship consultation.'
        };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black text-slate-900">Report a New Health Concern</h1>
          <DemoBadge />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Organize new symptoms and receive structured coordination guidance on when to contact your oncology care team.
        </p>

        <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Important Safety Notice:</strong> This is a coordination and decision-support feature only. It does <strong>not</strong> diagnose illnesses, predict disease recurrence, or prescribe medications.
          </div>
        </div>
      </div>

      {/* Triage Guidance Modal / Banner if just submitted */}
      {latestResult && (
        <div className={`rounded-2xl p-6 border shadow-sm ${getTriageDisplay(latestResult.triage_category).bg}`}>
          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${getTriageDisplay(latestResult.triage_category).badge}`}>
                {latestResult.triage_category}
              </span>
              <h2 className="text-sm font-bold">{getTriageDisplay(latestResult.triage_category).title}</h2>
            </div>
            <span className="text-xs font-semibold opacity-70">Concern ID: {latestResult.id}</span>
          </div>

          <p className="mt-3 text-xs leading-relaxed font-medium">
            {latestResult.triage_guidance}
          </p>

          <div className="mt-4 p-3 bg-white/80 rounded-xl border border-black/10 text-xs font-semibold flex items-center justify-between">
            <span>{getTriageDisplay(latestResult.triage_category).alertNotice}</span>
            {latestResult.triage_category === 'RED' && (
              <a
                href="tel:911"
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency (911)</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Symptom Reporting Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 mb-4">
          Symptom & Observation Intake
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700">Specific Symptom or Concern *</label>
            <input
              type="text"
              placeholder="e.g. Persistent localized swelling in left leg, mild fever, numbness"
              value={form.symptom}
              onChange={e => setForm({ ...form, symptom: e.target.value })}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700">Reported Severity *</label>
              <select
                value={form.severity}
                onChange={e => setForm({ ...form, severity: e.target.value as any })}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
              >
                <option value="Mild">Mild (Noticeable but does not restrict daily routine)</option>
                <option value="Moderate">Moderate (Interferes with some daily activities)</option>
                <option value="Severe">Severe (Significant discomfort or disabling)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700">Duration *</label>
              <input
                type="text"
                placeholder="e.g. 2 days, since yesterday afternoon"
                value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700">Detailed Description</label>
            <textarea
              rows={3}
              placeholder="Describe how the symptom feels, what triggers it, or whether it changes with activity..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700">Current Medications at Time of Symptom</label>
            <input
              type="text"
              value={form.current_medications}
              onChange={e => setForm({ ...form, current_medications: e.target.value })}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Entry will be automatically logged to your Emergency Health Timeline.
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-sm flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit for Coordination</span>
            </button>
          </div>
        </form>
      </div>

      {/* Previously Logged Concerns */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 mb-4">
          Logged Concerns History
        </h2>

        {concerns.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            No previously logged health concerns. Your health record is currently in routine surveillance.
          </p>
        ) : (
          <div className="space-y-3">
            {concerns.map(c => (
              <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.triage_category === 'RED'
                          ? 'bg-rose-100 text-rose-800'
                          : c.triage_category === 'YELLOW'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {c.triage_category}
                    </span>
                    <strong className="text-xs text-slate-900">{c.symptom}</strong>
                  </div>
                  <span className="text-[11px] text-slate-400">{c.start_date}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{c.description || 'No description provided.'}</p>
                <div className="mt-2 text-[11px] text-teal-800 bg-white p-2 rounded-lg border border-slate-200">
                  <strong>Guidance:</strong> {c.triage_guidance}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
