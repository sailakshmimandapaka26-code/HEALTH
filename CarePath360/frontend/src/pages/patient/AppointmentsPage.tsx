import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Video,
  MapPin,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppointmentStatus } from '../../types';
import { DemoBadge } from '../../components/common/DemoBadge';

export const AppointmentsPage: React.FC = () => {
  const { appointments, currentUser } = useApp();

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'ACCEPTED':
        return {
          label: 'Confirmed by Hospital',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2
        };
      case 'PENDING':
        return {
          label: 'Pending Hospital Review',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Clock
        };
      case 'REJECTED':
        return {
          label: 'Rescheduling Requested',
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: AlertCircle
        };
      case 'COMPLETED':
      default:
        return {
          label: 'Consultation Completed',
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: CalendarCheck
        };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">My Care Appointments</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time consultation schedule coordinated with your hospital oncology command desk.
          </p>
        </div>

        <Link
          to="/find-doctor"
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Consultation</span>
        </Link>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map(apt => {
          const badge = getStatusBadge(apt.status);
          const Icon = badge.icon;
          return (
            <div
              key={apt.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-teal-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{apt.doctor_name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.hospital_name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                    Scheduled Date & Time
                  </span>
                  <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{apt.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{apt.time_slot}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                    Format & Setting
                  </span>
                  <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                    {apt.consultation_type === 'Teleconsultation' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Secure Telehealth Video</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>In-Person Clinical Visit</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                    Tracking ID
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">{apt.id}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-800">Reason for Consultation: </strong>
                {apt.reason}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
