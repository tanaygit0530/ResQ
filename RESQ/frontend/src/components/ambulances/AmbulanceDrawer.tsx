import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';
import { AmbulanceStatusBadge } from './AmbulanceStatusBadge';

export const AmbulanceDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedAmbulance,
    isAmbulanceDrawerOpen,
    closeAllDrawers,
    openOverrideModal,
  } = useAppStore();

  if (!isAmbulanceDrawerOpen || !selectedAmbulance) return null;

  return (
    <>
      <div
        onClick={closeAllDrawers}
        className="fixed inset-0 bg-inverse-surface/30 backdrop-blur-[2px] z-50 transition-opacity"
      />
      <div
        aria-modal="true"
        role="dialog"
        className="fixed top-2 bottom-2 right-2 w-[calc(100vw-16px)] sm:w-[500px] max-w-[94vw] bg-surface-container-lowest rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Header Bar */}
        <div className="p-4 bg-surface-container-high/40 flex flex-col gap-2 border-b border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-code-sm text-code-sm uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-on-primary font-bold">
                {selectedAmbulance.id}
              </span>
              <AmbulanceStatusBadge status={selectedAmbulance.status} />
            </div>
            <button
              onClick={closeAllDrawers}
              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-highest transition-colors"
              title="Close Panel"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
              {selectedAmbulance.callsign}
            </h2>
            <p className="font-label-sm text-label-sm text-outline mt-0.5">
              {selectedAmbulance.type} • Lead Paramedic: {selectedAmbulance.leadParamedic}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Telemetry Strip */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
              Onboard Vehicle Telemetry
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-surface-container-lowest">
                <span className="font-label-sm text-outline block text-[10px]">Speed</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {selectedAmbulance.telemetry.speedKmh} km/h
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest">
                <span className="font-label-sm text-outline block text-[10px]">O2 Reserves</span>
                <span className="font-headline-sm font-bold text-primary">
                  {selectedAmbulance.telemetry.oxygenLevelPct}%
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest">
                <span className="font-label-sm text-outline block text-[10px]">Fuel</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {selectedAmbulance.fuelPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Current Assignment */}
          <div className="p-3 rounded-lg bg-surface-container-low space-y-2">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider block">
              Active Tactical Dispatch
            </span>
            <div className="p-2.5 rounded bg-surface-container-lowest flex items-center justify-between">
              <div>
                <span className="text-[11px] text-outline uppercase block">Current Location</span>
                <span className="font-label-md font-semibold text-on-surface">
                  {selectedAmbulance.currentLocation}
                </span>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px]">near_me</span>
            </div>

            {selectedAmbulance.assignedPatientId && (
              <div className="p-2.5 rounded bg-surface-container-lowest flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-outline uppercase block">Assigned Casualty</span>
                  <span className="font-label-md font-bold text-tertiary">
                    {selectedAmbulance.assignedPatientId}
                  </span>
                </div>
                {selectedAmbulance.etaMinutes && (
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-code-sm text-code-sm font-bold">
                    ETA {selectedAmbulance.etaMinutes}m
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Crew Info */}
          <div className="p-3 rounded-lg bg-surface-container-low space-y-1.5">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider block">
              Duty Personnel
            </span>
            <div className="flex justify-between items-center text-body-sm">
              <span className="text-outline">Lead Paramedic:</span>
              <span className="font-semibold text-on-surface">{selectedAmbulance.leadParamedic}</span>
            </div>
            <div className="flex justify-between items-center text-body-sm">
              <span className="text-outline">Tactical Driver:</span>
              <span className="font-semibold text-on-surface">{selectedAmbulance.driver}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-2">
          <button
            onClick={() =>
              openOverrideModal({
                type: 'ambulance',
                id: selectedAmbulance.id,
                title: `Manual Standby for ${selectedAmbulance.id}`,
              })
            }
            className="flex-1 py-2 px-3 rounded-lg bg-surface-container-highest text-error hover:bg-error-container font-label-md text-label-md font-semibold transition-colors"
          >
            Manual Override
          </button>
          <button
            onClick={() => {
              closeAllDrawers();
              navigate('/live');
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">navigation</span>
            <span>Track on Live Map</span>
          </button>
        </div>
      </div>
    </>
  );
};
