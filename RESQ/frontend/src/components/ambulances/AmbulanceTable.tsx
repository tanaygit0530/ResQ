import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { AmbulanceStatusBadge } from './AmbulanceStatusBadge';

export const AmbulanceTable: React.FC = () => {
  const { ambulances, selectAmbulance, openOverrideModal } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredAmbulances = ambulances.filter((amb) => {
    const matchesSearch =
      amb.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      amb.callsign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      amb.leadParamedic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      amb.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      amb.status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
      {/* Controls */}
      <div className="p-space-md border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search unit ID, callsign, paramedic..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'EN ROUTE', 'TRANSPORTING', 'AVAILABLE', 'STAGING', 'MAINTENANCE'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-body-sm">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-2.5 px-3">Unit ID</th>
              <th className="py-2.5 px-2.5">Callsign</th>
              <th className="py-2.5 px-2.5">Class / Type</th>
              <th className="py-2.5 px-2">Status</th>
              <th className="py-2.5 px-2.5">Lead Paramedic</th>
              <th className="py-2.5 px-2.5">Location</th>
              <th className="py-2.5 px-2">Fuel / O2</th>
              <th className="py-2.5 px-2">Speed</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 font-body-sm">
            {filteredAmbulances.map((amb) => (
              <tr
                key={amb.id}
                onClick={() => selectAmbulance(amb)}
                className="hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <td className="py-2.5 px-3 font-code-sm text-code-sm font-bold text-primary">
                  {amb.id}
                </td>
                <td className="py-2.5 px-2.5 font-semibold text-on-surface">{amb.callsign}</td>
                <td className="py-2.5 px-2.5 text-on-surface-variant">{amb.type}</td>
                <td className="py-2.5 px-2">
                  <AmbulanceStatusBadge status={amb.status} />
                </td>
                <td className="py-2.5 px-2.5 text-on-surface">{amb.leadParamedic}</td>
                <td className="py-2.5 px-2.5 text-on-surface-variant truncate max-w-[160px]">
                  {amb.currentLocation}
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm text-on-surface">
                  {amb.fuelPercentage}% / {amb.telemetry.oxygenLevelPct}%
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm text-primary font-bold">
                  {amb.telemetry.speedKmh} km/h
                </td>
                <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() =>
                        openOverrideModal({
                          type: 'ambulance',
                          id: amb.id,
                          title: `Re-dispatch ${amb.id}`,
                        })
                      }
                      className="p-1 rounded hover:bg-surface-container text-error"
                      title="Manual Override"
                    >
                      <span className="material-symbols-outlined text-[16px]">tune</span>
                    </button>
                    <button
                      onClick={() => selectAmbulance(amb)}
                      className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-container-low text-outline font-label-sm text-label-sm">
        <span>Showing {filteredAmbulances.length} fleet units</span>
        <span className="font-code-sm text-code-sm">GPS Sync: Live WGS84</span>
      </div>
    </div>
  );
};
