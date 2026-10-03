import { Ambulance } from '../types';
import { mockAmbulances } from './mockData';

export const ambulancesService = {
  async getAmbulances(): Promise<Ambulance[]> {
    return Promise.resolve([...mockAmbulances]);
  },

  async getAmbulanceById(id: string): Promise<Ambulance | undefined> {
    return Promise.resolve(mockAmbulances.find((a) => a.id === id));
  },
};
