import React from 'react';
import { LedgerBlock } from '../../types';
import { VerificationStatus } from './VerificationStatus';

interface LedgerEntryProps {
  block: LedgerBlock;
  isSelected: boolean;
  onClick: () => void;
}

export const LedgerEntry: React.FC<LedgerEntryProps> = ({ block, isSelected, onClick }) => {
  return (
    <article
      onClick={onClick}
      className={`relative rounded-xl p-space-md shadow-sm hover:shadow-md transition-all cursor-pointer border ${
        isSelected
          ? 'bg-surface-container-lowest border-primary shadow-md'
          : 'bg-surface-container-lowest border-outline-variant/30'
      }`}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Block #{block.blockNumber}
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold uppercase">
              {block.actionType}
            </span>
            <VerificationStatus verified={block.verified} />
          </div>
          <span className="font-code-sm text-code-sm text-outline">{block.timestamp}</span>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {block.payloadSummary}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-outline-variant/20 text-body-sm">
          <span className="text-outline text-xs">
            Validator: <strong className="text-on-surface font-medium">{block.validator}</strong>
          </span>
          <div className="inline-flex items-center gap-1.5 font-code-sm text-code-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
            <span className="text-outline">Hash:</span>
            <span className="text-on-surface font-medium truncate max-w-[140px]">
              {block.hash.slice(0, 16)}...
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
