import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { SeverityBadge } from '../patients/SeverityBadge';

export const AllocationTable: React.FC = () => {
  const { allocations, openDecisionExplanation, openOverrideModal } = useAppStore();

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-body-sm">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-2.5 px-3">Allocation ID</th>
              <th className="py-2.5 px-2.5">Patient Tag</th>
              <th className="py-2.5 px-2.5">Severity</th>
              <th className="py-2.5 px-2.5">Assigned Unit</th>
              <th className="py-2.5 px-2.5">Assigned Hub</th>
              <th className="py-2.5 px-2">Solver Score</th>
              <th className="py-2.5 px-2">Est. ETA</th>
              <th className="py-2.5 px-2.5">Status</th>
              <th className="py-2.5 px-3 text-right">Why? / Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 font-body-sm">
            {allocations.map((alc) => (
              <tr key={alc.id} className="hover:bg-surface-container-low transition-colors">
                <td className="py-2.5 px-3 font-code-sm text-code-sm font-bold text-outline">
                  {alc.id}
                </td>
                <td className="py-2.5 px-2.5 font-code-sm text-code-sm font-bold text-primary">
                  {alc.patientId}
                </td>
                <td className="py-2.5 px-2.5">
                  <SeverityBadge severity={alc.severity} size="sm" />
                </td>
                <td className="py-2.5 px-2.5 font-semibold text-on-surface">
                  Ambulance {alc.ambulanceId}
                </td>
                <td className="py-2.5 px-2.5 text-on-surface-variant font-medium">
                  {alc.hospitalName}
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm font-bold text-primary">
                  {alc.score} / 100
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm font-bold text-on-surface">
                  {alc.etaMinutes} min
                </td>
                <td className="py-2.5 px-2.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-fixed text-on-primary-fixed">
                    {alc.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openDecisionExplanation(alc.patientId)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-container font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[15px]">psychology</span>
                      <span>Why?</span>
                    </button>
                    <button
                      onClick={() =>
                        openOverrideModal({
                          type: 'allocation',
                          id: alc.id,
                          title: `Override Allocation for ${alc.patientId}`,
                        })
                      }
                      className="p-1 rounded text-error hover:bg-error-container"
                      title="Manual Override"
                    >
                      <span className="material-symbols-outlined text-[16px]">tune</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
