import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { LedgerEntry } from './LedgerEntry';

export const LedgerTimeline: React.FC = () => {
  const { ledgerBlocks, selectedLedgerBlock, selectLedgerBlock } = useAppStore();

  return (
    <div className="flex flex-col gap-space-md">
      {ledgerBlocks.map((block) => (
        <LedgerEntry
          key={block.blockNumber}
          block={block}
          isSelected={selectedLedgerBlock?.blockNumber === block.blockNumber}
          onClick={() => selectLedgerBlock(block)}
        />
      ))}
    </div>
  );
};
