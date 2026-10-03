import React from 'react';

interface CapacityBarProps {
  available: number;
  total: number;
  label?: string;
  criticalAt?: number;
}

export const CapacityBar: React.FC<CapacityBarProps> = ({
  available,
  total,
  label = 'ICU Beds',
  criticalAt = 2,
}) => {
  const used = Math.max(0, total - available);
  const percentage = Math.min(100, Math.round((used / total) * 100));
  const isCritical = available <= criticalAt;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-body-sm">
        <span className="font-label-md text-on-surface-variant">{label}</span>
        <span className="font-code-sm text-code-sm font-semibold text-on-surface">
          <span className={isCritical ? 'text-tertiary font-bold' : 'text-primary'}>
            {available}
          </span>{' '}
          / {total} Free
        </span>
      </div>
      <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex items-center">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isCritical
              ? 'bg-tertiary-container'
              : percentage > 75
              ? 'bg-amber-500'
              : 'bg-primary-container'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
