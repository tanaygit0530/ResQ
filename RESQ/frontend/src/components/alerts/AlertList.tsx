import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { AlertCard } from './AlertCard';

export const AlertList: React.FC = () => {
  const { alerts } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const filtered = alerts.filter((a) => (filter === 'all' ? true : a.severity === filter));

  return (
    <div className="flex flex-col gap-space-md">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container-low max-w-fit">
        {(['all', 'critical', 'warning', 'info'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === tab
                ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab} ({tab === 'all' ? alerts.length : alerts.filter((a) => a.severity === tab).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {filtered.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};
