import React from 'react';
import { FundFlow } from '../components/funds/FundFlow';
import { FundSummary } from '../components/resources/FundSummary';

export const FundTraceabilityPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Relief Fund Traceability
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              Zero-Leakage Escrow
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Transparent tracking of emergency relief funds from corporate CSR and state treasuries directly to front-line field workers and verified displaced families.
          </p>
        </div>
      </div>

      {/* Summary Matrix */}
      <FundSummary />

      {/* Interactive Flow Grid */}
      <div className="flex flex-col gap-space-md">
        <h2 className="font-headline-sm font-bold text-on-surface">
          Cryptographically Verified Aid Tranches
        </h2>
        <FundFlow />
      </div>
    </div>
  );
};
