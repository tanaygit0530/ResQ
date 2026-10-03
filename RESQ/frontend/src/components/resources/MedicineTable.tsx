import React from 'react';
import { mockMedicines } from '../../services/mockData';

export const MedicineTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-body-sm">
        <thead>
          <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
            <th className="py-2.5 px-3">Item Tag</th>
            <th className="py-2.5 px-2.5">Pharmaceutical Item</th>
            <th className="py-2.5 px-2.5">Category</th>
            <th className="py-2.5 px-2">Stock Available</th>
            <th className="py-2.5 px-2">Required Buffer</th>
            <th className="py-2.5 px-2.5">Status</th>
            <th className="py-2.5 px-2.5 text-right">Expiration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20 font-body-sm">
          {mockMedicines.map((med) => {
            const isDeficit = med.urgency === 'Deficit';
            const isLow = med.urgency === 'Low';

            return (
              <tr key={med.id} className="hover:bg-surface-container-low transition-colors">
                <td className="py-2.5 px-3 font-code-sm text-code-sm font-bold text-outline">
                  {med.id}
                </td>
                <td className="py-2.5 px-2.5 font-semibold text-on-surface">{med.name}</td>
                <td className="py-2.5 px-2.5 text-on-surface-variant">{med.category}</td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm font-bold text-on-surface">
                  {med.stockCount} {med.unit}
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm text-outline">
                  {med.minimumRequired} {med.unit}
                </td>
                <td className="py-2.5 px-2.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isDeficit
                        ? 'bg-error-container text-on-error-container'
                        : isLow
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {med.urgency}
                  </span>
                </td>
                <td className="py-2.5 px-2.5 text-right font-code-sm text-code-sm text-outline">
                  {med.expiryDate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
