import React from 'react';
import { FundTransfer } from '../../types';

interface TransferCardProps {
  transfer: FundTransfer;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export const TransferCard: React.FC<TransferCardProps> = ({
  transfer,
  index,
  isSelected,
  onClick,
}) => {
  const formatInr = (amt: number) => `₹${(amt / 10000000).toFixed(2)} Cr`;

  return (
    <div
      onClick={onClick}
      className={`p-space-md rounded-xl border flex flex-col justify-between gap-space-sm transition-all cursor-pointer ${
        isSelected
          ? 'bg-surface-container-lowest border-primary shadow-md'
          : 'bg-surface-container-lowest border-outline-variant/30 hover:shadow-sm'
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center">
              0{index + 1}
            </span>
            <span className="font-label-sm text-outline uppercase font-semibold">
              {transfer.stageName}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
            {transfer.status}
          </span>
        </div>

        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-2">
          {transfer.organization}
        </h3>
        <p className="font-body-sm text-body-sm text-outline mt-0.5">{transfer.role}</p>

        <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-lg bg-surface-container-low font-body-sm">
          <div>
            <span className="text-[10px] text-outline uppercase block">Allocated</span>
            <span className="font-headline-sm text-sm font-bold text-on-surface">
              {formatInr(transfer.allocatedAmountInr)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-outline uppercase block">Utilized</span>
            <span className="font-headline-sm text-sm font-bold text-primary">
              {formatInr(transfer.utilizedAmountInr)}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary-container rounded-full"
              style={{ width: `${transfer.percentageDeployed}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-outline pt-0.5">
            <span>Progress</span>
            <span className="font-bold text-emerald-600">{transfer.percentageDeployed}% Deployed</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-body-sm">
        <span className="text-outline text-xs">
          Reach: <strong className="text-on-surface">{transfer.beneficiariesCount.toLocaleString()}</strong>
        </span>
        <span className="text-primary font-semibold text-xs hover:underline">
          Audit Seal →
        </span>
      </div>
    </div>
  );
};
