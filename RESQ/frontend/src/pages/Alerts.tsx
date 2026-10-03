import React from 'react';
import { AlertList } from '../components/alerts/AlertList';

export const AlertsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Active Incident Alert Center
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
              Live Escalations
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Automated sensor alerts, arterial cutoff triggers, blood deficits, and capacity warnings requiring tactical action.
          </p>
        </div>
      </div>

      {/* Main Alert List */}
      <AlertList />
    </div>
  );
};
