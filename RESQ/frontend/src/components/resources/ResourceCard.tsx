import React from 'react';

interface ResourceCardProps {
  title: string;
  total: number;
  deployed: number;
  unit: string;
  icon: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  total,
  deployed,
  unit,
  icon,
}) => {
  const available = Math.max(0, total - deployed);
  const pct = Math.min(100, Math.round((deployed / total) * 100));

  return (
    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
          {title}
        </span>
        <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display-lg text-display-lg font-bold text-on-surface">
          {available}
        </span>
        <span className="text-outline font-body-sm">
          / {total} {unit}
        </span>
      </div>

      <div className="mt-2 space-y-1">
        <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-primary-container rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-[11px] text-outline pt-0.5">
          <span>Deployed: {deployed}</span>
          <span>{pct}% deployed</span>
        </div>
      </div>
    </div>
  );
};
