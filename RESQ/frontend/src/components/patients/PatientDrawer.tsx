import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';
import { SeverityBadge } from './SeverityBadge';

export const PatientDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedPatient,
    isPatientDrawerOpen,
    closeAllDrawers,
    openDecisionExplanation,
    openOverrideModal,
    hospitals,
  } = useAppStore();

  if (!isPatientDrawerOpen || !selectedPatient) return null;

  const assignedHospital = hospitals.find((h) => h.id === selectedPatient.assignedHospitalId);

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
                {selectedPatient.id}
              </span>
              <SeverityBadge severity={selectedPatient.triageSeverity} />
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
              {selectedPatient.injury}
            </h2>
            <div className="flex items-center gap-3 text-outline font-label-sm text-label-sm mt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">access_time</span> Reported:{' '}
                {selectedPatient.registeredTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>{' '}
                {selectedPatient.location}
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Vitals Matrix */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
              On-Scene Vitals Telemetry
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded bg-surface-container-lowest">
                <span className="font-label-sm text-outline block text-[10px]">SpO2</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {selectedPatient.vitals.spo2}%
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest">
                <span className="font-label-sm text-outline block text-[10px]">BP</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {selectedPatient.vitals.bp}
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest">
                <span className="font-label-sm text-outline block text-[10px]">Pulse</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {selectedPatient.vitals.pulse}
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest">
                <span className="font-label-sm text-outline block text-[10px]">GCS</span>
                <span className="font-headline-sm font-bold text-primary">
                  {selectedPatient.vitals.gcs}/15
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Transport & Facility */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-lg bg-primary text-on-primary">
                <span className="material-symbols-outlined text-[20px]">airport_shuttle</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">
                  Assigned Transport
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                  {selectedPatient.assignedAmbulanceId || 'Pending Allocation'}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {selectedPatient.notes || 'Inbound ALS telemetry active'}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-outline-variant/40" />
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-lg bg-secondary text-on-secondary">
                <span className="material-symbols-outlined text-[20px]">local_hospital</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">
                  Destination Facility
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                  {assignedHospital?.name || 'City Hospital B (Lilavati Trauma Hub)'}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Trauma Bay 04 • ICU Bed Reserved
                </span>
              </div>
            </div>
            {selectedPatient.etaMinutes && (
              <div className="mt-1 flex items-center justify-between p-2 rounded-md bg-secondary-fixed/50 text-on-secondary-fixed">
                <div className="flex items-center gap-1.5 font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-secondary">navigation</span>
                  <span>ETA: {selectedPatient.etaMinutes} min</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-secondary-container">
                  Fastest corridor clear
                </span>
              </div>
            )}
          </div>

          {/* Quick Explainability Card */}
          <div className="p-3 rounded-lg bg-surface-container-high/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
              <div>
                <p className="font-label-md font-semibold text-on-surface">Allocation Explainability</p>
                <p className="font-body-sm text-outline text-[12px]">Optimality Score: 98.6%</p>
              </div>
            </div>
            <button
              onClick={() => openDecisionExplanation(selectedPatient.id)}
              className="px-2.5 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors"
            >
              Why This Decision?
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-2">
          <button
            onClick={() =>
              openOverrideModal({
                type: 'patient',
                id: selectedPatient.id,
                title: `Reroute Patient ${selectedPatient.id}`,
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
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>View on Map</span>
          </button>
        </div>
      </div>
    </>
  );
};
