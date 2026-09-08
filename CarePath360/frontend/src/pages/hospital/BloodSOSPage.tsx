import React, { useState } from 'react';
import {
  Droplet,
  MapPin,
  Clock,
  ShieldAlert,
  Play,
  Maximize2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BloodMap } from '../../components/maps/BloodMap';
import { DemoBadge } from '../../components/common/DemoBadge';

export const BloodSOSPage: React.FC = () => {
  const {
    activeBloodRequest,
    expandRadius,
    donors,
    recordDonorResponse,
    runHackathonDemoSimulation
  } = useApp();

  const [simulating, setSimulating] = useState(false);

  const unitsNeeded = Math.max(0, activeBloodRequest.units_required - activeBloodRequest.units_confirmed);
  const isFulfilled = activeBloodRequest.units_confirmed >= activeBloodRequest.units_required;

  // Filter donors within current search radius
  const visibleDonors = donors.filter(
    d => d.distance_km && d.distance_km <= activeBloodRequest.radius_km
  );

  const handleSimulateClick = () => {
    setSimulating(true);
    runHackathonDemoSimulation();
    setTimeout(() => setSimulating(false), 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
              <span className="text-rose-600">BloodSOS</span>
              <span>Proximity Coordination Center</span>
            </h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Progressive 1 KM → 3 KM → 5 KM emergency blood candidate coordination for acute oncology and surgical needs.
          </p>
        </div>

        {/* 1-Click Simulation Button */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={handleSimulateClick}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white rounded-xl text-xs font-black transition shadow-md shadow-rose-500/20"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Run Hackathon Emergency Simulation</span>
          </button>
        </div>
      </div>

      {/* Fulfillment Status Banner */}
      {isFulfilled ? (
        <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-7 h-7 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-black tracking-wide uppercase">
                ✅ Emergency Blood Requirement Fulfilled
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                All {activeBloodRequest.units_required} units of {activeBloodRequest.blood_group} confirmed across progressive radius. Further donor alerts halted.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-xl text-xs font-bold self-start sm:self-auto">
            {activeBloodRequest.units_confirmed} / {activeBloodRequest.units_required} Units Confirmed
          </span>
        </div>
      ) : (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping"></span>
            <div>
              <h3 className="text-xs font-bold text-rose-900">
                ACTIVE CRITICAL EMERGENCY: {activeBloodRequest.blood_group} Needed ({unitsNeeded} Units Still Required)
              </h3>
              <p className="text-[11px] text-rose-700 mt-0.5">
                Searching registered, opted-in candidates within <strong>{activeBloodRequest.radius_km} KM</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => expandRadius()}
            disabled={activeBloodRequest.radius_km >= 5.0}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center space-x-1.5 ${
              activeBloodRequest.radius_km >= 5.0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>
              Expand Radius ({activeBloodRequest.radius_km === 1.0 ? '1 KM → 3 KM' : '3 KM → 5 KM'})
            </span>
          </button>
        </div>
      )}

      {/* Emergency Metrics & Progressive Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Blood Group</span>
          <div className="text-3xl font-black text-rose-600 mt-1">{activeBloodRequest.blood_group}</div>
          <p className="text-[11px] text-slate-500 mt-1">Urgency: {activeBloodRequest.urgency}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required / Confirmed</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {activeBloodRequest.units_confirmed}{' '}
            <span className="text-base text-slate-400 font-normal">/ {activeBloodRequest.units_required} units</span>
          </div>
          <p className="text-[11px] text-teal-700 mt-1 font-semibold">
            {unitsNeeded === 0 ? 'Fulfillment complete' : `${unitsNeeded} units pending arrival`}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Search Radius</span>
          <div className="text-3xl font-black text-teal-700 mt-1">{activeBloodRequest.radius_km} KM</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Stage {activeBloodRequest.radius_km === 1.0 ? '1 (Immediate)' : activeBloodRequest.radius_km === 3.0 ? '2 (Expanded)' : '3 (Maximum)'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alerted Candidates</span>
          <div className="text-3xl font-black text-indigo-600 mt-1">{visibleDonors.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Registered & opted-in only</p>
        </div>
      </div>

      {/* Main Grid: Leaflet Live Map & Candidate Priority List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leaflet Live Map (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-rose-600" />
              <h2 className="text-sm font-bold text-slate-900">Live Proximity Map & Dispatch Radius</h2>
            </div>
            <span className="text-xs text-slate-500">Center: {activeBloodRequest.hospital_name}</span>
          </div>

          <BloodMap
            hospitalLat={activeBloodRequest.latitude}
            hospitalLng={activeBloodRequest.longitude}
            hospitalName={activeBloodRequest.hospital_name}
            radiusKm={activeBloodRequest.radius_km}
            donors={visibleDonors}
          />

          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
            <span>Radius visualization automatically expands as search radius escalates.</span>
            <span className="font-semibold text-slate-700">OpenStreetMap Coordinates Active</span>
          </div>
        </div>

        {/* Priority Engine Candidate List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">AI Operational Priority Engine</h2>
                <p className="text-[11px] text-slate-500">Ranked by Distance, ETA, and Response Rate</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                Score: 0-99
              </span>
            </div>

            <div className="mt-3 space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {visibleDonors.map(donor => (
                <div
                  key={donor.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{donor.name}</span>
                        <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 font-black rounded text-[10px]">
                          {donor.blood_group}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {donor.distance_km} KM • Est. ETA: <strong className="text-teal-700">{donor.eta_minutes} min</strong>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs border border-indigo-200">
                        {donor.priority_score || 88}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-bold">Priority</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1.5 italic line-clamp-1">
                    "{donor.match_rationale}"
                  </p>

                  {/* Individual Simulation Action Buttons */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold">
                      Status:{' '}
                      <span
                        className={
                          donor.current_response_status === 'ACCEPTED'
                            ? 'text-emerald-600'
                            : donor.current_response_status === 'DECLINED'
                            ? 'text-rose-600'
                            : donor.current_response_status === 'ON_THE_WAY'
                            ? 'text-blue-600'
                            : 'text-amber-600'
                        }
                      >
                        {donor.current_response_status || 'Awaiting'}
                      </span>
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => recordDonorResponse(donor.id, 'ACCEPTED')}
                        disabled={donor.current_response_status === 'ACCEPTED'}
                        className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => recordDonorResponse(donor.id, 'ON_THE_WAY')}
                        className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold transition"
                      >
                        En Route
                      </button>
                      <button
                        onClick={() => recordDonorResponse(donor.id, 'DECLINED')}
                        className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded text-[10px] font-bold transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stage 3 Fallback Network Box */}
          {activeBloodRequest.radius_km >= 3.0 && (
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Regional Fallback Network (Stage 3)</span>
              </div>
              <div className="space-y-1 text-[11px]">
                {activeBloodRequest.fallback_options?.map((fb, i) => (
                  <div key={i} className="flex items-center justify-between text-slate-600">
                    <span>{fb.name} ({fb.distance_km} km)</span>
                    <a href={`tel:${fb.contact}`} className="text-teal-700 font-bold hover:underline">
                      {fb.contact}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Non-Diagnostic Clinical Safety Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Medical Safety & Blood Transfusion Protocol:</strong> BloodSOS is strictly an operational candidate coordination system connecting registered, opted-in donors. It does <strong>not</strong> medically approve donors, perform serological screening, or determine biological transfusion compatibility. Formal blood typing and laboratory cross-matching must be performed by the hospital transfusion center.
        </div>
      </div>
    </div>
  );
};
