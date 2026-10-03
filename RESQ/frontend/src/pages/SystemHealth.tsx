import React from 'react';
import { useAppStore } from '../stores/appStore';

export const SystemHealthPage: React.FC = () => {
  const { operator } = useAppStore();

  const services = [
    {
      name: 'Deterministic MILP Optimization Engine',
      status: 'Operational',
      uptime: '99.98%',
      latency: '34 ms',
      details: 'Dual branch-and-cut threads running at optimal convergence.',
    },
    {
      name: 'Geospatial Routing & OSMnx Network Graph',
      status: 'Operational',
      uptime: '100.00%',
      latency: '18 ms',
      details: 'Mumbai arterial network graph loaded with dynamic edge penalties.',
    },
    {
      name: 'SHA-256 Ledger & Ed25519 Consensus Relays',
      status: 'Operational',
      uptime: '99.95%',
      latency: '62 ms',
      details: '12/12 peer validation quorum confirmed with zero blockchain forks.',
    },
    {
      name: 'Emergency Telemetry WebSocket Cluster',
      status: 'Operational',
      uptime: '99.99%',
      latency: '8 ms',
      details: 'Active bidirectional socket pipes connected to 25 field ambulances.',
    },
    {
      name: 'Central Hospital EHR & Bed Availability Sync',
      status: 'Operational',
      uptime: '99.89%',
      latency: '124 ms',
      details: 'Continuous HL7/FHIR polling across 6 receiving trauma hubs.',
    },
  ];

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              System Infrastructure &amp; Health
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              All Systems Nominal
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Mission control telemetry, microservices heartbeat status, and node consensus latency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-code-sm text-code-sm">
            Terminal: <strong>{operator.terminalId}</strong>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">Solver Latency</span>
          <span className="font-display-lg font-bold text-primary mt-1 block">34 ms</span>
          <span className="text-[11px] text-emerald-600 font-semibold">Sub-second real-time</span>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">Active Peers</span>
          <span className="font-display-lg font-bold text-on-surface mt-1 block">12 / 12</span>
          <span className="text-[11px] text-secondary font-semibold">Full Byzantine Quorum</span>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">Memory Footprint</span>
          <span className="font-display-lg font-bold text-on-surface mt-1 block">284 MB</span>
          <span className="text-[11px] text-outline">Optimized C++ binary bindings</span>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">Uptime Ratio</span>
          <span className="font-display-lg font-bold text-emerald-600 mt-1 block">99.99%</span>
          <span className="text-[11px] text-outline">Zero fatal dropouts</span>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-space-md border-b border-outline-variant/30">
          <h2 className="font-headline-sm font-bold text-on-surface">Core Microservices Registry</h2>
        </div>
        <div className="divide-y divide-outline-variant/20">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                  task_alt
                </span>
                <div>
                  <h3 className="font-headline-sm text-[15px] font-semibold text-on-surface">
                    {svc.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {svc.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-code-sm text-code-sm text-right shrink-0">
                <div>
                  <span className="text-[10px] text-outline uppercase block">Latency</span>
                  <span className="font-bold text-primary">{svc.latency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase block">Uptime</span>
                  <span className="font-bold text-emerald-600">{svc.uptime}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-label-sm text-xs font-semibold">
                  {svc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
