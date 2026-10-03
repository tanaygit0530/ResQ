import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';
import { CapacityBar } from './CapacityBar';

export const HospitalDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { selectedHospital, isHospitalDrawerOpen, closeAllDrawers } = useAppStore();

  if (!isHospitalDrawerOpen || !selectedHospital) return null;

  return (
    <>
      <div
        onClick={closeAllDrawers}
        className="fixed inset-0 bg-inverse-surface/30 backdrop-blur-[2px] z-50 transition-opacity"
      />
      <div
        aria-modal="true"
        role="dialog"
        className="fixed top-2 bottom-2 right-2 w-[calc(100vw-16px)] sm:w-[500px] max-w-[94vw] bg-surface-container-lowest rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Header Bar */}
        <div className="p-4 bg-surface-container-high/40 flex flex-col gap-2 border-b border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-code-sm text-code-sm uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-on-primary font-bold">
              {selectedHospital.id}
            </span>
            <button
              onClick={closeAllDrawers}
              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-highest transition-colors"
              title="Close Panel"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
              {selectedHospital.name}
            </h2>
            <p className="font-label-sm text-label-sm text-outline mt-0.5">
              {selectedHospital.level}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Capacity Section */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-3">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
              Receiving Capacity Breakdown
            </span>
            <CapacityBar
              available={selectedHospital.availableIcuBeds}
              total={selectedHospital.totalIcuBeds}
              label="ICU Resuscitation Beds"
              criticalAt={2}
            />
            <CapacityBar
              available={selectedHospital.availableGeneralBeds}
              total={selectedHospital.totalGeneralBeds}
              label="General Disaster Wards"
              criticalAt={10}
            />
          </div>

          {/* Blood & Surgery Readiness */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
              Emergency Logistics
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded bg-surface-container-lowest">
                <span className="text-[10px] text-outline uppercase block">Blood Units In Bank</span>
                <span className="font-headline-sm font-bold text-on-surface">
                  {selectedHospital.bloodUnits} Units
                </span>
              </div>
              <div className="p-2.5 rounded bg-surface-container-lowest">
                <span className="text-[10px] text-outline uppercase block">Surge Protocol</span>
                <span className="font-label-md font-bold text-emerald-600">
                  {selectedHospital.surgeCapability ? 'Tier-1 Certified' : 'Standard'}
                </span>
              </div>
            </div>
          </div>

          {/* Clinical Specialties */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
              Certified Specialties
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedHospital.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-2 py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm border border-outline-variant/30"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Hotlines */}
          <div className="p-3 rounded-lg bg-surface-container-low space-y-2 text-body-sm">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-outline mt-0.5">location_on</span>
              <span className="text-on-surface-variant">{selectedHospital.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-outline">call</span>
              <a
                href={`tel:${selectedHospital.contactNumber}`}
                className="text-primary font-semibold hover:underline"
              >
                {selectedHospital.contactNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              closeAllDrawers();
              navigate('/resources');
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors"
          >
            Inspect Blood Reserves
          </button>
          <button
            onClick={() => {
              closeAllDrawers();
              navigate('/live');
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">local_hospital</span>
            <span>View on Map</span>
          </button>
        </div>
      </div>
    </>
  );
};
