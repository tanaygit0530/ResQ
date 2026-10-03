import { Patient } from '../types';
import { mockPatients } from './mockData';

export const patientsService = {
  async getPatients(): Promise<Patient[]> {
    return Promise.resolve([...mockPatients]);
  },

  async getPatientById(id: string): Promise<Patient | undefined> {
    return Promise.resolve(mockPatients.find((p) => p.id === id));
  },

  async updateTriage(id: string, updates: Partial<Patient>): Promise<Patient> {
    const patient = mockPatients.find((p) => p.id === id);
    if (!patient) throw new Error('Patient not found');
    return Promise.resolve({ ...patient, ...updates });
  },
};
