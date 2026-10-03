import React from 'react';
import { TriageSeverity } from '../../types';

interface SeverityBadgeProps {
  severity: TriageSeverity;
  size?: 'sm' | 'md';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, size = 'md' }) => {
  switch (severity) {
    case 'Critical':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold uppercase tracking-wider rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant ${
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 font-label-sm text-label-sm'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
          Critical
        </span>
      );
    case 'Urgent':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 ${
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 font-label-sm text-label-sm'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
          Urgent
        </span>
      );
    case 'Delayed':
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-900 ${
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 font-label-sm text-label-sm'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          Delayed
        </span>
      );
    case 'Expectant':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium uppercase tracking-wider rounded-full bg-surface-container-high text-on-surface-variant ${
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 font-label-sm text-label-sm'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-outline" />
          Expectant
        </span>
      );
  }
};
