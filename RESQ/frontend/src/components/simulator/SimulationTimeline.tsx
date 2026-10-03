import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const SimulationTimeline: React.FC = () => {
  const { simulationTimeline } = useAppStore();

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
          Simulation Event Log
        </span>
        <span className="text-outline text-xs">{simulationTimeline.length} logged events</span>
      </div>

      <div className="space-y-3">
        {simulationTimeline.map((evt) => (
          <div
            key={evt.id}
            className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3 border border-outline-variant/20"
          >
            <span
              className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 ${
                evt.severity === 'critical'
                  ? 'bg-error-container text-tertiary'
                  : evt.severity === 'warning'
                  ? 'bg-amber-100 text-amber-900'
                  : evt.severity === 'success'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-surface-container text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {evt.severity === 'critical'
                  ? 'warning'
                  : evt.severity === 'warning'
                  ? 'report_problem'
                  : evt.severity === 'success'
                  ? 'check_circle'
                  : 'info'}
              </span>
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label-md font-semibold text-on-surface truncate">
                  {evt.title}
                </span>
                <span className="font-code-sm text-outline text-[11px] shrink-0">
                  {evt.timestamp}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {evt.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
