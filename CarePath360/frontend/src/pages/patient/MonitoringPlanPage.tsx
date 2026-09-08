import React from 'react';
import {
  HeartPulse,
  AlertCircle,
  HelpCircle,
  Info,
  ShieldCheck,
  CheckCircle,
  Clock,
  Heart,
  Activity,
  Smile,
  TestTube
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const MonitoringPlanPage: React.FC = () => {
  const { passport } = useApp();

  const monitoringItems = [
    {
      area: 'Cardiovascular Health',
      icon: Heart,
      why_monitored: 'Previous anthracycline chemotherapy (Doxorubicin) and adjuvant left-sided chest radiation require scheduled echocardiogram monitoring.',
      what_to_discuss: 'Report any sudden shortness of breath, nocturnal cough, unusual chest flutter, or lower leg edema.',
      monitoring_level: 'MODERATE',
      schedule: 'Every 12 months (Echocardiogram)'
    },
    {
      area: 'Bone Mineral Density & Skeletal Health',
      icon: Activity,
      why_monitored: 'Ongoing endocrine therapy (Tamoxifen) and previous therapies can accelerate bone mineral loss or osteopenia.',
      what_to_discuss: 'Review daily calcium + Vitamin D3 supplementation compliance and next scheduled follow-up DXA scan.',
      monitoring_level: 'LOW',
      schedule: 'Every 2 years (DXA Scan)'
    },
    {
      area: 'Peripheral Nerve Health (Neuropathy)',
      icon: Activity,
      why_monitored: 'Taxane therapy (Paclitaxel) is associated with residual sensory peripheral neuropathy in extremities.',
      what_to_discuss: 'Report any functional impairment with fine motor tasks (e.g., buttoning clothes, handling keys) or tingling in toes.',
      monitoring_level: 'LOW',
      schedule: 'Review at each oncology visit'
    },
    {
      area: 'Routine Blood Counts & Hepatic Function',
      icon: TestTube,
      why_monitored: 'Routine surveillance during active endocrine therapy to monitor bone marrow recovery and liver metabolic enzymes.',
      what_to_discuss: 'Review comprehensive metabolic panel and complete blood count (CBC) results at upcoming visit.',
      monitoring_level: 'MODERATE',
      schedule: 'Every 6 months'
    },
    {
      area: 'Emotional & Psychological Wellbeing',
      icon: Smile,
      why_monitored: 'Post-treatment transition, fear of recurrence, and cancer-related fatigue are very common survivorship experiences.',
      what_to_discuss: 'Discuss sleep patterns, mood fluctuations, and explore hospital cancer survivor counseling groups.',
      monitoring_level: 'LOW',
      schedule: 'Continuous routine self-check'
    }
  ];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'HIGH':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          label: 'HIGH — Contact Care Team Soon'
        };
      case 'MODERATE':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: 'MODERATE — Discuss Next Visit'
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'LOW — Routine Monitoring'
        };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black text-slate-900">Personalized Follow-Up Monitoring Plan</h1>
          <DemoBadge />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Tailored survivorship guidance generated based on your cancer history ({passport.cancer_type}) and prior therapies ({passport.treatment_history}).
        </p>

        {/* Prominent Mandatory Safety Disclaimer */}
        <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-2.5 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Clinical Safety Disclaimer:</strong> Monitoring guidance is strictly informational and designed to support care coordination. It does <strong>not</strong> constitute medical diagnosis or treatment advice.
          </div>
        </div>
      </div>

      {/* Monitoring Areas Cards */}
      <div className="space-y-4">
        {monitoringItems.map((item, idx) => {
          const badge = getLevelBadge(item.monitoring_level);
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.area}</h3>
                    <span className="text-[11px] text-slate-400">Target frequency: {item.schedule}</span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                >
                  <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
                  <span>{badge.label}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                {/* Why it is monitored */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800 flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider">
                    <Info className="w-3.5 h-3.5 text-teal-600" />
                    <span>Why This Is Monitored</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.why_monitored}</p>
                </div>

                {/* What to discuss with doctor */}
                <div className="bg-teal-50/50 p-3.5 rounded-xl border border-teal-100">
                  <div className="font-bold text-teal-900 flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                    <span>What to Discuss with Doctor</span>
                  </div>
                  <p className="text-teal-800 leading-relaxed">{item.what_to_discuss}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
