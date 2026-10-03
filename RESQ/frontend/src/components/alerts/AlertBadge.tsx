import React from 'react';
import { AlertSeverity } from '../../types';

interface AlertBadgeProps {
  severity: AlertSeverity;
}

export const AlertBadge: React.FC<AlertBadgeProps> = ({ severity }) => {
  switch (severity) {
    case 'critical':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-error-container text-on-error-container uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
          Critical
        </span>
      );
    case 'warning':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-amber-100 text-amber-900 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Warning
        </span>
      );
    case 'info':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-surface-container text-on-surface-variant uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-outline" />
          Info
        </span>
      );
  }
};
