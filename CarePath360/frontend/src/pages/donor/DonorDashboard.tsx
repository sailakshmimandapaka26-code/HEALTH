import React, { useState } from 'react';
import {
  Droplet,
  Heart,
  Shield,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  History,
  Navigation,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const DonorDashboard: React.FC = () => {
  const { activeBloodRequest, recordDonorResponse } = useApp();
  const [optedIn, setOptedIn] = useState(true);
  const [available, setAvailable] = useState(true);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);

  const handleResponse = (status: 'ACCEPTED' | 'DECLINED' | 'ON_THE_WAY') => {
    recordDonorResponse('dnr-001', status);
    setResponseStatus(status);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">BloodSOS Donor Command Dashboard</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered Emergency Blood Donor Portal • Proximity Coordination & Dispatch
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full font-black text-xs">
            🩸 Registered Group: B+
          </span>
        </div>
      </div>

      {/* Donor Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Availability Toggle */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-900">Operational Availability</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Ready to donate if called</p>
          </div>
          <button
            onClick={() => setAvailable(!available)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
              available ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md transform"></span>
          </button>
        </div>

        {/* Emergency Alert Opt-In Toggle */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-900">Emergency Alert Opt-In</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Receive high-urgency notifications</p>
          </div>
          <button
            onClick={() => setOptedIn(!optedIn)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
              optedIn ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md transform"></span>
          </button>
        </div>

        {/* Historical Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Historical Response Rate</div>
          <div className="text-2xl font-black text-teal-700 mt-1">96% Verified</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Average dispatch time: 5 mins</p>
        </div>
      </div>

      {/* Active Blood Emergency Alert */}
      <div className="bg-white rounded-2xl p-6 border-2 border-rose-300 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Droplet className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-black uppercase rounded">
                  CRITICAL PROXIMITY ALERT
                </span>
                <span className="text-xs font-bold text-slate-400">Within 1 KM Radius</span>
              </div>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Urgent {activeBloodRequest.blood_group} Blood Required at {activeBloodRequest.hospital_name}
              </h2>
            </div>
          </div>

          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-200 self-start sm:self-auto">
            ETA: ~5 min (0.35 KM away)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Facility</span>
            <strong className="text-slate-800">{activeBloodRequest.hospital_name}</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Units Coordinated</span>
            <strong className="text-slate-800">
              {activeBloodRequest.units_confirmed} / {activeBloodRequest.units_required} Confirmed
            </strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Clinical Context</span>
            <strong className="text-slate-800">Acute Surgical Oncology Need</strong>
          </div>
        </div>

        {/* Response Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs">
            {responseStatus ? (
              <span className="font-bold text-emerald-700 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your response recorded: {responseStatus}</span>
              </span>
            ) : (
              <span className="text-slate-500 font-medium">
                Can you report to the blood bank transfusion desk within 30 minutes?
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleResponse('ACCEPTED')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Can Donate (Accept)</span>
            </button>
            <button
              onClick={() => handleResponse('ON_THE_WAY')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center space-x-1.5"
            >
              <Navigation className="w-4 h-4" />
              <span>On The Way</span>
            </button>
            <button
              onClick={() => handleResponse('DECLINED')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>Cannot Donate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Note */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start space-x-3">
        <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Strict Privacy & No-Continuous-Tracking Policy:</strong> CarePath 360 does not track your location continuously. We only use your registered base coordinates when active emergency blood matching is triggered. Your personal data is never shared with patients or commercial third parties.
        </div>
      </div>
    </div>
  );
};
