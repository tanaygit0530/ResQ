import React from 'react';
import { Ambulance } from '../../types';

interface AmbulanceMarkerProps {
  ambulance: Ambulance;
  position: { left: string; top: string };
  onClick: () => void;
}

export const AmbulanceMarker: React.FC<AmbulanceMarkerProps> = ({
  ambulance,
  position,
  onClick,
}) => {
  const isEnRoute = ambulance.status === 'En Route' || ambulance.status === 'Transporting';

  return (
    <div
      style={{ left: position.left, top: position.top }}
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group z-20 transition-transform hover:scale-110 active:scale-95"
    >
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary-container text-on-primary shadow-lg ring-2 ring-surface-container-lowest">
        <span
          className={`material-symbols-outlined text-[14px] ${
            isEnRoute ? 'animate-bounce' : ''
          }`}
        >
          airport_shuttle
        </span>
        <span className="font-code-sm text-code-sm font-bold">{ambulance.id}</span>
      </div>

      {/* Popover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-surface-container-lowest p-2 rounded-lg shadow-xl border border-outline-variant/30 text-on-surface w-44 z-30 pointer-events-none">
        <span className="font-label-sm text-label-sm font-bold text-primary uppercase">
          {ambulance.callsign}
        </span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Status: {ambulance.status} ({ambulance.telemetry.speedKmh} km/h)
        </span>
        {ambulance.assignedPatientId && (
          <span className="font-body-sm text-body-sm text-tertiary font-semibold mt-0.5">
            Dispatched: {ambulance.assignedPatientId}
          </span>
        )}
      </div>
    </div>
  );
};
