import React, { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { HospitalCard } from '../components/hospitals/HospitalCard';
import { HospitalTable } from '../components/hospitals/HospitalTable';

export const HospitalsPage: React.FC = () => {
  const { hospitals, selectHospital } = useAppStore();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const totalIcu = hospitals.reduce((acc, h) => acc + h.totalIcuBeds, 0);
  const freeIcu = hospitals.reduce((acc, h) => acc + h.availableIcuBeds, 0);
  const totalBeds = hospitals.reduce((acc, h) => acc + h.totalGeneralBeds, 0);
  const freeBeds = hospitals.reduce((acc, h) => acc + h.availableGeneralBeds, 0);

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Receiving Hospital Capacity
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Emergency Hubs
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Real-time critical care bed telemetry, surgical bay availability, and dynamic diversion avoidance.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-lg">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1 ${
              viewMode === 'cards'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1 ${
              viewMode === 'table'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">view_list</span>
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Aggregate Capacity Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">Total ICU Beds</span>
          <span className="font-display-lg font-bold text-on-surface block mt-1">{totalIcu}</span>
          <span className="text-[11px] text-outline">Across {hospitals.length} receiving hubs</span>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">Available ICU Beds</span>
          <span className={`font-display-lg font-bold block mt-1 ${freeIcu <= 8 ? 'text-tertiary' : 'text-primary'}`}>
            {freeIcu}
          </span>
          <span className="text-[11px] text-tertiary font-semibold">{freeIcu <= 8 ? 'Critical Deficit' : 'Operational'}</span>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">General Ward Beds</span>
          <span className="font-display-lg font-bold text-on-surface block mt-1">{totalBeds}</span>
          <span className="text-[11px] text-outline">Trauma surge capacity</span>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <span className="font-label-sm text-outline uppercase font-semibold block">Available Ward Beds</span>
          <span className="font-display-lg font-bold text-primary block mt-1">{freeBeds}</span>
          <span className="text-[11px] text-emerald-600 font-semibold">Active Resuscitation</span>
        </div>
      </div>

      {/* Hospital Views */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {hospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onClick={() => selectHospital(hospital)}
            />
          ))}
        </div>
      ) : (
        <HospitalTable />
      )}
    </div>
  );
};
