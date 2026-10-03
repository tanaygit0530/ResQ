import React from 'react';
import { useAppStore } from '../stores/appStore';
import { AmbulanceTable } from '../components/ambulances/AmbulanceTable';

export const AmbulancesPage: React.FC = () => {
  const { ambulances } = useAppStore();

  const active = ambulances.filter((a) => a.status === 'En Route' || a.status === 'Transporting').length;
  const available = ambulances.filter((a) => a.status === 'Available').length;
  const staging = ambulances.filter((a) => a.status === 'Staging').length;
  const maintenance = ambulances.filter((a) => a.status === 'Maintenance').length;

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Ambulance Fleet Operations
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Fleet Telemetry
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Real-time geospatial tracking, life-support class capabilities, fuel status, and on-scene paramedic sync.
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
            {active} Active
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-label-sm text-label-sm font-semibold">
            {available} Available
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium">
            {staging} Staging
          </div>
          {maintenance > 0 && (
            <div className="px-3 py-1.5 rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
              {maintenance} Maintenance
            </div>
          )}
        </div>
      </div>

      {/* Main Table */}
      <AmbulanceTable />
    </div>
  );
};
