# RESQ — Intelligent Disaster Relief Resource Allocation

## Purpose
Dynamic disaster-response allocation of patients, ambulances, hospitals, medical resources and emergency funds with transparent verification.

## Current Stage
Frontend prototype converted from Google Stitch export into an extensible, production-ready full-stack project architecture. Original Stitch visual design, typography, color palettes, micro-interactions, and operational density are 100% preserved.

---

## Technology Stack

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Operational Clarity Design System tokens from Stitch)
- **Icons**: Lucide React & Google Material Symbols Outlined
- **Routing**: React Router v6
- **Maps**: Interactive Tactical Disaster Canvas & React Leaflet
- **Charts**: Recharts
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (with mock service layer ready for FastAPI)

### Backend (Future Integration)
- **Framework**: FastAPI
- **WebSockets**: Real-time telemetry broadcasting
- **Validation**: Pydantic v2

### Optimization Engine (Future Integration)
- **Language**: Python 3.11+
- **Graph Modeling**: NetworkX & OSMnx
- **Solver**: OR-Tools (Mixed-Integer Linear Programming / Simplex Flow)

### Database (Future Integration)
- **RDBMS**: PostgreSQL 16
- **Driver**: asyncpg / SQLAlchemy

### Transparent Ledger (Future Integration)
- **Hash Integrity**: SHA-256 Hash Chain
- **Digital Signatures**: Ed25519 Authority Keypairs
- **Audit**: Zero-Knowledge PII Sanitization

---

## High-Level Project Structure

```text
RESQ/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Sidebar, TopBar, AppLayout
│   │   │   ├── dashboard/    # KpiCard, CriticalAttention, AllocationPerformance, OptimizationStatus
│   │   │   ├── map/          # DisasterMap, MapLegend, Markers, RouteLayer, BlockedRoadLayer
│   │   │   ├── patients/     # PatientTable, PatientDrawer, SeverityBadge
│   │   │   ├── ambulances/   # AmbulanceTable, AmbulanceDrawer, AmbulanceStatusBadge
│   │   │   ├── hospitals/    # HospitalCard, HospitalTable, HospitalDrawer, CapacityBar
│   │   │   ├── resources/    # ResourceCard, BloodInventory, MedicineTable, FundSummary
│   │   │   ├── allocation/   # AllocationTable, DecisionDrawer, DecisionFactors, AllocationStatus
│   │   │   ├── alerts/       # AlertCard, AlertList, AlertBadge
│   │   │   ├── ledger/       # LedgerTimeline, LedgerEntry, LedgerDetailDrawer, VerificationStatus
│   │   │   ├── funds/        # FundFlow, TransferCard, TransferDetail
│   │   │   ├── simulator/    # ScenarioSelector, SimulationControls, EventControls, SimulationTimeline
│   │   │   └── analytics/    # BenchmarkChart, MetricCard, PerformanceSummary
│   │   ├── pages/            # 15 React routes matching all Stitch screens
│   │   ├── layouts/          # AppLayout (Control Room) & PublicLayout (Citizen Portal)
│   │   ├── services/         # Mock API abstraction layer (ready for FastAPI)
│   │   ├── stores/           # Zustand client state (appStore.ts)
│   │   ├── types/            # Strongly typed TypeScript domain models
│   │   └── utils/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                  # FastAPI skeleton and route stubs
├── engine/                   # NetworkX / OR-Tools optimization engine stubs
├── simulator/                # Scenario generator and disruptor event manager stubs
├── ledger/                   # SHA-256 & Ed25519 verification chain stubs
├── database/                 # Migrations and seed scripts
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### 1. Run Frontend

```bash
cd RESQ/frontend
npm install
npm run dev
```

The frontend control room will be available at:
`http://localhost:5173/overview`

And the public emergency portal at:
`http://localhost:5173/public`

### 2. Run Backend Placeholder

```bash
cd RESQ/backend
pip install -r requirements.txt
python app/main.py
```

FastAPI server runs on `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

---

## Active Operational Routes

- `/overview` — Disaster Operations Center & 5-Column KPI strip
- `/live` — Live Tactical Operations & Interactive Vector Map
- `/patients` — Triage Queue, Patient Table & Detail Drawer
- `/ambulances` — Fleet Telemetry & Unit Tracking Drawer
- `/hospitals` — Receiving Hubs & ICU Capacity Bars
- `/resources` — Blood Readiness Grid, Medical Supplies & Logistics
- `/allocations` — Dynamic Multi-Objective Assignment & "Why?" XAI Drawer
- `/alerts` — Active Critical Incident & Infrastructure Alerts
- `/ledger` — Cryptographic Hash Chain Audit & Verification
- `/funds` — End-to-End Verifiable Relief Fund Progression
- `/simulator` — Interactive Disaster Simulator & Live Disruptors
- `/analytics` — Benchmark Model Comparisons & CI Error Bounds
- `/system-health` — Infrastructure Health, Telemetry & Heartbeat
- `/settings` — Station Credentials & Operational Thresholds
- `/public` — Citizen Emergency Portal (SOS relays & verified updates)
