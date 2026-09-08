import React, { useState } from 'react';
import {
  Milestone,
  PlusCircle,
  Calendar,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const CancerJourneyPage: React.FC = () => {
  const { timeline, addTimelineEvent } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    event_type: 'Follow-up',
    date: new Date().toISOString().split('T')[0],
    description: '',
    hospital_doctor: 'Metro Cancer Institute & Medical Center',
    attached_report: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTimelineEvent({
      patient_id: 'pat-1',
      ...newEvent,
      attached_report: newEvent.attached_report || null
    });
    setShowAddModal(false);
    setNewEvent({
      title: '',
      event_type: 'Follow-up',
      date: new Date().toISOString().split('T')[0],
      description: '',
      hospital_doctor: 'Metro Cancer Institute & Medical Center',
      attached_report: ''
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'diagnosis':
        return 'bg-amber-500 text-white';
      case 'treatment':
      case 'chemotherapy':
        return 'bg-purple-600 text-white';
      case 'radiation':
        return 'bg-indigo-600 text-white';
      case 'surgery':
        return 'bg-rose-600 text-white';
      case 'recovery':
        return 'bg-emerald-600 text-white';
      case 'follow-up':
        return 'bg-teal-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Longitudinal Cancer Journey</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual milestone chronology connecting initial diagnosis, multi-modality treatment, and active survivorship.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Journey Milestone</span>
        </button>
      </div>

      {/* Visual Timeline Stepper Overview Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center min-w-[650px] justify-between text-center px-4">
          {[
            'Diagnosis',
            'Evaluation',
            'Chemo',
            'Surgery',
            'Radiation',
            'Recovery',
            'Follow-up'
          ].map((stage, idx) => (
            <React.Fragment key={stage}>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {idx + 1}
                </div>
                <span className="text-[11px] font-semibold text-slate-700 mt-1">{stage}</span>
              </div>
              {idx < 6 && <div className="flex-1 h-0.5 bg-teal-200 mx-2"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Timeline Event Cards */}
      <div className="relative border-l-2 border-teal-300 ml-4 md:ml-8 space-y-6 py-2">
        {timeline.map((event, index) => (
          <div key={event.id} className="relative pl-6 md:pl-8 group">
            {/* Timeline node icon */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
            </div>

            {/* Event Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${getEventTypeColor(event.event_type)}`}>
                    {event.event_type}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{event.title}</h3>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <Building2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>{event.hospital_doctor}</span>
                </div>

                {event.attached_report && (
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-teal-600" />
                    <span>Report: {event.attached_report}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Add Cancer Journey Milestone</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Milestone Title</label>
                <input
                  type="text"
                  placeholder="e.g. 6-Month Surveillance Mammogram"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Event Type</label>
                  <select
                    value={newEvent.event_type}
                    onChange={e => setNewEvent({ ...newEvent, event_type: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    <option value="Follow-up">Follow-up</option>
                    <option value="Diagnosis">Diagnosis</option>
                    <option value="Chemotherapy">Chemotherapy</option>
                    <option value="Radiation">Radiation</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Recovery">Recovery</option>
                    <option value="Current Status">Current Status</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Clinical Description</label>
                <textarea
                  rows={3}
                  placeholder="Key findings, procedure summary, or doctor observations..."
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Hospital / Clinician</label>
                <input
                  type="text"
                  value={newEvent.hospital_doctor}
                  onChange={e => setNewEvent({ ...newEvent, hospital_doctor: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Attached Report Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Lab_Results_March2025.pdf"
                  value={newEvent.attached_report}
                  onChange={e => setNewEvent({ ...newEvent, attached_report: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
