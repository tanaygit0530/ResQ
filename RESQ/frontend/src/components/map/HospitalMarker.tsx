import React from 'react';
import { Hospital } from '../../types';

interface HospitalMarkerProps {
  hospital: Hospital;
  position: { left: string; top: string };
  onClick: () => void;
}

export const HospitalMarker: React.FC<HospitalMarkerProps> = ({
  hospital,
  position,
  onClick,
}) => {
  const isFull = hospital.availableIcuBeds === 0;
  const isBorder = isFull
    ? 'border-l-4 border-l-error'
    : hospital.availableIcuBeds <= 2
    ? 'border-l-4 border-l-secondary'
    : 'border-l-4 border-l-primary';

  const iconColor = isFull ? 'text-tertiary' : 'text-primary';

  return (
    <div
      style={{ left: position.left, top: position.top }}
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95"
    >
      <div
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-md ${isBorder}`}
      >
        <span className={`material-symbols-outlined ${iconColor} text-[20px]`}>
          local_hospital
        </span>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md font-bold leading-tight">
            {hospital.shortName}
          </span>
          <span
            className={`font-label-sm text-label-sm font-semibold ${
              isFull ? 'text-tertiary' : 'text-on-surface-variant'
            }`}
          >
            {isFull ? 'ICU Full (0 Beds)' : `${hospital.availableIcuBeds} Beds Free`}
          </span>
        </div>
      </div>
    </div>
  );
};
