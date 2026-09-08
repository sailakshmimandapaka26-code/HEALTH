import React from 'react';
import {
  Shield,
  Lock,
  EyeOff,
  Stethoscope,
  Database,
  FileCheck2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { DemoBadge } from '../../components/common/DemoBadge';

export const PrivacySafetyPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black text-slate-900">Privacy, Security & Medical Safety Policy</h1>
          <DemoBadge />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Ethical healthcare architecture, strict non-diagnostic clinical boundaries, and data sovereignty guarantees.
        </p>
      </div>

      {/* Safety Guardrails Grid */}
      <div className="space-y-4">
        {/* Core Medical Safety Rule */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Strict Non-Diagnostic Clinical Boundary</h2>
              <p className="text-[11px] text-slate-500">CarePath 360 is a coordination and decision-support platform.</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-700 leading-relaxed">
            <p>
              Under no circumstances does CarePath 360 diagnose diseases, predict cancer recurrence, prescribe drugs, modify medication dosages, or replace qualified oncologists.
            </p>
            <p>
              AI-assisted features are restricted strictly to organizing information, synthesizing timelines, proposing discussion topics for doctor appointments, and prioritizing logistical coordination.
            </p>
          </div>
        </div>

        {/* Patient Data Sovereignty & Caregiver Permissions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Patient-Controlled Caregiver Access</h2>
              <p className="text-[11px] text-slate-500">Full medical history shielded unless explicitly authorized.</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-700 leading-relaxed">
            <p>
              Patients maintain absolute granular sovereignty over what caregivers can see. By default, medical records and sensitive pathology notes are shielded.
            </p>
            <p>
              Patients can toggle individual permissions for Appointments, Reports, Health Timeline, and Notifications at any time from their Caregiver Access settings.
            </p>
          </div>
        </div>

        {/* Donor Privacy & No Continuous Tracking */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">No Continuous GPS Location Tracking</h2>
              <p className="text-[11px] text-slate-500">Opt-in proximity matching without persistent surveillance.</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-700 leading-relaxed">
            <p>
              CarePath 360 does not run continuous background location tracking on donors. BloodSOS matches registered base coordinates only when an active emergency blood request is broadcast.
            </p>
            <p>
              No personal medical history of patients is ever revealed to blood donors, and donors only receive facility emergency destination information upon accepting.
            </p>
          </div>
        </div>

        {/* Synthetic Demonstration Notice */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Synthetic Demonstration Data Notice</h2>
              <p className="text-[11px] text-slate-500">Hackathon demonstration prototype environment.</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-700 leading-relaxed">
            <p>
              All patient identities, diagnostic reports, physician credentials, and donor records within this demo application are completely synthetic. No real patient health information (PHI) or live hospital database integrations are utilized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
