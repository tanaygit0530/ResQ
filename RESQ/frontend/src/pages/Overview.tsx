import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { KpiCard } from '../components/dashboard/KpiCard';
import { DisasterMap } from '../components/map/DisasterMap';
import { CriticalAttention } from '../components/dashboard/CriticalAttention';
import { AllocationPerformance } from '../components/dashboard/AllocationPerformance';
import { OptimizationStatus } from '../components/dashboard/OptimizationStatus';

export const OverviewPage: React.FC = () => {
  const { patients, ambulances, hospitals, alerts, simulation } = useAppStore();

  const criticalCount = patients.filter((p) => p.triageSeverity === 'Critical').length;
  const waitingCount = simulation.patientsInQueue;
  const activeFleet = simulation.fleetActive;
  const totalFleet = simulation.fleetActive + simulation.fleetStaging + 16;
  const freeIcu = hospitals.reduce((acc, h) => acc + h.availableIcuBeds, 0);
  const activeAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="flex flex-col w-full space-y-space-lg">
      {/* Page Header & Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Disaster Operations
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
              Active Cycle #884
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Live overview of emergency response, tactical routing, and field resource allocation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
              System Healthy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/30 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-outline">timer</span>
            <span className="font-body-sm text-body-sm">
              Last optimized:{' '}
              <span className="font-code-sm text-code-sm font-semibold text-on-surface">
                14:32:08
              </span>
            </span>
          </div>

          <Link
            to="/live"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary transition-all"
          >
            <span>Open Live Operations</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* 5-Column Compact KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-space-md">
        <KpiCard
          title="Critical Patients"
          value={criticalCount}
          badgeText="+3 in last 10m"
          badgeType="error"
          icon="warning"
          iconBgColor="bg-error-container/60"
          iconColor="text-tertiary"
          trendText="Immediate evacuation req."
        />

        <KpiCard
          title="Waiting Patients"
          value={waitingCount}
          subtext="In field staging"
          icon="schedule"
          iconBgColor="bg-surface-container"
          iconColor="text-primary"
          trendIcon="trending_down"
          trendText="Triage queue avg 4.2m"
        />

        <KpiCard
          title="Ambulance Fleet"
          value={activeFleet}
          subtext={`/ ${totalFleet}`}
          icon="airport_shuttle"
          iconBgColor="bg-secondary-fixed"
          iconColor="text-secondary"
          trendText="44% fleet operational"
          footerText="23 En Route"
        />

        <KpiCard
          title="Available ICU Beds"
          value={freeIcu}
          badgeText={freeIcu <= 8 ? 'Critical Deficit' : 'Adequate'}
          badgeType="warning"
          icon="bed"
          iconBgColor="bg-surface-container-high"
          iconColor="text-primary"
          trendText={`Across ${hospitals.length} receiving hubs`}
        />

        <KpiCard
          title="Active Alerts"
          value={activeAlertsCount}
          badgeText="Immediate attention"
          badgeType="error"
          icon="notifications_active"
          iconBgColor="bg-error-container"
          iconColor="text-tertiary"
          trendText="2 critical · 1 warn · 1 info"
        />
      </div>

      {/* Main Operational Viewport: Split 65% Map / 35% Incident Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <DisasterMap heightClass="h-[580px]" showFilters={true} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <CriticalAttention />
        </div>
      </div>

      {/* Bottom Section: Performance Telemetry & Optimization Status (60% / 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <AllocationPerformance />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <OptimizationStatus />
        </div>
      </div>
    </div>
  );
};
