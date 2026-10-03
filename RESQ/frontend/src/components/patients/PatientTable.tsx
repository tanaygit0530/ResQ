import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { SeverityBadge } from './SeverityBadge';
import { TriageSeverity } from '../../types';

interface PatientTableProps {
  onSelectPatient?: (id: string) => void;
  maxRows?: number;
}

export const PatientTable: React.FC<PatientTableProps> = ({ maxRows }) => {
  const { patients, selectPatient, openDecisionExplanation } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.injury.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.assignedAmbulanceId &&
        patient.assignedAmbulanceId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSeverity =
      selectedSeverity === 'ALL' || patient.triageSeverity.toUpperCase() === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  const displayedPatients = maxRows ? filteredPatients.slice(0, maxRows) : filteredPatients;

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
      {/* Table Action Controls */}
      <div className="p-space-md border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient ID, trauma type, location..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container"
          />
        </div>

        {/* Severity Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'CRITICAL', 'URGENT', 'DELAYED'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedSeverity === sev
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-body-sm">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-2.5 px-3">Patient Tag</th>
              <th className="py-2.5 px-2.5">Triage Severity</th>
              <th className="py-2.5 px-2.5">Injury Classification</th>
              <th className="py-2.5 px-2">Vitals (SpO2/BP)</th>
              <th className="py-2.5 px-2.5">Assigned Unit</th>
              <th className="py-2.5 px-2.5">Destination Hub</th>
              <th className="py-2.5 px-2">ETA</th>
              <th className="py-2.5 px-2.5">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 font-body-sm">
            {displayedPatients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => selectPatient(patient)}
                className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                  patient.triageSeverity === 'Critical' ? 'bg-error-container/10' : ''
                }`}
              >
                <td className="py-2.5 px-3 font-code-sm text-code-sm font-bold text-primary">
                  {patient.id}
                </td>
                <td className="py-2.5 px-2.5">
                  <SeverityBadge severity={patient.triageSeverity} size="sm" />
                </td>
                <td className="py-2.5 px-2.5 font-medium text-on-surface max-w-[200px] truncate">
                  {patient.injury}
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm text-on-surface-variant">
                  {patient.vitals.spo2}% · {patient.vitals.bp}
                </td>
                <td className="py-2.5 px-2.5">
                  {patient.assignedAmbulanceId ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-sm text-code-sm font-semibold">
                      <span className="material-symbols-outlined text-[13px] text-primary">
                        airport_shuttle
                      </span>
                      {patient.assignedAmbulanceId}
                    </span>
                  ) : (
                    <span className="text-outline text-xs">Unassigned</span>
                  )}
                </td>
                <td className="py-2.5 px-2.5 text-on-surface-variant truncate max-w-[140px]">
                  {patient.assignedHospitalId ? 'Lilavati Trauma Hub' : 'Pending'}
                </td>
                <td className="py-2.5 px-2 font-code-sm text-code-sm font-bold text-primary">
                  {patient.etaMinutes ? `${patient.etaMinutes} min` : '—'}
                </td>
                <td className="py-2.5 px-2.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      patient.status === 'In Transit'
                        ? 'bg-secondary-fixed text-on-secondary-fixed'
                        : patient.status === 'Allocated'
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openDecisionExplanation(patient.id)}
                      className="p-1 rounded hover:bg-surface-container text-primary font-label-sm text-label-sm"
                      title="Explain Decision"
                    >
                      <span className="material-symbols-outlined text-[16px]">psychology</span>
                    </button>
                    <button
                      onClick={() => selectPatient(patient)}
                      className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface"
                      title="Inspect Patient"
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
        <div className="flex items-center gap-2">
          <span>
            Showing {displayedPatients.length} of {filteredPatients.length} triage records
          </span>
          <span className="w-1 h-1 rounded-full bg-outline" />
          <span>
            Batch cycle: <strong className="text-on-surface">Live</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
