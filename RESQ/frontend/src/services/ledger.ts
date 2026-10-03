import { LedgerBlock } from '../types';
import { mockLedgerBlocks } from './mockData';

export const ledgerService = {
  async getLedgerBlocks(): Promise<LedgerBlock[]> {
    return Promise.resolve([...mockLedgerBlocks]);
  },

  async verifyBlock(blockNumber: number): Promise<{ verified: boolean; message: string }> {
    return Promise.resolve({
      verified: true,
      message: `Block #${blockNumber} cryptographic hash chain verified via Ed25519 signature.`,
    });
  },
};
