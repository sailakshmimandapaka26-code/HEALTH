import React from 'react';
import { Sparkles, HelpCircle, CheckSquare, CalendarClock, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AICareAssistantCard: React.FC = () => {
  const { passport, timeline, appointments } = useApp();

  const suggestedQuestions = [
    'Are my current energy levels and mild peripheral numbness typical for this stage of recovery?',
    'Given my past anthracycline chemotherapy and chest radiation, should we schedule an updated echocardiogram?',
    'How often should bone mineral density (DXA) scans be conducted while on endocrine therapy?',
    'What localized symptoms or signs should prompt me to contact the clinic between routine appointments?'
  ];

  const followUpTasks = [
    { task: 'Schedule 6-month routine comprehensive metabolic and CBC blood draw', tag: 'High Priority' },
    { task: 'Review daily calcium and Vitamin D3 supplementation with primary care', tag: 'Routine' },
    { task: 'Log any persistent morning joint stiffness or fingertip sensations', tag: 'Informational' }
  ];

  return (
    <div className="bg-gradient-to-br from-teal-50/70 via-white to-slate-50 border border-teal-200/80 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-teal-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Care Coordination Assistant</h3>
            <p className="text-[11px] text-teal-700 font-medium">
              Timeline synthesis & follow-up care organization
            </p>
          </div>
        </div>
        <span className="text-[10px] font-semibold bg-teal-100/70 text-teal-800 px-2.5 py-1 rounded-full">
          Non-Diagnostic Decision Support
        </span>
      </div>

      {/* Synthesis Statement */}
      <div className="mt-3 p-3 bg-white rounded-xl border border-teal-100 text-xs text-slate-700 leading-relaxed">
        <strong className="text-teal-900 font-semibold">Care Journey Synthesis: </strong>
        Your records show <strong>{timeline.length} milestone events</strong> tracked since diagnosis,
        including chemotherapy (AC-T), surgical resection, and chest radiation. Your current phase is active survivorship surveillance.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Suggested Questions to Discuss */}
        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 mb-2">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Questions to Discuss with Your Doctor</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            {suggestedQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Priority Follow-up Actions */}
        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 mb-2">
            <CheckSquare className="w-4 h-4 text-teal-600" />
            <span>Recommended Follow-up Tasks</span>
          </div>
          <div className="space-y-2">
            {followUpTasks.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
              >
                <span className="text-slate-700 pr-2">{t.task}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 flex-shrink-0">
                  {t.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="mt-4 p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-start space-x-2 text-[11px] text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Important Clinical Boundary:</strong> CarePath 360 AI is strictly an informational coordination tool. It does not provide medical diagnoses, predict disease recurrence, or recommend medication alterations. Always consult your oncologist.
        </div>
      </div>
    </div>
  );
};
