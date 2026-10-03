import React, { useState } from 'react';
import { BloodInventoryGrid } from '../components/resources/BloodInventory';
import { MedicineTable } from '../components/resources/MedicineTable';
import { FundSummary } from '../components/resources/FundSummary';
import { ResourceCard } from '../components/resources/ResourceCard';

export const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blood' | 'medicines' | 'funds' | 'equipment'>('blood');

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Emergency Resource Management
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Live Stock Feed
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Real-time blood bank units, critical pharmaceutical stocks, surgical gear, and cryptographic fund tracking.
          </p>
        </div>

        {/* Resource Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-lg overflow-x-auto">
          <button
            onClick={() => setActiveTab('blood')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'blood'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary">bloodtype</span>
            <span>Blood Reserves</span>
          </button>

          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'medicines'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">medication</span>
            <span>Medicines</span>
          </button>

          <button
            onClick={() => setActiveTab('funds')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'funds'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span>Relief Funds</span>
          </button>

          <button
            onClick={() => setActiveTab('equipment')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'equipment'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">medical_services</span>
            <span>Critical Gear</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Blood Reserves */}
      {activeTab === 'blood' && (
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm font-bold text-on-surface">
              Trauma Transfusion Readiness Grid
            </h2>
            <span className="text-xs text-outline font-code-sm">
              Live Bank Sync: KEM &amp; Lilavati Centers
            </span>
          </div>
          <BloodInventoryGrid />
        </div>
      )}

      {/* Tab 2: Medicines */}
      {activeTab === 'medicines' && (
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm font-bold text-on-surface">
              Pharmaceutical &amp; Surgical Inventory
            </h2>
            <span className="text-xs text-outline font-code-sm">
              Critical care buffer threshold: 48h emergency reserve
            </span>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <MedicineTable />
          </div>
        </div>
      )}

      {/* Tab 3: Funds */}
      {activeTab === 'funds' && <FundSummary />}

      {/* Tab 4: Critical Gear */}
      {activeTab === 'equipment' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <ResourceCard
            title="Invasive Ventilators"
            total={45}
            deployed={38}
            unit="units"
            icon="respiratory_rate"
          />
          <ResourceCard
            title="Cardiac Defibrillators"
            total={60}
            deployed={42}
            unit="units"
            icon="ecg_heart"
          />
          <ResourceCard
            title="Rapid Thoracotomy Kits"
            total={25}
            deployed={18}
            unit="kits"
            icon="medical_information"
          />
          <ResourceCard
            title="Field Oxygen Cylinders"
            total={150}
            deployed={112}
            unit="cylinders"
            icon="propane_tank"
          />
        </div>
      )}
    </div>
  );
};
