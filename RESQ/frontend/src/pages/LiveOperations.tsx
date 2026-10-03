import React, { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { DisasterMap } from '../components/map/DisasterMap';
import { PatientTable } from '../components/patients/PatientTable';

export const LiveOperationsPage: React.FC = () => {
  const { simulation, triggerDisruptor, openDecisionExplanation, openOverrideModal } = useAppStore();
  const [activeTab, setActiveTab] = useState<'map' | 'split'>('split');

  return (
    <div className="flex flex-col w-full gap-space-md">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Live Operations
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              SECTOR 03
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Real-time disaster response and dynamic multi-agent resource allocation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          {/* Live Pulse Telemetry */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low shadow-sm border border-outline-variant/20">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
            </span>
            <span className="font-code-sm text-code-sm font-semibold text-on-surface tracking-wider">
              LIVE
            </span>
            <span className="font-body-sm text-body-sm text-outline">| 3s ago</span>
          </div>

          {/* Sector Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md shadow-sm border border-outline-variant/20">
            <span className="material-symbols-outlined text-[18px] text-outline">my_location</span>
            <span className="font-medium">Sector 3: Mumbai Harbor &amp; Industrial</span>
          </div>

          {/* Manual Dispatch Override Button */}
          <button
            onClick={() =>
              openOverrideModal({
                type: 'allocation',
                id: 'Sector-03-Dispatch',
                title: 'Sector 03 Manual Dispatch Console',
              })
            }
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all shadow-sm active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Manual Dispatch Override</span>
          </button>
        </div>
      </div>

      {/* 2. OPTIMIZER TELEMETRY DOCKED BANNER */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm px-space-md py-2.5 bg-surface-container-high rounded-xl text-on-surface shadow-sm">
        <div className="flex items-center gap-space-md flex-wrap">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-label-md text-label-md font-semibold text-primary">
              Continuous Multi-Agent Solver v4.2
            </span>
          </div>
          <div className="h-4 w-px bg-outline-variant/60 hidden sm:block" />
          <div className="flex items-center gap-1.5 font-code-sm text-code-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
            <span>
              Optimizer Status: <strong>{simulation.optimizerStatus}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-md font-label-sm text-label-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-outline uppercase tracking-wider">Objective:</span>
            <span className="font-semibold text-on-surface">Min Travel + Max ICU Match</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-surface-container-lowest font-code-sm text-code-sm font-semibold text-secondary shadow-sm">
            99.4% OPTIMAL
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC DIVERSION ALERT CARD (If Bridge is Blocked) */}
      {simulation.bridgeB12Blocked && (
        <div className="bg-surface-container-lowest border-l-4 border-l-tertiary rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-error-container text-tertiary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">turn_sharp_right</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md font-bold text-tertiary uppercase">
                  Route Changed — Dynamic Diversion
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container font-code-sm text-[10px] text-outline">
                  AUTO-SOLVED
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                <strong className="text-tertiary font-bold">Bridge B12</strong> impassable due to flood debris. Ambulance A-17 dynamically diverted via Eastern Freeway.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-2.5 py-1 rounded-md bg-surface-container-low font-code-sm text-code-sm text-on-surface">
              Delta: <strong className="text-tertiary">+3m</strong> | ETA: <strong>08 min</strong>
            </div>
            <button
              onClick={() => openDecisionExplanation('P-7F3A')}
              className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors"
            >
              Why This Route?
            </button>
          </div>
        </div>
      )}

      {/* 4. MAIN WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        <div className="lg:col-span-8 flex flex-col">
          <DisasterMap heightClass="h-[620px]" showFilters={true} />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Quick Trigger Controls */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm font-semibold uppercase text-outline">
                Simulate Disruption
              </span>
              <span className="text-[11px] text-primary font-semibold">Live Testing</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => triggerDisruptor('block_bridge')}
                className={`py-2 px-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  simulation.bridgeB12Blocked
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>⚡ Bridge B12</span>
                <span className="material-symbols-outlined text-[14px]">
                  {simulation.bridgeB12Blocked ? 'block' : 'alt_route'}
                </span>
              </button>
              <button
                onClick={() => triggerDisruptor('fill_icu')}
                className={`py-2 px-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  simulation.apexIcuFull
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>🏥 Fill ICU</span>
                <span className="material-symbols-outlined text-[14px]">local_hospital</span>
              </button>
            </div>
          </div>

          {/* Active Triage Queue Component */}
          <PatientTable maxRows={6} />
        </div>
      </div>
    </div>
  );
};
