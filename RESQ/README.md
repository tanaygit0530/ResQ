# 🚨 RESQ — Intelligent Disaster Relief & Emergency Response Center

> **Real-time, AI-optimized dispatch and cryptographically verifiable resource allocation for disaster zones.**

[![Status](https://img.shields.io/badge/Status-Active_Prototype-emerald?style=flat-square)](https://github.com/)
[![React](https://img.shields.io/badge/Frontend-React_18_%2B_Vite_%2B_TypeScript-blue?style=flat-square)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_%2B_Python_3.11-009688?style=flat-square)](https://fastapi.tiangolo.com/)
[![Optimization](https://img.shields.io/badge/Engine-OR--Tools_%2B_NetworkX-orange?style=flat-square)](https://developers.google.com/optimization)
[![Ledger](https://img.shields.io/badge/Audit-SHA--256_Hash_Chain_%2B_Ed25519-purple?style=flat-square)](https://en.wikipedia.org/wiki/Hash_chain)

---

## 📌 Project Overview (In Simple Words)

When a major disaster strikes (earthquake, flood, explosion), emergency services are overwhelmed:
- Phone lines jam, and emergency responders don't know who needs help first.
- Ambulances get stuck on collapsed roads or carry patients to overcrowded hospitals.
- Supplies and emergency relief funds get delayed or lost without accountability.

**RESQ is a smart, unified command center that connects victims, ambulances, hospitals, and relief resources.** 

1. **Assesses urgency** (Triage: Red / Yellow / Green).
2. **Finds the best path and match** using an AI/MILP optimization engine that factors in blocked roads, hospital bed capacity, and specialized equipment (ICU, burn care, blood reserves).
3. **Explains every decision** with built-in Explainable AI (XAI: *"Why was Hospital B chosen over Hospital A?"*).
4. **Locks every action into a tamper-proof cryptographic ledger** so relief funds and medical supplies are 100% auditable and corruption-free.

---

## 🔄 System Architecture (Flowchart)

```mermaid
flowchart TB
    subgraph Citizens["👥 Public & Victims"]
        SOS["🚨 One-Click SOS / Citizen Portal (/public)"]
        Sensors["📡 Field Sensors & 911 Feeds"]
    end

    subgraph CommandHub["⚡ RESQ Central Platform"]
        Gateway["API Gateway / FastAPI"]
        TriageEngine["🩺 Smart Triage Queue (Red/Yellow/Green)"]
        Optimizer["🧠 Dispatch Optimization Engine (MILP & Graph Routing)"]
        XAIEngine["💡 Explainable AI ('Why?' Decision Analysis)"]
        Ledger["🔒 Cryptographic Audit Chain (SHA-256 + Ed25519)"]
        Sim["🌪️ Disaster Simulator & Stress Injector"]
    end

    subgraph FieldUnits["🚑 Responders & Receiving Facilities"]
        Ambulances["🚑 Ambulance Fleet (GPS Telemetry & Vitals)"]
        Hospitals["🏥 Hospital Hubs (ICU Beds, Oxygen, Blood Reserves)"]
        Supplies["📦 Logistics & Aid Vaults"]
    end

    subgraph OpsDashboard["🖥️ Tactical Command Center"]
        LiveMap["🗺️ Live Disaster Canvas & Road Blockages"]
        OpsControl["📊 KPI Dashboard & Critical Attention Alerts"]
        AuditView["📜 Verifiable Relief Fund & Ledger Viewer"]
    end

    Citizens -->|Emergency Telemetry| Gateway
    Gateway --> TriageEngine
    TriageEngine --> Optimizer
    Optimizer --> XAIEngine
    Optimizer --> Ambulances
    Optimizer --> Hospitals
    Optimizer --> Ledger
    Ambulances -->|Live Location & Status| LiveMap
    Hospitals -->|Bed & Blood Availability| OpsControl
    Ledger --> AuditView
    Sim -.->|Inject Road Collapse / Spikes| Optimizer
```

---

## ⚡ End-to-End Emergency Response Lifecycle (Flowchart)

This flowchart illustrates what happens from the moment an SOS is triggered until the patient is safely admitted to the right hospital:

```mermaid
flowchart TD
    Start(["🚨 SOS Triggered by Citizen or Dispatcher"]) --> Step1["1. Capture GPS Coordinates, Patient Vitals & Critical Condition"]
    Step1 --> Step2["2. Triage Classification (Red = Immediate, Yellow = Urgent, Green = Delayed)"]
    
    Step2 --> Step3{"3. Run Dispatch Optimizer (MILP Algorithm)"}
    
    Step3 -->|Constraint Check 1| CheckRoads["Scan Open Road Network (Exclude Blockages & Flood Zones)"]
    Step3 -->|Constraint Check 2| CheckFleet["Locate Closest Available & Equipped Ambulance"]
    Step3 -->|Constraint Check 3| CheckHospital["Verify Receiving Hospital ICU Beds & Blood Reserves"]
    
    CheckRoads --> Match["4. Generate Optimal Triad Match (Patient ↔ Ambulance ↔ Hospital)"]
    CheckFleet --> Match
    CheckHospital --> Match
    
    Match --> Step4["5. Generate 'Why?' Explanation (Travel Time, Survival Odds, Capacity Delta)"]
    Step4 --> Step5["6. Dispatch Order Broadcast via WebSockets to Ambulance Crew"]
    
    Step5 --> Step6["7. Ambulance Arrives, Stabilizes Patient, and Navigates to Assigned Hospital"]
    Step6 --> Step7["8. Hospital Admission & Handover Complete"]
    
    Step7 --> Step8["9. Record Cryptographic Proof on SHA-256 Hash Chain (Immutable Audit Log)"]
    Step8 --> Finish(["✅ Mission Logged & Resources Released for Next Mission"])
```

---

## 💸 Transparent Relief Fund & Supply Chain Flowchart

RESQ eliminates relief black markets and misallocations by chaining every dollar and medical item cryptographically:

```mermaid
flowchart LR
    Donor["💳 Relief Funds / Donors"] --> Escrow["🏦 Smart Aid Reserve"]
    Escrow --> Trigger{"Resource Request Approved"}
    Trigger -->|Buy Medicines/Fuel| Vendor["💊 Medical / Fuel Logistics"]
    Trigger -->|Direct Patient Aid| Hospital["🏥 Hospital Direct Credit"]
    Vendor --> Signature["🔏 Authority Ed25519 Signature"]
    Hospital --> Signature
    Signature --> Block["🔗 Block Added to Hash Chain (SHA-256)"]
    Block --> PublicProof["🔍 Public Zero-Knowledge Verification Portal"]
```

---

## 🖥️ Operational Modules & Routes

| Screen / Route | Purpose | Key Features |
| :--- | :--- | :--- |
| **`/overview`** | Command HQ | 5-Column operational KPI strip, critical triage queue, active alerts. |
| **`/live`** | Live Tactical Canvas | Interactive vector map with ambulances, blocked roads, and evacuation corridors. |
| **`/patients`** | Triage Queue | Patient list filtered by severity (Red/Yellow/Green), vitals, and wait times. |
| **`/ambulances`** | Fleet Telemetry | Real-time GPS coordinates, crew readiness, onboard equipment, and route status. |
| **`/hospitals`** | Receiving Hubs | ICU bed occupancy, emergency room surge status, and surgical unit availability. |
| **`/resources`** | Logistics & Blood Bank | Blood supply readiness (A+/O-/B+), oxygen cylinder counts, emergency medicines. |
| **`/allocations`** | AI Dispatch & XAI | Multi-objective match table with the **"Why?" drawer** explaining decisions. |
| **`/ledger`** | Cryptographic Audit | SHA-256 chained transaction log with tamper alerts and digital signatures. |
| **`/funds`** | Relief Fund Flow | End-to-end tracing of donor contributions to frontline resource consumption. |
| **`/simulator`** | Chaos & Stress Testing | Inject earthquake aftershocks, bridge collapses, or blackouts to test system response. |
| **`/analytics`** | Benchmark Analytics | Algorithmic comparison (RESQ MILP vs. Greedy Nearest vs. FIFO). |
| **`/public`** | Citizen Emergency Portal | Clean mobile-first interface for public SOS triggers, safe zones, and bulletins. |

---

## 🛠️ Technology Stack

```
Frontend:
  ├── React 18+ & TypeScript
  ├── Vite (Lightning-fast dev build)
  ├── Tailwind CSS (Stitch Operational Clarity Design System)
  ├── React Leaflet & Tactical Canvas
  ├── Lucide React & Material Symbols
  └── Zustand (Reactive state store)

Backend & Engine:
  ├── Python 3.11+ & FastAPI
  ├── NetworkX & OSMnx (Dynamic graph-based road networks)
  ├── Google OR-Tools (Mixed-Integer Linear Programming / Simplex Dispatch)
  └── WebSockets (Live telemetry and dispatch updates)

Verification & Ledger:
  ├── SHA-256 Hash Chaining
  ├── Ed25519 Cryptographic Signatures
  └── Zero-Knowledge PII Sanitization
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python** (3.11+ optional, for backend/engine)

---

### Step 1: Run Frontend (Tactical Command Center)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Launch development server
npm run dev
```

Open your browser at:
- **Operations Command Center**: `http://localhost:5173/overview`
- **Citizen SOS Portal**: `http://localhost:5173/public`

---

### Step 2: Run Backend & Optimization API (Optional)

```bash
# Open a new terminal and navigate to backend
cd backend

# Install Python requirements
pip install -r requirements.txt

# Run FastAPI server
python app/main.py
```

- API Server: `http://localhost:8000`
- Interactive API Docs (Swagger): `http://localhost:8000/docs`

---

## 📂 Repository Directory Layout

```text
RESQ/
├── frontend/             # Complete React 18 + TypeScript + Tailwind UI
│   ├── src/
│   │   ├── components/   # UI components (Map, Triage, Fleet, Ledger, etc.)
│   │   ├── pages/        # 15 Operational routes (Overview, Live, Public, etc.)
│   │   ├── layouts/      # Control Room & Public Portal layouts
│   │   ├── stores/       # Zustand reactive state store
│   │   └── types/        # TypeScript emergency domain interfaces
│   ├── package.json
│   └── vite.config.ts
│
├── backend/              # FastAPI routes, schemas, and WebSocket server
│   ├── app/
│   └── requirements.txt
│
├── engine/               # MILP optimizer, graph routing & scoring algorithms
│   ├── optimizer.py      # OR-Tools resource dispatch formulation
│   ├── routing.py        # Graph routing avoiding blocked roads
│   ├── scoring.py        # Urgency & survival scoring
│   └── baselines.py      # Greedy and FIFO comparison models
│
├── ledger/               # Cryptographic audit & verification chain
│   ├── chain.py          # SHA-256 block chain implementation
│   ├── signing.py        # Ed25519 digital signature signing/verifying
│   └── verify.py         # Integrity validation & tampering detection
│
├── simulator/            # Disaster scenario generation & disruptor events
├── database/             # Database migrations and seed scripts
└── docker-compose.yml    # Containerized deployment orchestration
```
