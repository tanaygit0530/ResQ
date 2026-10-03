import React from 'react';
import { useAppStore } from '../stores/appStore';
import { PatientTable } from '../components/patients/PatientTable';

export const PatientsPage: React.FC = () => {
  const { patients } = useAppStore();

  const critical = patients.filter((p) => p.triageSeverity === 'Critical').length;
  const urgent = patients.filter((p) => p.triageSeverity === 'Urgent').length;
  const delayed = patients.filter((p) => p.triageSeverity === 'Delayed').length;
  const allocated = patients.filter((p) => p.status === 'Allocated' || p.status === 'In Transit').length;

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Patient Triage Registry
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Live Zone Triage
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Anonymized field triage queue, clinical severity classifications, and dynamic receiving hospital matching.
          </p>
        </div>

        {/* Quick Triage Counters */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-error-container/40 text-on-error-container font-label-sm text-label-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span>{critical} Critical</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 font-label-sm text-label-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>{urgent} Urgent</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-label-sm text-label-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>{delayed} Delayed</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <PatientTable />
    </div>
  );
};
