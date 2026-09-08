import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Activity,
  Users,
  Building2,
  Stethoscope,
  Droplet,
  CheckCircle2,
  FileCheck,
  History,
  Lock,
  Search
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { INITIAL_AUDIT_LOGS } from '../../services/mockData';
import { DemoBadge } from '../../components/common/DemoBadge';

const MONTHLY_CARE_DATA = [
  { month: 'Oct', survivorship_reviews: 38, blood_coordinations: 12 },
  { month: 'Nov', survivorship_reviews: 45, blood_coordinations: 15 },
  { month: 'Dec', survivorship_reviews: 52, blood_coordinations: 18 },
  { month: 'Jan', survivorship_reviews: 60, blood_coordinations: 22 },
  { month: 'Feb', survivorship_reviews: 74, blood_coordinations: 26 },
  { month: 'Mar', survivorship_reviews: 85, blood_coordinations: 31 }
];

export const AdminDashboard: React.FC = () => {
  const { doctors, donors, activeBloodRequest } = useApp();
  const [auditLogs] = useState(INITIAL_AUDIT_LOGS);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Admin Operations & Analytics Command</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            System health monitoring, hospital/doctor verification, audit logging, and coordination metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold text-xs flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All Services Operational</span>
          </span>
        </div>
      </div>

      {/* Analytics KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered Survivors</span>
          <div className="text-2xl font-black text-slate-900 mt-1">4 Patients</div>
          <p className="text-[11px] text-teal-700 mt-0.5">14 Active follow-up tracks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Oncologists</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{doctors.length} Doctors</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Across 3 cancer facilities</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Opted-In Blood Donors</span>
          <div className="text-2xl font-black text-rose-600 mt-1">{donors.length} Donors</div>
          <p className="text-[11px] text-slate-500 mt-0.5">94.2% Emergency response rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg. Dispatch ETA</span>
          <div className="text-2xl font-black text-indigo-600 mt-1">6.8 mins</div>
          <p className="text-[11px] text-indigo-700 mt-0.5">Within 1-3 KM radius</p>
        </div>
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Longitudinal Care Activity Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Survivorship & BloodSOS Monthly Trend</h2>
              <p className="text-[11px] text-slate-500">6-Month volume progression</p>
            </div>
            <DemoBadge />
          </div>

          <div className="h-64 mt-4 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_CARE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="survivorship_reviews" name="Survivorship Reviews" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="blood_coordinations" name="BloodSOS Coordinations" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Queue Table */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Hospital & Clinician Verification Queue</h2>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Verified
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Metro Cancer Institute & Medical Center</div>
                  <div className="text-[10px] text-slate-500">Transfusion Unit License: #TX-990218</div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px] flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Dr. Priya Sharma, MD</div>
                  <div className="text-[10px] text-slate-500">Medical Oncology Board Certification #88392</div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px] flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">St. Jude Comprehensive Oncology Hospital</div>
                  <div className="text-[10px] text-slate-500">Bone Marrow & Cell Therapy Hub #BM-44910</div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px] flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Audit timestamped on immutable ledger.</span>
            <span className="font-bold text-slate-700">Zero Security Breaches</span>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">Security & Operational Audit Logs</h2>
          </div>
          <span className="text-xs text-slate-400">Chronological Event Trail</span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Timestamp</th>
                <th className="px-4 py-2.5">Actor</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5">Action</th>
                <th className="px-4 py-2.5">Target</th>
                <th className="px-4 py-2.5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 text-slate-500">{log.timestamp}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 font-sans">{log.actor_name}</td>
                  <td className="px-4 py-3">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-sans text-[10px] font-bold">
                      {log.actor_role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-teal-800 font-bold">{log.action}</td>
                  <td className="px-4 py-3 text-slate-700 font-sans">{log.target}</td>
                  <td className="px-4 py-3 text-slate-500 font-sans text-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
