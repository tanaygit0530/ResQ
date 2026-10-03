import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const OptimizationStatus: React.FC = () => {
  const { simulation, openDecisionExplanation, openOverrideModal } = useAppStore();

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Optimization Status
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Active algorithmic state and routing constraints
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#166534] font-label-sm text-label-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
            </span>
            {simulation.optimizerStatus}
          </span>
        </div>

        {/* Telemetry Key-Value Pairs */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Last Optimization Run
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-code-sm text-code-sm font-semibold text-on-surface">
                14:32:08
              </span>
              <span className="text-xs text-outline font-medium">(42s ago)</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Trigger Event</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-tertiary bg-error-container/40 px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-[13px]">notification_important</span>{' '}
              {simulation.bridgeB12Blocked ? 'Road block: Bridge B12' : 'Traffic flow normalization'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Algorithm Model</span>
            <span className="font-code-sm text-code-sm font-semibold text-on-surface">
              Pareto Multi-Obj Matcher v4.2
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Solver Convergence
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full" style={{ width: '99.4%' }} />
              </div>
              <span className="font-code-sm text-code-sm font-bold text-primary">99.4% optimal</span>
            </div>
          </div>
        </div>

        {/* Algorithmic Health Note */}
        <div className="mt-4 p-3 rounded-lg bg-surface-container-low flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">auto_awesome</span>
          <p className="font-body-sm text-body-sm text-on-surface leading-snug">
            Current solver iteration successfully resolved ambulance conflicts across Kurla zone with zero starvation cycles.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 mt-4 border-t border-outline-variant/30 flex items-center gap-space-sm">
        <button
          onClick={() => openDecisionExplanation('P-7F3A')}
          className="flex-1 px-4 py-2 rounded-lg bg-surface-container-high text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          <span>Why? (Explainability)</span>
        </button>
        <button
          onClick={() =>
            openOverrideModal({
              type: 'allocation',
              id: 'Global-Dispatch',
              title: 'Global Dispatch Solver Rerouting',
            })
          }
          className="flex-1 px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface border border-outline-variant/60 font-label-md text-label-md font-semibold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>Manual Override</span>
        </button>
      </div>
    </div>
  );
};
