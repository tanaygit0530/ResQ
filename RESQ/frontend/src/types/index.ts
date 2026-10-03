export type TriageSeverity = 'Critical' | 'Urgent' | 'Delayed' | 'Expectant';
export type PatientStatus = 'Waiting' | 'Allocated' | 'In Transit' | 'Admitted' | 'Discharged';
export type AmbulanceStatus = 'En Route' | 'At Scene' | 'Transporting' | 'Available' | 'Maintenance' | 'Staging';
export type AmbulanceType = 'ALS Type II' | 'ALS Type I' | 'BLS' | 'Critical Mobile ICU' | 'Air Evac';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Patient {
  id: string; // e.g. P-7F3A
  triageSeverity: TriageSeverity;
  status: PatientStatus;
  injury: string;
  location: string;
  coordinates: [number, number]; // [lat, lng] or [x, y]
  vitals: {
    spo2: number;
    bp: string;
    pulse: number;
    gcs: number;
    respirationRate?: number;
  };
  assignedAmbulanceId?: string;
  assignedHospitalId?: string;
  registeredTime: string;
  etaMinutes?: number;
  notes?: string;
}

export interface Ambulance {
  id: string; // e.g. AMB-04
  callsign: string;
  type: AmbulanceType;
  status: AmbulanceStatus;
  leadParamedic: string;
  driver: string;
  currentLocation: string;
  coordinates: [number, number];
  fuelPercentage: number;
  assignedPatientId?: string;
  destinationHospitalId?: string;
  etaMinutes?: number;
  telemetry: {
    speedKmh: number;
    oxygenLevelPct: number;
    batteryPct: number;
  };
}

export interface Hospital {
  id: string; // e.g. Lilavati Trauma Center
  name: string;
  shortName: string;
  level: string; // Level 1 Trauma Center, etc.
  address: string;
  coordinates: [number, number];
  totalIcuBeds: number;
  availableIcuBeds: number;
  totalGeneralBeds: number;
  availableGeneralBeds: number;
  bloodUnits: number;
  surgeCapability: boolean;
  contactNumber: string;
  specialties: string[];
}

export interface RoadSegment {
  id: string;
  name: string;
  status: 'Open' | 'Congested' | 'Blocked';
  coordinates: [number, number][];
  hazardDescription?: string;
  speedLimitKmh: number;
  estimatedDelayMinutes: number;
}

export interface BloodInventory {
  type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  unitsAvailable: number;
  unitsReserved: number;
  criticalThreshold: number;
  status: 'Surplus' | 'Adequate' | 'Low' | 'Critical';
  hospitalDistribution: {
    hospitalId: string;
    hospitalName: string;
    units: number;
  }[];
}

export interface Medicine {
  id: string;
  name: string;
  category: 'Anesthetic' | 'Antibiotic' | 'Trauma Care' | 'Respiratory' | 'Cardiovascular';
  stockCount: number;
  unit: string;
  minimumRequired: number;
  expiryDate: string;
  urgency: 'Sufficient' | 'Low' | 'Deficit';
}

export interface ResourceCategory {
  id: string;
  name: string;
  totalCount: number;
  deployedCount: number;
  availableCount: number;
  unit: string;
}

export interface DecisionExplanation {
  patientId: string;
  patientSeverity: string;
  ambulanceId: string;
  ambulanceType: string;
  hospitalId: string;
  hospitalName: string;
  globalScore: number;
  etaMinutes: number;
  optimalTransitText: string;
  factors: {
    name: string;
    score: number;
    weight: string;
    color: string;
    reason: string;
  }[];
  alternativesConsidered: {
    hospitalName: string;
    score: number;
    deltaMinutes: number;
    rejectionReason: string;
  }[];
  mathematicalProof: {
    solverType: string;
    iterations: number;
    optimalityGap: string;
    shadowPrice: string;
  };
}

export interface Allocation {
  id: string;
  timestamp: string;
  patientId: string;
  severity: TriageSeverity;
  ambulanceId: string;
  hospitalId: string;
  hospitalName: string;
  score: number;
  etaMinutes: number;
  status: 'En Route' | 'Dispatched' | 'Completed' | 'Pending Override';
  decisionExplanation: DecisionExplanation;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: 'Infrastructure' | 'Medical Capacity' | 'Triage Queue' | 'Fleet';
  timestamp: string;
  timeAgo: string;
  acknowledged: boolean;
  actionLabel?: string;
  actionTarget?: string;
}

export interface LedgerBlock {
  blockNumber: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  actionType: 'Patient Dispatch' | 'Fund Disbursement' | 'ICU Reallocation' | 'Emergency Aid' | 'Medical Restock';
  entity: string;
  transactionCount: number;
  validator: string;
  signature: string;
  verified: boolean;
  payloadSummary: string;
  details: {
    sender: string;
    recipient: string;
    amountOrAsset: string;
    auditProof: string;
    timestampUtc: string;
  };
}

export interface FundTransfer {
  id: string;
  stageName: string;
  organization: string;
  role: string;
  allocatedAmountInr: number;
  utilizedAmountInr: number;
  balanceAmountInr: number;
  percentageDeployed: number;
  status: 'Verified & Audited' | 'In Transit' | 'Pending Multi-Sig';
  lastTxHash: string;
  beneficiariesCount: number;
  timestamp: string;
}

export interface SimulationState {
  isRunning: boolean;
  scenarioPreset: 'flood_surge' | 'casualty_surge' | 'earthquake' | 'urban_fire';
  scenarioName: string;
  severityLabel: string;
  description: string;
  patientsInQueue: number;
  fleetActive: number;
  fleetStaging: number;
  hospitalsActive: number;
  bloodReservesUnits: number;
  bridgeB12Blocked: boolean;
  apexIcuFull: boolean;
  casualtySurgeActive: boolean;
  bloodShortageActive: boolean;
  ambulanceBreakdownActive: boolean;
  optimizerStatus: 'Optimal' | 'Re-optimizing...' | 'Allocation Updated' | 'Paused';
}

export interface SimulationEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
}

export interface SystemHealthMetric {
  serviceName: string;
  status: 'Healthy' | 'Degraded' | 'Offline';
  latencyMs: number;
  uptimePct: number;
  details: string;
}
