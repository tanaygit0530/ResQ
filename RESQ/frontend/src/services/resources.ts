import { BloodInventory, Medicine } from '../types';
import { mockBloodInventory, mockMedicines } from './mockData';

export const resourcesService = {
  async getBloodInventory(): Promise<BloodInventory[]> {
    return Promise.resolve([...mockBloodInventory]);
  },

  async getMedicines(): Promise<Medicine[]> {
    return Promise.resolve([...mockMedicines]);
  },
};
