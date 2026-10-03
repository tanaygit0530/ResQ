import { SimulationState, SimulationEvent } from '../types';
import { mockSimulationTimeline } from './mockData';

export const simulationService = {
  async getSimulationEvents(): Promise<SimulationEvent[]> {
    return Promise.resolve([...mockSimulationTimeline]);
  },
};
