import React, { useState } from 'react';
import {
  Search,
  Stethoscope,
  Building2,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  User,
  Star,
  X,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Doctor } from '../../types';
import { DemoBadge } from '../../components/common/DemoBadge';

export const FindDoctorPage: React.FC = () => {
  const { doctors, bookAppointment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    date: new Date().toISOString().split('T')[0],
    time_slot: '04:30 PM',
    consultation_type: 'In-person',
    reason: 'Survivorship consultation & routine follow-up check'
  });

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      specialtyFilter === 'ALL' ||
      doc.specialization.toLowerCase().includes(specialtyFilter.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    bookAppointment({
      doctor_id: selectedDoctor.id,
      doctor_name: selectedDoctor.name,
      hospital_id: selectedDoctor.hospital_id,
      hospital_name: selectedDoctor.hospital_name,
      date: bookingForm.date,
      time_slot: bookingForm.time_slot,
      consultation_type: bookingForm.consultation_type,
      reason: bookingForm.reason
    });

    setSelectedDoctor(null);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const getStatusBadge = (status: Doctor['today_status']) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: '🟢 Available Today',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'AVAILABLE_LATER':
        return {
          label: '🟡 Available Later',
          bg: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 'NOT_AVAILABLE':
      default:
        return {
          label: '🔴 Not Available',
          bg: 'bg-rose-50 text-rose-700 border-rose-200'
        };
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Find My Doctor & Book Care</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time oncologist schedule synchronization, consultation slots, and direct hospital booking.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search doctor, hospital..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none w-full sm:w-60"
            />
          </div>

          <select
            value={specialtyFilter}
            onChange={e => setSpecialtyFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
          >
            <option value="ALL">All Specialties</option>
            <option value="Medical Oncology">Medical Oncology</option>
            <option value="Gastrointestinal">Gastrointestinal Oncology</option>
            <option value="Radiation">Radiation Oncology</option>
            <option value="Hematology">Hematology</option>
            <option value="Cardio-Oncology">Cardio-Oncology</option>
            <option value="Surgical">Surgical Oncology</option>
          </select>
        </div>
      </div>

      {bookingSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Appointment request submitted successfully!</strong> The hospital coordination desk has received your request and will confirm shortly.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Live Synced
          </span>
        </div>
      )}

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => {
          const statusBadge = getStatusBadge(doctor.today_status);
          return (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-teal-400 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{doctor.name}</h3>
                      <p className="text-[11px] text-teal-700 font-medium">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{doctor.hospital_name}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">Today's Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.bg}`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 mt-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Next Available:</span>
                      <strong className="text-teal-900">{doctor.next_available}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Duration:</span>
                      <span className="text-slate-700">{doctor.consultation_duration}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Type:</span>
                      <span className="text-slate-700">{doctor.consultation_types.join(' & ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setBookingForm({
                      ...bookingForm,
                      time_slot: doctor.available_time_slots[0] || '04:30 PM'
                    });
                  }}
                  disabled={doctor.today_status === 'NOT_AVAILABLE'}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center space-x-1.5 ${
                    doctor.today_status === 'NOT_AVAILABLE'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{doctor.today_status === 'NOT_AVAILABLE' ? 'Unavailable' : 'Book Appointment'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Appointment Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Book Consultation</h3>
                <p className="text-[11px] text-teal-700 font-medium">
                  {selectedDoctor.name} • {selectedDoctor.specialization}
                </p>
              </div>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Treating Center</label>
                <input
                  type="text"
                  value={selectedDoctor.hospital_name}
                  disabled
                  className="w-full mt-1 p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Preferred Date *</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Available Slot *</label>
                  <select
                    value={bookingForm.time_slot}
                    onChange={e => setBookingForm({ ...bookingForm, time_slot: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    {selectedDoctor.available_time_slots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Consultation Format</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {selectedDoctor.consultation_types.map(type => (
                    <label
                      key={type}
                      className={`flex items-center space-x-2 p-2 rounded-xl border cursor-pointer ${
                        bookingForm.consultation_type === type
                          ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultType"
                        checked={bookingForm.consultation_type === type}
                        onChange={() => setBookingForm({ ...bookingForm, consultation_type: type })}
                        className="text-teal-600"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Reason for Consultation *</label>
                <textarea
                  rows={3}
                  value={bookingForm.reason}
                  onChange={e => setBookingForm({ ...bookingForm, reason: e.target.value })}
                  placeholder="e.g. Review 6-month blood lab results and discussion on mild neuropathy"
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-sm flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Appointment Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
