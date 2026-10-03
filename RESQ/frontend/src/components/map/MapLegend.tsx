import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="p-3 bg-surface-container-lowest border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 text-on-surface-variant select-none">
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary" /> Critical
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Urgent
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> Stable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-primary-container" /> Ambulance
        </span>
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-primary">local_hospital</span>{' '}
          Hospital
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-2 rounded bg-tertiary-fixed border border-tertiary flex items-center justify-center text-[9px] text-tertiary font-bold">
            ✕
          </span>{' '}
          Blocked Road
        </span>
      </div>
      <div className="flex items-center gap-2 font-code-sm text-code-sm text-outline">
        <span>Projection: WGS84</span>
        <span>·</span>
        <span>Mesh Refresh: 5s</span>
      </div>
    </div>
  );
};
