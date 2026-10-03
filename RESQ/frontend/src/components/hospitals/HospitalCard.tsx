import React from 'react';
import { Hospital } from '../../types';
import { CapacityBar } from './CapacityBar';

interface HospitalCardProps {
  hospital: Hospital;
  onClick: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onClick }) => {
  const isFull = hospital.availableIcuBeds === 0;

  return (
    <div
      onClick={onClick}
      className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer border border-outline-variant/30 flex flex-col justify-between gap-space-sm"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-code-sm text-code-sm text-outline uppercase font-semibold">
              {hospital.id}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight mt-0.5">
              {hospital.name}
            </h3>
            <p className="font-body-sm text-body-sm text-outline truncate">{hospital.level}</p>
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold uppercase ${
              isFull
                ? 'bg-error-container text-on-error-container'
                : 'bg-emerald-100 text-emerald-900'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${isFull ? 'bg-tertiary animate-pulse' : 'bg-emerald-600'}`}
            />
            {isFull ? 'ICU Saturated' : 'Receiving'}
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <CapacityBar
            available={hospital.availableIcuBeds}
            total={hospital.totalIcuBeds}
            label="ICU Resuscitation"
          />
          <CapacityBar
            available={hospital.availableGeneralBeds}
            total={hospital.totalGeneralBeds}
            label="General Ward"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-body-sm text-outline">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-tertiary">bloodtype</span>
          <span>{hospital.bloodUnits} Blood Units</span>
        </span>
        <span className="font-label-sm text-primary font-semibold hover:underline">
          View Dossier →
        </span>
      </div>
    </div>
  );
};
