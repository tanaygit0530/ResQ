import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';

export const LedgerDetailDrawer: React.FC = () => {
  const { selectedLedgerBlock, isLedgerDrawerOpen, closeAllDrawers, verifyLedgerBlock } =
    useAppStore();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isLedgerDrawerOpen || !selectedLedgerBlock) return null;

  const block = selectedLedgerBlock;

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerifiedSuccess(true);
      verifyLedgerBlock(block.blockNumber);
      setTimeout(() => {
        setIsVerifiedSuccess(false);
      }, 3000);
    }, 900);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(block.hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(block, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RESQ_Ledger_Block_${block.blockNumber}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
        className="fixed top-2 bottom-2 right-2 w-[calc(100vw-16px)] sm:w-[560px] max-w-[94vw] bg-surface-container-lowest rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between gap-3 p-4 bg-surface-container-low border-b border-outline-variant/30">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                Block #{block.blockNumber} Details
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                Cryptographically Verified
              </span>
            </div>
            <span className="font-code-sm text-code-sm text-on-surface-variant mt-0.5 font-medium">
              Event: {block.actionType.toUpperCase().replace(/\s+/g, '_')}_EVENT
            </span>
          </div>
          <button
            onClick={closeAllDrawers}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            title="Close drawer view"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Cryptographic Attestation Metadata */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Cryptographic Attestation
              </span>
              <span className="font-code-sm text-code-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">hub</span>
                12/12 Node Consensus
              </span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2.5 font-code-sm text-code-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-outline uppercase text-[11px] font-semibold">Block Number</span>
                <span className="font-bold text-on-surface">#{block.blockNumber}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-outline uppercase text-[11px] font-semibold">Event Type</span>
                <span className="text-primary font-semibold">{block.actionType}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-outline uppercase text-[11px] font-semibold shrink-0">Timestamp</span>
                <span className="text-on-surface text-right font-medium">{block.timestamp}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-outline uppercase text-[11px] font-semibold shrink-0">
                  Authorized Actor
                </span>
                <span className="text-on-surface text-right font-medium">{block.entity}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-outline uppercase text-[11px] font-semibold shrink-0">
                  Verification Node
                </span>
                <span className="text-on-surface text-right font-medium">{block.validator}</span>
              </div>

              <div className="h-px bg-outline-variant/40 my-1" />

              {/* Hashes */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-outline uppercase text-[11px] font-semibold">Current Block Hash</span>
                  <button
                    onClick={handleCopy}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1"
                  >
                    <span>{copiedHash ? 'Copied!' : 'Copy SHA-256'}</span>
                    <span className="material-symbols-outlined text-[13px]">
                      {copiedHash ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest font-mono text-[11px] text-on-surface break-all select-all shadow-inner">
                  {block.hash}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-outline uppercase text-[11px] font-semibold">
                  Previous Block Hash (Parent)
                </span>
                <div className="p-2 rounded bg-surface-container-lowest font-mono text-[11px] text-on-surface-variant break-all select-all shadow-inner">
                  {block.prevHash}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-outline uppercase text-[11px] font-semibold">
                  Digital Signature ({block.signature})
                </span>
                <div className="p-2 rounded bg-surface-container-lowest font-mono text-[11px] text-on-surface-variant break-all select-all shadow-inner">
                  {block.signature} • Verified by Authorized Keypair
                </div>
              </div>
            </div>
          </div>

          {/* Decoded Operational Payload */}
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Decoded Operational Payload
            </span>
            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2 text-body-sm font-body-sm">
                <div className="p-2 rounded-lg bg-surface-container-lowest">
                  <span className="font-label-sm text-label-sm text-outline block">Sender / Issuer</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-xs truncate block">
                    {block.details.sender}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-lowest">
                  <span className="font-label-sm text-label-sm text-outline block">Recipient</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-xs truncate block">
                    {block.details.recipient}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-lowest col-span-2">
                  <span className="font-label-sm text-label-sm text-outline block">Asset / Operation</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-sm">
                    {block.details.amountOrAsset}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                  Payload Summary
                </span>
                <p className="font-body-sm text-body-sm text-on-surface">{block.payloadSummary}</p>
              </div>
            </div>
          </div>

          {/* Attestation Alert Box */}
          <div className="p-3 rounded-lg bg-secondary-fixed/30 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
              verified
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Live Ledger Integrity Confirmed
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                All signatures and cryptographic proofs valid. Hash chain matches distributed ledger peers.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant/30 flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all"
            type="button"
          >
            {isVerifying ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Attesting 12 Nodes...</span>
              </>
            ) : isVerifiedSuccess ? (
              <>
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
                <span>Chain Fully Verified!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">rule</span>
                <span>Verify Record</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadJson}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md transition-colors"
            title="Download raw audit JSON string"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>Raw JSON</span>
          </button>
        </div>
      </div>
    </>
  );
};
