import React from 'react';
import { useAppStore } from '../stores/appStore';
import { AllocationTable } from '../components/allocation/AllocationTable';
import { AllocationStatusChip } from '../components/allocation/AllocationStatus';

export const AllocationsPage: React.FC = () => {
  const { openDecisionExplanation, openOverrideModal } = useAppStore();

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Dynamic Resource Allocations
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Deterministic Simplex
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Automated multi-objective triage assignment matrix across patients, ambulances, and receiving hospital trauma bays.
          </p>
        </div>

        <div className="flex items-center gap-space-sm">
          <AllocationStatusChip />
          <button
            onClick={() => openDecisionExplanation('P-7F3A')}
            className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            <span>Why This Allocation?</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <AllocationTable />
    </div>
  );
};
