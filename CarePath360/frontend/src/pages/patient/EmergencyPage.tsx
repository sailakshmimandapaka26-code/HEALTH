import React, { useState } from 'react';
import {
  PhoneCall,
  ShieldAlert,
  Clock,
  User,
  PlusCircle,
  Building2,
  Stethoscope,
  HeartHandshake,
  AlertTriangle,
  Globe,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const EmergencyPage: React.FC = () => {
  const { passport, emergencyTimeline, addEmergencyTimelineEntry } = useApp();
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [showLogModal, setShowLogModal] = useState(false);
  const [newLog, setNewLog] = useState({
    what_changed: '',
    who_reported: 'Sarah Jenkins (Patient)',
    severity: 'MODERATE'
  });

  const emergencyNumbers: Record<string, { service: string; number: string; label: string }> = {
    US: { service: '911', number: 'tel:911', label: 'United States (911)' },
    EU: { service: '112', number: 'tel:112', label: 'European Union / Global (112)' },
    IN: { service: '112', number: 'tel:112', label: 'India Emergency (112 / 102)' },
    UK: { service: '999', number: 'tel:999', label: 'United Kingdom (999)' }
  };

  const currentEmergency = emergencyNumbers[selectedRegion] || emergencyNumbers.US;

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.what_changed.trim()) return;

    addEmergencyTimelineEntry({
      what_changed: newLog.what_changed,
      who_reported: newLog.who_reported,
      severity: newLog.severity
    });

    setShowLogModal(false);
    setNewLog({
      what_changed: '',
      who_reported: 'Sarah Jenkins (Patient)',
      severity: 'MODERATE'
    });
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'RED':
      case 'URGENT_ACTION':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'YELLOW':
      case 'MODERATE':
      case 'MODERATE_HIGH':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'STATUS_UPDATE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Emergency Support & Health Timeline</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Immediate rapid-dial access to verified care providers and longitudinal symptom evolution timeline.
          </p>
        </div>

        {/* Region selector for configurable emergency numbers */}
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-slate-400" />
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-semibold text-slate-700"
          >
            <option value="US">🇺🇸 Region: USA (911)</option>
            <option value="EU">🇪🇺 Region: Europe / Global (112)</option>
            <option value="IN">🇮🇳 Region: India (112 / 102)</option>
            <option value="UK">🇬🇧 Region: UK (999)</option>
          </select>
        </div>
      </div>

      {/* Emergency Quick Dial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Local Emergency Services */}
        <div className="bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-200">
              National Emergency
            </span>
            <div className="text-xl font-black mt-1">{currentEmergency.service} Dispatch</div>
            <p className="text-[11px] text-rose-100 mt-1">Ambulance, trauma & emergency rescue</p>
          </div>
          <a
            href={currentEmergency.number}
            className="mt-4 w-full py-2 bg-white text-rose-700 hover:bg-rose-50 rounded-xl font-bold text-xs text-center transition shadow-sm flex items-center justify-center space-x-1.5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {currentEmergency.service} Now</span>
          </a>
        </div>

        {/* Treating Hospital */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Treating Oncology Center
            </span>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">{passport.treating_hospital}</div>
            <p className="text-[11px] text-slate-500 mt-1">24/7 Oncology Triage & Rapid Response</p>
          </div>
          <a
            href="tel:+15550192830"
            className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs text-center transition shadow-sm flex items-center justify-center space-x-1.5"
          >
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Call Hospital (+1 555)</span>
          </a>
        </div>

        {/* Treating Oncologist */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Treating Oncologist
            </span>
            <div className="text-sm font-bold text-slate-900 mt-1">{passport.treating_oncologist}</div>
            <p className="text-[11px] text-slate-500 mt-1">Clinic coordinator & nurse navigator</p>
          </div>
          <a
            href="tel:+15550192831"
            className="mt-4 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs text-center transition shadow-sm flex items-center justify-center space-x-1.5"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Call Clinic Desk</span>
          </a>
        </div>

        {/* Designated Caregiver */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Primary Caregiver
            </span>
            <div className="text-sm font-bold text-slate-900 mt-1">{passport.emergency_contact}</div>
            <p className="text-[11px] text-slate-500 mt-1">{passport.emergency_phone}</p>
          </div>
          <a
            href={`tel:${passport.emergency_phone.replace(/[^0-9+]/g, '')}`}
            className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs text-center transition shadow-sm flex items-center justify-center space-x-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Call Caregiver</span>
          </a>
        </div>
      </div>

      {/* Emergency Health Timeline Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Emergency Health Timeline</h2>
            <p className="text-xs text-slate-500">
              Chronological log answering <strong>WHAT CHANGED</strong>, <strong>WHEN IT CHANGED</strong>, and <strong>WHO REPORTED IT</strong>.
            </p>
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Condition Update</span>
          </button>
        </div>

        {/* Timeline Log Table */}
        <div className="mt-4 space-y-3">
          {emergencyTimeline.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">{item.timestamp}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getSeverityBadge(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 font-medium">{item.what_changed}</p>
                </div>
              </div>

              <div className="sm:text-right text-xs text-slate-500 flex items-center space-x-1.5 sm:block">
                <span className="text-[11px] text-slate-400 block">Reported By:</span>
                <span className="font-semibold text-slate-800">{item.who_reported}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Condition Update Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Record Condition Change</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">What Changed? *</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Swelling increased in left foot; pain elevated from 3 to 6."
                  value={newLog.what_changed}
                  onChange={e => setNewLog({ ...newLog, what_changed: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Who Is Reporting This? *</label>
                <select
                  value={newLog.who_reported}
                  onChange={e => setNewLog({ ...newLog, who_reported: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="Sarah Jenkins (Patient)">Sarah Jenkins (Patient)</option>
                  <option value="Mark Jenkins (Caregiver)">Mark Jenkins (Caregiver)</option>
                  <option value="Nurse Triage Officer">Nurse Triage Officer</option>
                  <option value="Treating Oncologist">Treating Oncologist</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Observation Level</label>
                <select
                  value={newLog.severity}
                  onChange={e => setNewLog({ ...newLog, severity: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="NORMAL">NORMAL — Routine stable observation</option>
                  <option value="MODERATE">MODERATE — Noticeable symptom increase</option>
                  <option value="URGENT_ACTION">URGENT_ACTION — Requires prompt medical evaluation</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Save to Timeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
