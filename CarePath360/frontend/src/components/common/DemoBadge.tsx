import React from 'react';

interface DemoBadgeProps {
  text?: string;
  className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ text = 'DEMO DATA', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-600 border border-slate-300 ${className}`}
    >
      {text}
    </span>
  );
};
