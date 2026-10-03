import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const EventControls: React.FC = () => {
  const { simulation, triggerDisruptor } = useAppStore();

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-tertiary text-[18px]">bolt</span>
          <span className="font-label-sm text-label-sm uppercase font-semibold text-tertiary tracking-wider">
            Live Disruptors
          </span>
        </div>
        <span className="px-1.5 py-0.5 bg-error-container/30 text-on-error-container font-label-sm text-[10px] uppercase font-bold rounded">
          Interactive Demo
        </span>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Trigger live constraints to witness the automated multi-commodity flow solver recompute assignments in real time.
      </p>

      {/* Disruptor Buttons Grid */}
      <div className="flex flex-col gap-2 pt-1" id="disruptor-list">
        {/* Trigger 1: Block Bridge */}
        <button
          onClick={() => triggerDisruptor('block_bridge')}
          className={`group flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
            simulation.bridgeB12Blocked
              ? 'bg-error-container/30 hover:bg-error-container/50 border border-error/30'
              : 'bg-surface-container-low hover:bg-surface-container'
          }`}
          id="btn-block-bridge"
          type="button"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
              emergency_home
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-bold text-on-surface truncate">
                ⚡ Block Bridge B12
              </span>
              <span className="font-body-sm text-body-sm text-outline truncate">
                Simulates flash flood cut-off
              </span>
            </div>
          </div>
          {simulation.bridgeB12Blocked ? (
            <span className="px-1.5 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-[10px] font-semibold tracking-wider shrink-0 uppercase">
              TRIGGERED
            </span>
          ) : (
            <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary transition-colors">
              play_circle
            </span>
          )}
        </button>

        {/* Trigger 2: Fill ICU */}
        <button
          onClick={() => triggerDisruptor('fill_icu')}
          className={`group flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
            simulation.apexIcuFull
              ? 'bg-error-container/30 hover:bg-error-container/50 border border-error/30'
              : 'bg-surface-container-low hover:bg-surface-container'
          }`}
          id="btn-fill-icu"
          type="button"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
              local_hospital
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                🏥 Fill ICU (Apex Central)
              </span>
              <span className="font-body-sm text-body-sm text-outline truncate">
                Capacity drops to 0 beds
              </span>
            </div>
          </div>
          {simulation.apexIcuFull ? (
            <span className="px-1.5 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-[10px] font-semibold tracking-wider shrink-0 uppercase">
              FULL (0 BEDS)
            </span>
          ) : (
            <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary transition-colors">
              play_circle
            </span>
          )}
        </button>

        {/* Trigger 3: Casualty Surge */}
        <button
          onClick={() => triggerDisruptor('casualty_surge')}
          className={`group flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
            simulation.casualtySurgeActive
              ? 'bg-error-container/30 border border-error/30'
              : 'bg-surface-container-low hover:bg-surface-container'
          }`}
          id="btn-casualty-surge"
          type="button"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
              group_add
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                👥 Casualty Surge (+25)
              </span>
              <span className="font-body-sm text-body-sm text-outline truncate">
                Harbor Link structural breach
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary transition-colors">
            play_circle
          </span>
        </button>

        {/* Trigger 4: Blood Shortage */}
        <button
          onClick={() => triggerDisruptor('blood_shortage')}
          className={`group flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
            simulation.bloodShortageActive
              ? 'bg-error-container/30 border border-error/30'
              : 'bg-surface-container-low hover:bg-surface-container'
          }`}
          id="btn-blood-shortage"
          type="button"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
              bloodtype
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                🩸 Blood Shortage (O-)
              </span>
              <span className="font-body-sm text-body-sm text-outline truncate">
                Drops below critical reserve
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary transition-colors">
            play_circle
          </span>
        </button>

        {/* Trigger 5: Ambulance Breakdown */}
        <button
          onClick={() => triggerDisruptor('ambulance_breakdown')}
          className={`group flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
            simulation.ambulanceBreakdownActive
              ? 'bg-error-container/30 border border-error/30'
              : 'bg-surface-container-low hover:bg-surface-container'
          }`}
          id="btn-ambulance-breakdown"
          type="button"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-error text-[20px] shrink-0">
              car_crash
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                🚑 Ambulance Breakdown
              </span>
              <span className="font-body-sm text-body-sm text-outline truncate">
                AMB-04 mechanical engine failure
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary transition-colors">
            play_circle
          </span>
        </button>
      </div>
    </div>
  );
};
