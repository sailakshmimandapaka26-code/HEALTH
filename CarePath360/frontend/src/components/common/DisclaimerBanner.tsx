import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center space-x-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong className="font-semibold">Medical Safety Notice:</strong> CarePath 360 is a care coordination platform and <strong>not</strong> a diagnostic system. It does not provide medical diagnoses, prescribe treatments, or replace a doctor.
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="bg-amber-200 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
          DEMO DATA — NOT REAL PATIENT INFORMATION
        </span>
      </div>
    </div>
  );
};
