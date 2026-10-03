import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const TransferDetail: React.FC = () => {
  const { selectedFundTransfer, isFundDrawerOpen, closeAllDrawers } = useAppStore();

  if (!isFundDrawerOpen || !selectedFundTransfer) return null;

  const transfer = selectedFundTransfer;

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <>
      <div
        onClick={closeAllDrawers}
        className="fixed inset-0 bg-inverse-surface/30 backdrop-blur-[2px] z-50 transition-opacity"
      />
      <div
        aria-modal="true"
        role="dialog"
        className="fixed top-2 bottom-2 right-2 w-[calc(100vw-16px)] sm:w-[500px] max-w-[94vw] bg-surface-container-lowest rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 bg-surface-container-high/40 flex flex-col gap-2 border-b border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-code-sm text-code-sm uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-on-primary font-bold">
              {transfer.id}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
              {transfer.status}
            </span>
            <button
              onClick={closeAllDrawers}
              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Close drawer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
              {transfer.organization}
            </h2>
            <p className="font-label-sm text-label-sm text-outline mt-0.5">
              Stage: {transfer.stageName} • Role: {transfer.role}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Allocation & Deployment */}
          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-3">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
              Capital Tranche Execution
            </span>
            <div className="grid grid-cols-2 gap-2 text-body-sm font-body-sm">
              <div className="p-2.5 rounded bg-surface-container-lowest">
                <span className="text-[11px] text-outline uppercase block">Allocated Tranche</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {formatCurrency(transfer.allocatedAmountInr)}
                </span>
              </div>
              <div className="p-2.5 rounded bg-surface-container-lowest">
                <span className="text-[11px] text-outline uppercase block">Utilized / Deployed</span>
                <span className="font-headline-sm font-bold text-primary">
                  {formatCurrency(transfer.utilizedAmountInr)}
                </span>
              </div>
              <div className="p-2.5 rounded bg-surface-container-lowest">
                <span className="text-[11px] text-outline uppercase block">Escrow Balance</span>
                <span className="font-headline-sm font-bold text-on-surface-variant">
                  {formatCurrency(transfer.balanceAmountInr)}
                </span>
              </div>
              <div className="p-2.5 rounded bg-surface-container-lowest">
                <span className="text-[11px] text-outline uppercase block">Execution Rate</span>
                <span className="font-headline-sm font-bold text-emerald-600">
                  {transfer.percentageDeployed}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex items-center">
              <div
                className="h-full bg-primary-container rounded-full"
                style={{ width: `${transfer.percentageDeployed}%` }}
              />
            </div>
          </div>

          {/* Beneficiaries & Proof */}
          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
              Beneficiary Reach &amp; Audit Seal
            </span>
            <div className="p-2.5 rounded bg-surface-container-lowest flex items-center justify-between">
              <div>
                <span className="text-[11px] text-outline uppercase block">Impact Reach</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {transfer.beneficiariesCount.toLocaleString('en-IN')} Citizens
                </span>
              </div>
              <span className="material-symbols-outlined text-primary text-[24px]">groups</span>
            </div>
            <div className="p-2.5 rounded bg-surface-container-lowest flex flex-col gap-1">
              <span className="text-[11px] text-outline uppercase block">Cryptographic Tx Hash</span>
              <span className="font-mono text-[12px] text-primary break-all select-all font-semibold">
                {transfer.lastTxHash}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-end">
          <button
            onClick={closeAllDrawers}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
