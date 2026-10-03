import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { CapacityBar } from './CapacityBar';

export const HospitalTable: React.FC = () => {
  const { hospitals, selectHospital } = useAppStore();

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-body-sm">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-2.5 px-3">Facility Name</th>
              <th className="py-2.5 px-2.5">Triage Level</th>
              <th className="py-2.5 px-2.5 min-w-[160px]">ICU Capacity</th>
              <th className="py-2.5 px-2.5 min-w-[160px]">General Ward</th>
              <th className="py-2.5 px-2">Blood Reserves</th>
              <th className="py-2.5 px-2.5">Surge Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 font-body-sm">
            {hospitals.map((hosp) => (
              <tr
                key={hosp.id}
                onClick={() => selectHospital(hosp)}
                className="hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <td className="py-2.5 px-3">
                  <span className="font-headline-sm text-[15px] font-semibold text-on-surface block">
                    {hosp.name}
                  </span>
                  <span className="text-outline text-xs">{hosp.address}</span>
                </td>
                <td className="py-2.5 px-2.5 text-on-surface-variant font-medium">{hosp.level}</td>
                <td className="py-2.5 px-2.5">
                  <CapacityBar
                    available={hosp.availableIcuBeds}
                    total={hosp.totalIcuBeds}
                    label="ICU"
                  />
                </td>
                <td className="py-2.5 px-2.5">
                  <CapacityBar
                    available={hosp.availableGeneralBeds}
                    total={hosp.totalGeneralBeds}
                    label="Ward"
                  />
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm font-bold text-tertiary">
                  {hosp.bloodUnits} Units
                </td>
                <td className="py-2.5 px-2.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      hosp.availableIcuBeds === 0
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {hosp.availableIcuBeds === 0 ? 'Saturated' : 'Operational'}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectHospital(hosp);
                    }}
                    className="p-1 rounded hover:bg-surface-container text-primary font-label-sm text-label-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
