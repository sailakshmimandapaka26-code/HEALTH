import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  User,
  Hospital,
  Stethoscope,
  HeartHandshake,
  Droplet,
  ShieldCheck,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const LoginPage: React.FC = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (roleKey: string) => {
    switchRole(roleKey);
    navigate('/');
  };

  const demoAccounts = [
    {
      key: 'patient',
      role: 'PATIENT',
      title: 'Continue as Patient',
      name: 'Sarah Jenkins',
      desc: 'Stage IIA Breast Cancer Survivor • View Health Passport, Monitoring Plan, and Doctor Booking',
      icon: User,
      color: 'border-teal-300 hover:border-teal-500 bg-teal-50/40 hover:bg-teal-50 text-teal-800'
    },
    {
      key: 'hospital',
      role: 'HOSPITAL',
      title: 'Continue as Hospital Command',
      name: 'Metro Cancer Institute',
      desc: 'Manage oncology schedules, approve consultation requests, and coordinate emergency BloodSOS',
      icon: Hospital,
      color: 'border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50 text-blue-800'
    },
    {
      key: 'doctor',
      role: 'DOCTOR',
      title: 'Continue as Doctor',
      name: 'Dr. Priya Sharma, MD',
      desc: 'Medical Oncology Specialist • Toggle availability slots and review survivorship follow-ups',
      icon: Stethoscope,
      color: 'border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50 text-indigo-800'
    },
    {
      key: 'caregiver',
      role: 'CAREGIVER',
      title: 'Continue as Caregiver',
      name: 'Mark Jenkins',
      desc: 'Designated Spouse Caregiver • Permission-gated access to patient schedule and emergency timeline',
      icon: HeartHandshake,
      color: 'border-purple-300 hover:border-purple-500 bg-purple-50/40 hover:bg-purple-50 text-purple-800'
    },
    {
      key: 'donor',
      role: 'DONOR',
      title: 'Continue as Blood Donor',
      name: 'Alex Rivera (B+)',
      desc: 'Registered Proximity Donor (0.35 KM from hospital) • Opted-in for critical emergency alerts',
      icon: Droplet,
      color: 'border-rose-300 hover:border-rose-500 bg-rose-50/40 hover:bg-rose-50 text-rose-800'
    },
    {
      key: 'admin',
      role: 'ADMIN',
      title: 'Continue as Administrator',
      name: 'Operations Supervisor',
      desc: 'Verify hospitals, clinicians, and donors • Inspect system analytics and audit trail',
      icon: ShieldCheck,
      color: 'border-slate-300 hover:border-slate-500 bg-slate-50/40 hover:bg-slate-50 text-slate-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-lg shadow-teal-500/30">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            CarePath 360
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
            "From Cancer Recovery to Emergency Support — One Connected Care Journey."
          </p>
          <div className="flex items-center justify-center space-x-2">
            <DemoBadge text="Hackathon Ready • Instant 1-Click Access" />
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Medical Safety Guardrail:</strong> CarePath 360 is strictly a healthcare care coordination and emergency support platform. It never provides medical diagnoses, predicts disease recurrence, or replaces clinical doctors.
          </div>
        </div>

        {/* Role Cards Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center mb-6">
            Select a Demo Role to Begin
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoAccounts.map(account => {
              const Icon = account.icon;
              return (
                <button
                  key={account.key}
                  onClick={() => handleRoleSelect(account.key)}
                  className={`p-4 rounded-2xl border-2 text-left transition duration-200 flex items-start space-x-3.5 group shadow-sm hover:shadow-md ${account.color}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition">
                        {account.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                    </div>
                    <div className="text-[11px] font-bold mt-0.5 opacity-90">{account.name}</div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{account.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400">
          CarePath 360 Prototype • Built for Healthcare Hackathon Demonstration
        </div>
      </div>
    </div>
  );
};
