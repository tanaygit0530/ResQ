import React from 'react';
import { useAppStore } from '../stores/appStore';

export const PublicPortalPage: React.FC = () => {
  const { hospitals, simulation } = useAppStore();

  return (
    <div className="flex flex-col w-full">
      {/* Critical Public Emergency Notification Ribbon */}
      <section className="w-full bg-surface-container-high px-margin-desktop py-space-md border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
            </span>
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-md text-label-md text-on-surface uppercase tracking-wide font-bold">
                Status: Active Civil Response
              </span>
              <span className="text-outline hidden sm:inline">•</span>
              <span className="font-body-md text-body-md text-on-surface-variant truncate">
                Greater Mumbai Metropolitan Area &amp; Coastal Sectors
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <span className="font-code-sm text-code-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">sync</span>
              Verified live feed: <strong className="text-on-surface">Updated 2m ago</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Hero & Citizen Immediate Helpline Hub */}
      <section className="w-full px-margin-desktop py-space-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">shield</span> Public Transparency Tier 1
                </span>
                <span className="px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Zero PII Guaranteed
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
                Emergency Response Status
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Live verified public updates on relief logistics, medical facility readiness, and aggregate assistance metrics. All data is sanitized to protect citizen privacy and verified via decentralized civil audit ledgers.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-[18px]">lock_reset</span>
                  <span>Anonymized Triage Aggregates</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>Decentralized Ledger Block #1284</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                  <span>Real-Time Regional Polling</span>
                </div>
              </div>
            </div>

            {/* Immediate SOS Action Card */}
            <div className="lg:col-span-4 bg-tertiary text-on-tertiary rounded-2xl p-space-lg shadow-lg flex flex-col justify-between gap-space-md">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-90 font-semibold">
                    Immediate Danger or Trauma
                  </span>
                  <span className="font-headline-md text-headline-md leading-tight mt-1 font-bold">
                    Life Safety Helplines
                  </span>
                </div>
                <span className="p-2 rounded-lg bg-tertiary-container text-on-tertiary-container">
                  <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
                </span>
              </div>
              <p className="font-body-sm text-body-sm opacity-90 leading-snug">
                In immediate danger? Connect to central dispatch relays for evacuation, direct ambulance routing, and rapid water rescue.
              </p>
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <a
                  className="w-full py-2.5 px-space-md rounded-lg bg-surface-container-lowest text-tertiary font-headline-sm text-headline-sm flex items-center justify-between hover:bg-surface-container-low transition-colors font-bold shadow-sm"
                  href="tel:112"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                    National Helpline: 112
                  </span>
                  <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">
                    Toll-Free
                  </span>
                </a>
                <a
                  className="w-full py-2 px-space-md rounded-lg bg-tertiary-container text-on-tertiary font-body-md text-body-md flex items-center justify-between hover:opacity-90 transition-opacity font-semibold"
                  href="tel:18007377000"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    RESQ Rapid Relay: 1800-737-7000
                  </span>
                  <span className="font-code-sm text-code-sm opacity-80">24/7 Multi-Lingual</span>
                </a>
              </div>
            </div>
          </div>

          {/* 6 Key Public Telemetry Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter pt-space-xs">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Response Status
              </span>
              <div className="flex flex-col">
                <span className="font-headline-lg font-bold text-on-surface">Active</span>
                <span className="font-code-sm text-secondary font-semibold">Level 2 Emergency</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Sector coordination on
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Citizens Assisted
              </span>
              <div className="flex flex-col">
                <span className="font-headline-lg font-bold text-on-surface">1,248</span>
                <span className="font-code-sm text-primary font-semibold">+114 last 60m</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Across 6 relief sectors
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Emergency Hubs
              </span>
              <div className="flex flex-col">
                <span className="font-headline-lg font-bold text-on-surface">{hospitals.length}</span>
                <span className="font-code-sm text-secondary font-semibold">Level 1-2 Facilities</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Trauma bays active
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Blood Reserves
              </span>
              <div className="flex flex-col">
                <span className="font-headline-lg font-bold text-on-surface">
                  {simulation.bloodReservesUnits}
                </span>
                <span className="font-code-sm text-tertiary font-semibold">Units In Grid</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Central blood banks
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Avg Response ETA
              </span>
              <div className="flex flex-col">
                <span className="font-headline-lg font-bold text-primary">8.2 min</span>
                <span className="font-code-sm text-emerald-600 font-semibold">-24% optimized</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Deterministic dispatch
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Audit Verification
              </span>
              <div className="flex flex-col">
                <span className="font-headline-lg font-bold text-emerald-600">100%</span>
                <span className="font-code-sm text-secondary font-semibold">Block #1284 Verified</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Immutable ledger seal
              </span>
            </div>
          </div>

          {/* Hospital Readiness Section */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <h2 className="font-headline-md font-bold text-on-surface">
                Hospital Emergency Bay Availability
              </h2>
              <span className="text-xs text-outline font-code-sm">
                Sanitized Real-time Feed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {hospitals.map((hosp) => (
                <div
                  key={hosp.id}
                  className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between gap-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-sm font-bold text-on-surface">{hosp.name}</h3>
                      <p className="text-xs text-outline">{hosp.address}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        hosp.availableIcuBeds === 0
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {hosp.availableIcuBeds === 0 ? 'Full' : 'Open'}
                    </span>
                  </div>

                  <div className="mt-2 text-body-sm">
                    <span className="text-on-surface-variant">General Capacity: </span>
                    <strong className="text-on-surface">{hosp.availableGeneralBeds} free beds</strong>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                    <span className="text-outline">Emergency Direct:</span>
                    <a href={`tel:${hosp.contactNumber}`} className="text-primary font-semibold hover:underline">
                      {hosp.contactNumber}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
