import { create } from 'zustand';
import {
  Patient,
  Ambulance,
  Hospital,
  Alert,
  LedgerBlock,
  FundTransfer,
  SimulationState,
  SimulationEvent,
  Allocation,
  DecisionExplanation,
} from '../types';
import {
  mockPatients,
  mockAmbulances,
  mockHospitals,
  mockAlerts,
  mockLedgerBlocks,
  mockFundTransfers,
  mockAllocations,
  mockSimulationTimeline,
  mockDecisionExplanation,
} from '../services/mockData';

interface MapFilters {
  showPatients: boolean;
  showAmbulances: boolean;
  showHospitals: boolean;
  showTraffic: boolean;
  showRoutes: boolean;
}

interface AppStore {
  // Operator profile
  operator: {
    name: string;
    callsign: string;
    unit: string;
    zone: string;
    role: string;
    email: string;
    terminalId: string;
    systemStatus: 'Healthy' | 'Degraded' | 'Offline';
  };

  // Entities state
  patients: Patient[];
  ambulances: Ambulance[];
  hospitals: Hospital[];
  alerts: Alert[];
  allocations: Allocation[];
  ledgerBlocks: LedgerBlock[];
  fundTransfers: FundTransfer[];

  // Selected entities for Drawers/Modals
  selectedPatient: Patient | null;
  selectedAmbulance: Ambulance | null;
  selectedHospital: Hospital | null;
  selectedAllocation: Allocation | null;
  selectedLedgerBlock: LedgerBlock | null;
  selectedFundTransfer: FundTransfer | null;
  activeDecisionExplanation: DecisionExplanation | null;

  // Drawer & Modal visibility toggles
  isPatientDrawerOpen: boolean;
  isAmbulanceDrawerOpen: boolean;
  isHospitalDrawerOpen: boolean;
  isDecisionDrawerOpen: boolean;
  isLedgerDrawerOpen: boolean;
  isFundDrawerOpen: boolean;
  isOverrideModalOpen: boolean;
  overrideTarget: { type: 'patient' | 'ambulance' | 'allocation'; id: string; title: string } | null;

  // Map state
  mapFilters: MapFilters;
  toggleMapFilter: (key: keyof MapFilters) => void;

  // Simulator state
  simulation: SimulationState;
  simulationTimeline: SimulationEvent[];
  triggerDisruptor: (type: 'block_bridge' | 'fill_icu' | 'casualty_surge' | 'blood_shortage' | 'ambulance_breakdown') => void;
  resetSimulation: () => void;
  setScenario: (scenario: 'flood_surge' | 'casualty_surge' | 'earthquake' | 'urban_fire') => void;

  // Selection actions
  selectPatient: (patient: Patient | null) => void;
  selectAmbulance: (ambulance: Ambulance | null) => void;
  selectHospital: (hospital: Hospital | null) => void;
  selectAllocation: (allocation: Allocation | null) => void;
  selectLedgerBlock: (block: LedgerBlock | null) => void;
  selectFundTransfer: (transfer: FundTransfer | null) => void;
  openDecisionExplanation: (patientId?: string) => void;
  closeAllDrawers: () => void;
  
  // Alert actions
  acknowledgeAlert: (alertId: string) => void;
  
  // Override Modal actions
  openOverrideModal: (target: { type: 'patient' | 'ambulance' | 'allocation'; id: string; title: string }) => void;
  closeOverrideModal: () => void;
  confirmOverride: (reason: string) => void;

  // Ledger verification action
  verifyLedgerBlock: (blockNumber: number) => void;
}

const initialSimulation: SimulationState = {
  isRunning: true,
  scenarioPreset: 'flood_surge',
  scenarioName: 'Flood Surge',
  severityLabel: 'High Severity',
  description: 'Monsoon Flash Flood in M-East Ward with arterial bridge collapse & rapid casualty accumulation along coastal routes.',
  patientsInQueue: 37,
  fleetActive: 18,
  fleetStaging: 7,
  hospitalsActive: 5,
  bloodReservesUnits: 300,
  bridgeB12Blocked: true,
  apexIcuFull: true,
  casualtySurgeActive: false,
  bloodShortageActive: false,
  ambulanceBreakdownActive: false,
  optimizerStatus: 'Optimal',
};

export const useAppStore = create<AppStore>((set, get) => ({
  operator: {
    name: 'Op. Sharma',
    callsign: 'Unit 04',
    unit: 'Control Room Unit 04',
    zone: 'Mumbai Zone',
    role: 'Tier 1 Incident Commander',
    email: 'op.sharma.u04@emergency.resq.gov.in',
    terminalId: 'MUM-CTRL-T04',
    systemStatus: 'Healthy',
  },

  patients: mockPatients,
  ambulances: mockAmbulances,
  hospitals: mockHospitals,
  alerts: mockAlerts,
  allocations: mockAllocations,
  ledgerBlocks: mockLedgerBlocks,
  fundTransfers: mockFundTransfers,

  selectedPatient: mockPatients[0],
  selectedAmbulance: mockAmbulances[2],
  selectedHospital: mockHospitals[1],
  selectedAllocation: mockAllocations[0],
  selectedLedgerBlock: mockLedgerBlocks[0],
  selectedFundTransfer: mockFundTransfers[0],
  activeDecisionExplanation: mockDecisionExplanation['P-7F3A'],

  isPatientDrawerOpen: false,
  isAmbulanceDrawerOpen: false,
  isHospitalDrawerOpen: false,
  isDecisionDrawerOpen: false,
  isLedgerDrawerOpen: false,
  isFundDrawerOpen: false,
  isOverrideModalOpen: false,
  overrideTarget: null,

  mapFilters: {
    showPatients: true,
    showAmbulances: true,
    showHospitals: true,
    showTraffic: true,
    showRoutes: true,
  },

  toggleMapFilter: (key) =>
    set((state) => ({
      mapFilters: {
        ...state.mapFilters,
        [key]: !state.mapFilters[key],
      },
    })),

  simulation: initialSimulation,
  simulationTimeline: mockSimulationTimeline,

  triggerDisruptor: (type) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    // Set optimizer to "Re-optimizing..."
    set((state) => ({
      simulation: {
        ...state.simulation,
        optimizerStatus: 'Re-optimizing...',
      },
    }));

    if (type === 'block_bridge') {
      const isNowBlocked = !get().simulation.bridgeB12Blocked;
      const newAlert: Alert = {
        id: `ALT-${Date.now()}`,
        title: isNowBlocked ? '⚡ Bridge B12 Inundation Triggered' : 'Bridge B12 Cleared & Open',
        description: isNowBlocked
          ? 'Santacruz-Chembur artery cut off by 1.4m standing water. Emergency detours enforced.'
          : 'Hazard cleared. Normal arterial flow restored.',
        severity: isNowBlocked ? 'critical' : 'info',
        category: 'Infrastructure',
        timestamp,
        timeAgo: 'Just now',
        acknowledged: false,
      };

      const newEvent: SimulationEvent = {
        id: `EVT-${Date.now()}`,
        timestamp,
        title: isNowBlocked ? 'Disruptor: Bridge B12 Blocked' : 'Hazard Removed: Bridge B12 Restored',
        description: isNowBlocked
          ? 'Automated routing solver triggered dynamic avoidance; diverted AMB-04 and AMB-12.'
          : 'Original fastest travel corridors reactivated.',
        severity: isNowBlocked ? 'critical' : 'success',
      };

      set((state) => ({
        alerts: [newAlert, ...state.alerts],
        simulationTimeline: [newEvent, ...state.simulationTimeline],
        simulation: {
          ...state.simulation,
          bridgeB12Blocked: isNowBlocked,
        },
      }));
    } else if (type === 'fill_icu') {
      const isNowFull = !get().simulation.apexIcuFull;
      set((state) => ({
        hospitals: state.hospitals.map((h) =>
          h.id === 'HOSP-01' ? { ...h, availableIcuBeds: isNowFull ? 0 : 4 } : h
        ),
        simulation: {
          ...state.simulation,
          apexIcuFull: isNowFull,
        },
        simulationTimeline: [
          {
            id: `EVT-${Date.now()}`,
            timestamp,
            title: isNowFull ? 'Disruptor: Apex Central ICU Saturated (0 Beds)' : 'Apex ICU Beds Available (+4 Beds)',
            description: isNowFull
              ? 'Triage engine redirected incoming Red patients to Lilavati Trauma Center.'
              : 'Receiving capacity restored at Apex Central ED.',
            severity: isNowFull ? 'warning' : 'success',
          },
          ...state.simulationTimeline,
        ],
      }));
    } else if (type === 'casualty_surge') {
      set((state) => ({
        simulation: {
          ...state.simulation,
          casualtySurgeActive: true,
          patientsInQueue: state.simulation.patientsInQueue + 25,
        },
        simulationTimeline: [
          {
            id: `EVT-${Date.now()}`,
            timestamp,
            title: 'Disruptor: Casualty Surge (+25 Casualties)',
            description: 'Mass casualty incident declared in Sector 4. Field triage staging activated.',
            severity: 'critical',
          },
          ...state.simulationTimeline,
        ],
      }));
    } else if (type === 'blood_shortage') {
      set((state) => ({
        simulation: {
          ...state.simulation,
          bloodShortageActive: true,
          bloodReservesUnits: 120,
        },
        simulationTimeline: [
          {
            id: `EVT-${Date.now()}`,
            timestamp,
            title: 'Disruptor: Acute Blood Shortage Triggered',
            description: 'Universal donor O- reserves dropped below critical margin (8 units). Inter-hospital requisition issued.',
            severity: 'warning',
          },
          ...state.simulationTimeline,
        ],
      }));
    } else if (type === 'ambulance_breakdown') {
      set((state) => ({
        ambulances: state.ambulances.map((a) =>
          a.id === 'AMB-04' ? { ...a, status: 'Maintenance', leadParamedic: 'Standby Mechanical' } : a
        ),
        simulation: {
          ...state.simulation,
          ambulanceBreakdownActive: true,
          fleetActive: Math.max(1, state.simulation.fleetActive - 1),
        },
        simulationTimeline: [
          {
            id: `EVT-${Date.now()}`,
            timestamp,
            title: 'Disruptor: Ambulance AMB-04 Breakdown',
            description: 'Engine transmission failure on Santacruz-Chembur link. Patient P-7F3A re-assigned to AMB-01.',
            severity: 'critical',
          },
          ...state.simulationTimeline,
        ],
      }));
    }

    // After simulated solver delay (600ms), transition to "Allocation Updated"
    setTimeout(() => {
      set((state) => ({
        simulation: {
          ...state.simulation,
          optimizerStatus: 'Allocation Updated',
        },
      }));
    }, 600);
  },

  resetSimulation: () => {
    set({
      simulation: initialSimulation,
      hospitals: mockHospitals,
      ambulances: mockAmbulances,
      patients: mockPatients,
      simulationTimeline: mockSimulationTimeline,
    });
  },

  setScenario: (scenario) => {
    const titles = {
      flood_surge: 'Flood Surge',
      casualty_surge: 'Casualty Surge',
      earthquake: 'Earthquake',
      urban_fire: 'Urban Fire',
    };
    set((state) => ({
      simulation: {
        ...state.simulation,
        scenarioPreset: scenario,
        scenarioName: titles[scenario],
      },
    }));
  },

  selectPatient: (patient) =>
    set({
      selectedPatient: patient,
      isPatientDrawerOpen: Boolean(patient),
    }),

  selectAmbulance: (ambulance) =>
    set({
      selectedAmbulance: ambulance,
      isAmbulanceDrawerOpen: Boolean(ambulance),
    }),

  selectHospital: (hospital) =>
    set({
      selectedHospital: hospital,
      isHospitalDrawerOpen: Boolean(hospital),
    }),

  selectAllocation: (allocation) =>
    set({
      selectedAllocation: allocation,
    }),

  selectLedgerBlock: (block) =>
    set({
      selectedLedgerBlock: block,
      isLedgerDrawerOpen: Boolean(block),
    }),

  selectFundTransfer: (transfer) =>
    set({
      selectedFundTransfer: transfer,
      isFundDrawerOpen: Boolean(transfer),
    }),

  openDecisionExplanation: (patientId = 'P-7F3A') => {
    const explanation = mockDecisionExplanation[patientId] || mockDecisionExplanation['P-7F3A'];
    set({
      activeDecisionExplanation: explanation,
      isDecisionDrawerOpen: true,
    });
  },

  closeAllDrawers: () =>
    set({
      isPatientDrawerOpen: false,
      isAmbulanceDrawerOpen: false,
      isHospitalDrawerOpen: false,
      isDecisionDrawerOpen: false,
      isLedgerDrawerOpen: false,
      isFundDrawerOpen: false,
    }),

  acknowledgeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a)),
    })),

  openOverrideModal: (target) =>
    set({
      isOverrideModalOpen: true,
      overrideTarget: target,
    }),

  closeOverrideModal: () =>
    set({
      isOverrideModalOpen: false,
      overrideTarget: null,
    }),

  confirmOverride: (reason) => {
    const { overrideTarget, simulationTimeline } = get();
    if (!overrideTarget) return;

    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newEvent: SimulationEvent = {
      id: `EVT-${Date.now()}`,
      timestamp,
      title: `Manual Supervisory Override (${overrideTarget.id})`,
      description: `Reason: ${reason || 'Command room operator manual intervention.'} Authorized by Op. Sharma.`,
      severity: 'warning',
    };

    set({
      simulationTimeline: [newEvent, ...simulationTimeline],
      isOverrideModalOpen: false,
      overrideTarget: null,
    });
  },

  verifyLedgerBlock: (blockNumber) => {
    set((state) => ({
      ledgerBlocks: state.ledgerBlocks.map((b) =>
        b.blockNumber === blockNumber ? { ...b, verified: true } : b
      ),
    }));
  },
}));
