import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const AllocationStatusChip: React.FC = () => {
  const { simulation } = useAppStore();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
      </span>
      <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
        Optimizer: {simulation.optimizerStatus}
      </span>
    </div>
  );
};
