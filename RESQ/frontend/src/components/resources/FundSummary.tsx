import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const FundSummary: React.FC = () => {
  const { fundTransfers, selectFundTransfer } = useAppStore();

  const totalAllocated = fundTransfers.reduce((acc, curr) => acc + curr.allocatedAmountInr, 0);
  const totalUtilized = fundTransfers.reduce((acc, curr) => acc + curr.utilizedAmountInr, 0);

  const formatCr = (amt: number) => `₹${(amt / 10000000).toFixed(2)} Cr`;

  return (
    <div className="flex flex-col gap-space-md">
      {/* Top Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">
            Total Relief Pool
          </span>
          <span className="font-display-lg font-bold text-on-surface mt-1 block">
            {formatCr(totalAllocated)}
          </span>
          <span className="text-[12px] text-emerald-600 font-semibold">100% Cryptographically Bound</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">
            Total Disbursed / Utilized
          </span>
          <span className="font-display-lg font-bold text-primary mt-1 block">
            {formatCr(totalUtilized)}
          </span>
          <span className="text-[12px] text-primary font-semibold">84.2% Field Deployment</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">
            Active Beneficiaries
          </span>
          <span className="font-display-lg font-bold text-on-surface mt-1 block">54,000+</span>
          <span className="text-[12px] text-outline font-medium">Verified by Zero-Knowledge Proofs</span>
        </div>
      </div>

      {/* Progression Flow Strip */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <h3 className="font-headline-sm font-bold text-on-surface mb-3">
          Verifiable Fund Progression Flow
        </h3>
        <div className="space-y-3">
          {fundTransfers.map((stage, idx) => (
            <div
              key={stage.id}
              onClick={() => selectFundTransfer(stage)}
              className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/20"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <div>
                  <span className="font-label-sm text-outline uppercase font-semibold block">
                    {stage.stageName}
                  </span>
                  <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                    {stage.organization}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[11px] text-outline uppercase block">Disbursed</span>
                  <span className="font-code-sm font-bold text-on-surface">
                    {formatCr(stage.utilizedAmountInr)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-outline uppercase block">Deployed</span>
                  <span className="font-code-sm font-bold text-emerald-600">
                    {stage.percentageDeployed}%
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
