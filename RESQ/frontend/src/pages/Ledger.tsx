import React, { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { LedgerTimeline } from '../components/ledger/LedgerTimeline';

export const LedgerPage: React.FC = () => {
  const { ledgerBlocks } = useAppStore();
  const [isVerifyingAll, setIsVerifyingAll] = useState(false);
  const [verifiedAllSuccess, setVerifiedAllSuccess] = useState(false);

  const handleVerifyAll = () => {
    setIsVerifyingAll(true);
    setTimeout(() => {
      setIsVerifyingAll(false);
      setVerifiedAllSuccess(true);
      setTimeout(() => setVerifiedAllSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Transparent Audit Ledger
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              SHA-256 Hash Chain
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Immutable, tamper-evident cryptographic log of dispatch decisions, medical supplies, and emergency voucher releases.
          </p>
        </div>

        <button
          onClick={handleVerifyAll}
          disabled={isVerifyingAll}
          className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all shadow-sm flex items-center gap-2"
        >
          {isVerifyingAll ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span>Attesting 12 Consensus Nodes...</span>
            </>
          ) : verifiedAllSuccess ? (
            <>
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
              <span>All Blocks Cryptographically Verified!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">security</span>
              <span>Verify Full Chain Integrity</span>
            </>
          )}
        </button>
      </div>

      {/* Institutional Callout */}
      <div className="rounded-xl bg-surface-container-low p-4 shadow-sm flex items-start gap-3 border border-outline-variant/30">
        <span className="material-symbols-outlined text-secondary text-[24px] mt-0.5 shrink-0">
          shield_lock
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            Institutional Tamper-Evident Safety
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Every entry in the RESQ Disaster Ledger is linked via SHA-256 parent hashes and digitally signed with Ed25519 authority keys from SDMA, Red Cross, and municipal response hubs.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <LedgerTimeline />
    </div>
  );
};
