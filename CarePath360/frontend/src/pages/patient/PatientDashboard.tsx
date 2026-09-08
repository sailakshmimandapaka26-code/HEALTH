import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  HeartPulse,
  Milestone,
  FileText,
  AlertCircle,
  Stethoscope,
  Droplet,
  Users,
  ChevronRight,
  ShieldCheck,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AICareAssistantCard } from '../../components/ai/AICareAssistantCard';
import { DemoBadge } from '../../components/common/DemoBadge';

export const PatientDashboard: React.FC = () => {
  const { passport, timeline, appointments, doctors, reports } = useApp();

  const nextAppointment = appointments.find(a => a.status === 'ACCEPTED' || a.status === 'PENDING') || appointments[0];
  const primaryDoctor = doctors.find(d => d.name === passport.treating_oncologist) || doctors[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">
              Welcome, {passport.patient_name}
            </h1>
            <DemoBadge />
          </div>
          <p className="text-slate-600 text-xs mt-1">
            Condition: <strong className="text-slate-800">{passport.cancer_type}</strong> ({passport.cancer_stage}) • Treating Center: {passport.treating_hospital}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/health-concerns"
            className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Report Concern</span>
          </Link>
          <Link
            to="/find-doctor"
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Find Doctor</span>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Follow-up Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Follow-Up Status</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-black text-emerald-700">On Track</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Surveillance phase compliant</p>
          </div>
          <Link
            to="/cancer-journey"
            className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center justify-between pt-2 border-t border-slate-100"
          >
            <span>View Journey</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Next Appointment */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Next Consultation</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2">
            <div className="text-sm font-bold text-slate-900 truncate">{nextAppointment?.doctor_name || 'Dr. Priya Sharma'}</div>
            <div className="text-xs text-slate-600 flex items-center space-x-1 mt-0.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{nextAppointment?.date || 'March 12'} – {nextAppointment?.time_slot || '4:30 PM'}</span>
            </div>
          </div>
          <Link
            to="/appointments"
            className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center justify-between pt-2 border-t border-slate-100"
          >
            <span>Appointment Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Doctor Availability */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Treating Oncologist</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {primaryDoctor?.today_status === 'AVAILABLE' ? '🟢 Available' : '🟡 Available Later'}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-sm font-bold text-slate-900 truncate">{primaryDoctor?.name}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Next slot: {primaryDoctor?.next_available}</p>
          </div>
          <Link
            to="/find-doctor"
            className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center justify-between pt-2 border-t border-slate-100"
          >
            <span>Check Schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Personalized Monitoring */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Monitoring</span>
            <HeartPulse className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2">
            <div className="text-lg font-black text-slate-900">5 Key Areas</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Heart, bone, neuropathy & labs</p>
          </div>
          <Link
            to="/monitoring-plan"
            className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center justify-between pt-2 border-t border-slate-100"
          >
            <span>Review Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* AI Care Coordination Engine Card */}
      <AICareAssistantCard />

      {/* Two Column Layout: Recent Milestones & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Cancer Journey Timeline Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Longitudinal Cancer Journey</h2>
              <p className="text-xs text-slate-500">Continuous timeline from diagnosis through survivorship</p>
            </div>
            <Link
              to="/cancer-journey"
              className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center space-x-1"
            >
              <span>Full Timeline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            {timeline.slice(-3).reverse().map(evt => (
              <div key={evt.id} className="flex items-start space-x-3.5 p-3 rounded-xl hover:bg-slate-50 transition border border-slate-100">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{evt.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{evt.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{evt.description}</p>
                  <div className="mt-1.5 flex items-center space-x-2 text-[10px] text-teal-700 font-medium">
                    <span>{evt.hospital_doctor}</span>
                    {evt.attached_report && (
                      <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                        📄 {evt.attached_report}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Feature Navigation */}
        <div className="space-y-4">
          {/* Health Passport Card */}
          <div className="bg-gradient-to-br from-teal-700 to-emerald-800 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-200">Official Record</span>
              <FileText className="w-5 h-5 text-teal-200" />
            </div>
            <h3 className="text-base font-black mt-2">Cancer Health Passport</h3>
            <p className="text-xs text-teal-100 mt-1">
              Access treatment regimens, surgical notes, pathology, and current medications.
            </p>
            <Link
              to="/passport"
              className="mt-4 inline-flex items-center space-x-1 px-3 py-1.5 bg-white text-teal-900 rounded-xl text-xs font-bold hover:bg-teal-50 transition shadow-sm"
            >
              <span>Open Passport</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* BloodSOS Emergency Card */}
          <div className="bg-gradient-to-br from-rose-600 to-rose-800 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-rose-200">Emergency Support</span>
              <Droplet className="w-5 h-5 text-rose-200" />
            </div>
            <h3 className="text-base font-black mt-2">BloodSOS Coordination</h3>
            <p className="text-xs text-rose-100 mt-1">
              Proximity-based 1 KM → 3 KM → 5 KM emergency blood donor coordination.
            </p>
            <Link
              to="/blood-sos"
              className="mt-4 inline-flex items-center space-x-1 px-3 py-1.5 bg-white text-rose-900 rounded-xl text-xs font-bold hover:bg-rose-50 transition shadow-sm"
            >
              <span>BloodSOS Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
