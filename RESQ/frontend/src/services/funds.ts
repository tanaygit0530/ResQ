import { FundTransfer } from '../types';
import { mockFundTransfers } from './mockData';

export const fundsService = {
  async getFundTransfers(): Promise<FundTransfer[]> {
    return Promise.resolve([...mockFundTransfers]);
  },
};
