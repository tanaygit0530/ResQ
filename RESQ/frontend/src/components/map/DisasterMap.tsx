import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { MapLegend } from './MapLegend';
import { PatientMarker } from './PatientMarker';
import { AmbulanceMarker } from './AmbulanceMarker';
import { HospitalMarker } from './HospitalMarker';
import { RouteLayer } from './RouteLayer';
import { BlockedRoadLayer } from './BlockedRoadLayer';

interface DisasterMapProps {
  heightClass?: string;
  showFilters?: boolean;
}

export const DisasterMap: React.FC<DisasterMapProps> = ({
  heightClass = 'h-[580px]',
  showFilters = true,
}) => {
  const {
    patients,
    ambulances,
    hospitals,
    mapFilters,
    toggleMapFilter,
    selectPatient,
    selectAmbulance,
    selectHospital,
    simulation,
    triggerDisruptor,
  } = useAppStore();

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.5, z + 0.1));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.8, z - 0.1));
  const handleRecenter = () => setZoomLevel(1);

  const p7F3A = patients.find((p) => p.id === 'P-7F3A') || patients[0];
  const p81D2 = patients.find((p) => p.id === 'P-81D2') || patients[1];
  const p209A = patients.find((p) => p.id === 'P-209A') || patients[3];

  const amb04 = ambulances.find((a) => a.id === 'AMB-04') || ambulances[2];
  const amb12 = ambulances.find((a) => a.id === 'AMB-12') || ambulances[7];

  const hospSion = hospitals.find((h) => h.id === 'HOSP-04') || hospitals[3];
  const hospLilavati = hospitals.find((h) => h.id === 'HOSP-02') || hospitals[1];
  const hospKem = hospitals.find((h) => h.id === 'HOSP-03') || hospitals[2];

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 select-none">
      {/* Top Filter Strip */}
      {showFilters && (
        <div className="p-3 bg-surface-container-lowest border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-outline">
              Tactical Map View
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm text-[11px] font-semibold">
              Live Mumbai Grid
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => toggleMapFilter('showPatients')}
              className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
                mapFilters.showPatients
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">personal_injury</span>
              <span>Patients ({patients.length})</span>
            </button>

            <button
              onClick={() => toggleMapFilter('showAmbulances')}
              className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
                mapFilters.showAmbulances
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">airport_shuttle</span>
              <span>Ambulances ({ambulances.length})</span>
            </button>

            <button
              onClick={() => toggleMapFilter('showHospitals')}
              className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
                mapFilters.showHospitals
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">local_hospital</span>
              <span>Hospitals ({hospitals.length})</span>
            </button>

            <button
              onClick={() => toggleMapFilter('showTraffic')}
              className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
                mapFilters.showTraffic
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">traffic</span>
              <span>Traffic</span>
            </button>

            <button
              onClick={() => toggleMapFilter('showRoutes')}
              className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
                mapFilters.showRoutes
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">alt_route</span>
              <span>Routes (8)</span>
            </button>
          </div>
        </div>
      )}

      {/* Vector Stylized Interactive City Map Canvas */}
      <div className={`relative w-full ${heightClass} bg-[#EBF0F7] overflow-hidden select-none`}>
        {/* Floating Zoom Controls */}
        <div className="absolute right-4 top-4 z-30 flex flex-col gap-1 bg-surface-container-lowest/90 backdrop-blur-md p-1 rounded-lg shadow-sm border border-outline-variant/30">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            title="Zoom In"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            title="Zoom Out"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <button
            onClick={handleRecenter}
            className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            title="Recenter View"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">my_location</span>
          </button>
        </div>

        {/* Vector SVG Graphic (Exact Stitch Geometry) */}
        <svg
          className="absolute inset-0 w-full h-full transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 900 600"
        >
          <defs>
            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#D3DCED"
                strokeDasharray="2 2"
                strokeWidth="0.75"
              />
            </pattern>
            <pattern
              height="8"
              id="blockedHatch"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
              width="8"
            >
              <line stroke="#DC2626" strokeWidth="2.5" x1="0" x2="0" y1="0" y2="8" />
            </pattern>
          </defs>

          {/* Water Bay / Coastline (Thane Creek / Mumbai representation) */}
          <path
            d="M 0,0 L 260,0 C 270,120 230,220 290,320 C 330,390 380,480 340,600 L 0,600 Z"
            fill="#D2E3F8"
          />
          <path
            d="M 260,0 C 270,120 230,220 290,320 C 330,390 380,480 340,600"
            fill="none"
            stroke="#B8D3F5"
            strokeWidth="3"
          />

          {/* Land Grid */}
          <rect fill="url(#grid)" height="600" width="640" x="260" y="0" />

          {/* Eastern Express Highway */}
          <path
            d="M 330,30 L 410,180 L 460,340 L 520,490 L 590,600"
            fill="none"
            stroke="#CBD5E1"
            strokeLinecap="round"
            strokeWidth="12"
          />
          <path
            d="M 330,30 L 410,180 L 460,340 L 520,490 L 590,600"
            fill="none"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="8"
          />

          {/* Santacruz-Chembur Link Road */}
          <path
            d="M 270,250 L 410,240 L 570,220 L 740,240 L 890,260"
            fill="none"
            stroke="#CBD5E1"
            strokeLinecap="round"
            strokeWidth="10"
          />
          <path
            d="M 270,250 L 410,240 L 570,220 L 740,240 L 890,260"
            fill="none"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="6"
          />

          {/* Secondary Grid Roads */}
          <path d="M 360,110 L 680,110 L 880,140" fill="none" stroke="#E2E8F0" strokeWidth="5" />
          <path d="M 430,320 L 820,330" fill="none" stroke="#E2E8F0" strokeWidth="5" />
          <path d="M 470,440 L 850,420" fill="none" stroke="#E2E8F0" strokeWidth="5" />
          <path d="M 620,50 L 640,550" fill="none" stroke="#E2E8F0" strokeWidth="5" />
          <path d="M 780,80 L 770,580" fill="none" stroke="#E2E8F0" strokeWidth="5" />

          {/* Congested Section if traffic enabled */}
          {mapFilters.showTraffic && (
            <path
              d="M 410,240 L 570,220"
              fill="none"
              opacity="0.85"
              stroke="#F59E0B"
              strokeDasharray="8 4"
              strokeWidth="6"
            />
          )}

          {/* Tactical Routes */}
          <RouteLayer visible={mapFilters.showRoutes} rerouted={simulation.bridgeB12Blocked} />

          {/* Blocked Road Layer */}
          <BlockedRoadLayer
            isBlocked={simulation.bridgeB12Blocked}
            onClick={() => triggerDisruptor('block_bridge')}
          />
        </svg>

        {/* Dynamic Overlays on Map */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Epicenter (Kurla Industrial Zone) */}
          <div className="absolute left-[56%] top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-32 w-32 rounded-full bg-tertiary/20 animate-ping opacity-75" />
              <span className="absolute inline-flex h-20 w-20 rounded-full bg-tertiary/30 animate-pulse" />
              <span className="relative flex items-center justify-center h-9 w-9 rounded-full bg-tertiary text-on-tertiary shadow-lg ring-4 ring-tertiary/20">
                <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
              </span>
            </div>
            <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap bg-inverse-surface/90 text-inverse-on-surface px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide shadow-md">
              Epicenter: Kurla Industrial Zone
            </div>
          </div>

          {/* Patient Markers */}
          {mapFilters.showPatients && (
            <>
              <PatientMarker
                patient={p7F3A}
                position={{ left: '75%', top: '30%' }}
                onClick={() => selectPatient(p7F3A)}
              />
              <PatientMarker
                patient={p81D2}
                position={{ left: '62%', top: '60%' }}
                onClick={() => selectPatient(p81D2)}
              />
              <PatientMarker
                patient={p209A}
                position={{ left: '44%', top: '25%' }}
                onClick={() => selectPatient(p209A)}
              />
            </>
          )}

          {/* Ambulance Markers */}
          {mapFilters.showAmbulances && (
            <>
              <AmbulanceMarker
                ambulance={amb04}
                position={{ left: simulation.bridgeB12Blocked ? '58%' : '64%', top: '39%' }}
                onClick={() => selectAmbulance(amb04)}
              />
              <AmbulanceMarker
                ambulance={amb12}
                position={{ left: '76%', top: '52%' }}
                onClick={() => selectAmbulance(amb12)}
              />
            </>
          )}

          {/* Hospital Markers */}
          {mapFilters.showHospitals && (
            <>
              <HospitalMarker
                hospital={hospSion}
                position={{ left: '54%', top: '72%' }}
                onClick={() => selectHospital(hospSion)}
              />
              <HospitalMarker
                hospital={hospLilavati}
                position={{ left: '43%', top: '45%' }}
                onClick={() => selectHospital(hospLilavati)}
              />
              <HospitalMarker
                hospital={hospKem}
                position={{ left: '86%', top: '24%' }}
                onClick={() => selectHospital(hospKem)}
              />
            </>
          )}

          {/* Blocked Road Badge Callout */}
          {simulation.bridgeB12Blocked && (
            <div
              onClick={() => triggerDisruptor('block_bridge')}
              className="absolute left-[72%] top-[37%] pointer-events-auto cursor-pointer"
            >
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-error-container text-on-error-container text-[11px] font-bold shadow-sm hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[13px] text-tertiary">block</span>
                <span>Bridge B12 Closed</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <MapLegend />
    </div>
  );
};
