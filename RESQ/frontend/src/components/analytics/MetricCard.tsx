import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  deltaText: string;
  isPositive: boolean;
  baseline: string;
  details: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  deltaText,
  isPositive,
  baseline,
  details,
}) => {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
      <div>
        <span className="font-label-sm text-outline uppercase font-semibold block">{title}</span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-display-lg text-display-lg font-bold text-on-surface">{value}</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
              isPositive
                ? 'bg-emerald-100 text-emerald-900'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            {deltaText}
          </span>
        </div>
        <span className="text-body-sm text-outline mt-1 block">Baseline: {baseline}</span>
      </div>
      <p className="text-body-sm text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/20">
        {details}
      </p>
    </div>
  );
};
