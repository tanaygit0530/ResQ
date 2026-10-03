import React from 'react';
import { AmbulanceStatus } from '../../types';

interface AmbulanceStatusBadgeProps {
  status: AmbulanceStatus;
}

export const AmbulanceStatusBadge: React.FC<AmbulanceStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'Transporting':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
          Transporting
        </span>
      );
    case 'En Route':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          En Route
        </span>
      );
    case 'Available':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-label-sm text-label-sm font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          Available
        </span>
      );
    case 'Staging':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-outline" />
          Staging
        </span>
      );
    case 'Maintenance':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
          Maintenance
        </span>
      );
  }
};
