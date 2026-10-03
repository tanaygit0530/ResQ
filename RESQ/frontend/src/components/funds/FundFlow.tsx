import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { TransferCard } from './TransferCard';

export const FundFlow: React.FC = () => {
  const { fundTransfers, selectedFundTransfer, selectFundTransfer } = useAppStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
      {fundTransfers.map((transfer, idx) => (
        <TransferCard
          key={transfer.id}
          transfer={transfer}
          index={idx}
          isSelected={selectedFundTransfer?.id === transfer.id}
          onClick={() => selectFundTransfer(transfer)}
        />
      ))}
    </div>
  );
};
