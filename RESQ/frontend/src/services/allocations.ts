import { Allocation, DecisionExplanation } from '../types';
import { mockAllocations, mockDecisionExplanation } from './mockData';

export const allocationsService = {
  async getAllocations(): Promise<Allocation[]> {
    return Promise.resolve([...mockAllocations]);
  },

  async getDecisionExplanation(patientId: string): Promise<DecisionExplanation> {
    const exp = mockDecisionExplanation[patientId] || mockDecisionExplanation['P-7F3A'];
    return Promise.resolve(exp);
  },
};
