import { Alert } from '../types';
import { mockAlerts } from './mockData';

export const alertsService = {
  async getAlerts(): Promise<Alert[]> {
    return Promise.resolve([...mockAlerts]);
  },
};
