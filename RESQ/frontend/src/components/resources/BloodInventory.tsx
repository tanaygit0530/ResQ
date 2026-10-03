import React from 'react';
import { mockBloodInventory } from '../../services/mockData';

export const BloodInventoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-space-sm">
      {mockBloodInventory.map((item) => {
        const isCritical = item.status === 'Critical';
        const isLow = item.status === 'Low';

        return (
          <div
            key={item.type}
            className={`p-3 rounded-xl border flex flex-col justify-between transition-all hover:shadow-sm ${
              isCritical
                ? 'bg-error-container/30 border-error/40'
                : isLow
                ? 'bg-amber-50 border-amber-300'
                : 'bg-surface-container-lowest border-outline-variant/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-headline-sm font-bold text-on-surface">{item.type}</span>
              <span
                className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                  isCritical
                    ? 'bg-tertiary text-on-tertiary'
                    : isLow
                    ? 'bg-amber-500 text-white'
                    : 'bg-emerald-100 text-emerald-900'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-2">
              <span className="font-display-lg-mobile font-bold text-on-surface leading-none block">
                {item.unitsAvailable}
              </span>
              <span className="text-[11px] text-outline mt-0.5 block">
                Reserved: {item.unitsReserved}
              </span>
            </div>

            <div className="mt-2 pt-1 border-t border-outline-variant/20 text-[10px] text-on-surface-variant flex justify-between">
              <span>Min: {item.criticalThreshold}</span>
              <span className="font-semibold text-primary">Req. Stock</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
