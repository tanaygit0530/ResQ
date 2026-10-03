import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const SimulationControls: React.FC = () => {
  const { simulation, resetSimulation } = useAppStore();

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
          Base Telemetry Parameters
        </span>
        <span className="material-symbols-outlined text-outline text-[18px]">tune</span>
      </div>

      {/* Telemetry Matrix */}
      <div className="grid grid-cols-2 gap-2 text-left">
        <div className="p-2.5 rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm text-outline block">Patients In Queue</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {simulation.patientsInQueue}
            </span>
            <span className="font-code-sm text-code-sm text-tertiary font-semibold">+12/hr</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm text-outline block">Fleet (Active/Stg)</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {simulation.fleetActive + simulation.fleetStaging}
            </span>
            <span className="font-code-sm text-code-sm text-secondary font-medium">
              {simulation.fleetActive} act / {simulation.fleetStaging} stg
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm text-outline block">Hospitals Active</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {simulation.hospitalsActive}
            </span>
            <span className="font-code-sm text-code-sm text-outline-variant font-medium">L1-L3</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm text-outline block">Blood Reserves</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {simulation.bloodReservesUnits}
            </span>
            <span className="font-code-sm text-code-sm text-outline font-medium">Units</span>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="pt-1 flex items-center gap-1.5">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          <span>Resume</span>
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">pause</span>
          <span>Pause</span>
        </button>
        <button
          onClick={resetSimulation}
          className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
          title="Reset Simulation"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
        </button>
      </div>
    </div>
  );
};
