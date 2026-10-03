import { Hospital } from '../types';
import { mockHospitals } from './mockData';

export const hospitalsService = {
  async getHospitals(): Promise<Hospital[]> {
    return Promise.resolve([...mockHospitals]);
  },

  async getHospitalById(id: string): Promise<Hospital | undefined> {
    return Promise.resolve(mockHospitals.find((h) => h.id === id));
  },
};
