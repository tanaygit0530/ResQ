import React from 'react';
import { Patient } from '../../types';

interface PatientMarkerProps {
  patient: Patient;
  position: { left: string; top: string };
  onClick: () => void;
}

export const PatientMarker: React.FC<PatientMarkerProps> = ({ patient, position, onClick }) => {
  const isCritical = patient.triageSeverity === 'Critical';
  const isUrgent = patient.triageSeverity === 'Urgent';

  const badgeBg = isCritical
    ? 'bg-tertiary text-on-tertiary'
    : isUrgent
    ? 'bg-secondary text-on-secondary'
    : 'bg-[#16A34A] text-white';

  return (
    <div
      style={{ left: position.left, top: position.top }}
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group z-10 transition-transform hover:scale-110 active:scale-95"
    >
      <div
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${badgeBg} shadow-md ring-2 ring-surface-container-lowest`}
      >
        <span className="material-symbols-outlined text-[14px]">
          {isCritical ? 'emergency' : isUrgent ? 'person_alert' : 'personal_injury'}
        </span>
        <span className="font-code-sm text-code-sm font-bold">{patient.id}</span>
      </div>

      {/* Popover on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-surface-container-lowest p-2 rounded-lg shadow-xl border border-outline-variant/30 text-on-surface w-44 z-30 pointer-events-none">
        <span
          className={`font-label-sm text-label-sm font-bold uppercase ${
            isCritical ? 'text-tertiary' : isUrgent ? 'text-secondary' : 'text-[#16A34A]'
          }`}
        >
          {patient.triageSeverity} · {patient.injury.slice(0, 16)}...
        </span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          SpO2: {patient.vitals.spo2}% | BP: {patient.vitals.bp}
        </span>
        {patient.assignedAmbulanceId && (
          <span className="font-body-sm text-body-sm text-primary font-semibold mt-1">
            {patient.assignedAmbulanceId} inbound ({patient.etaMinutes || 5}m)
          </span>
        )}
      </div>
    </div>
  );
};
