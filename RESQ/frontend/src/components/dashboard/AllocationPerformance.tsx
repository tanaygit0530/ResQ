import React from 'react';

export const AllocationPerformance: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-sm">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Allocation Performance
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Average patient transit and triage time optimization across dispatch waves
            </p>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-low px-3 py-1.5 rounded-lg">
            <div>
              <span className="font-label-sm text-[10px] uppercase text-outline block font-semibold">
                Current Avg
              </span>
              <span className="font-headline-md text-headline-md font-bold text-primary flex items-center">
                18.4 <span className="text-xs font-normal ml-0.5">min</span>
                <span className="material-symbols-outlined text-secondary text-[16px] ml-1">
                  arrow_downward
                </span>
              </span>
            </div>
            <div className="h-6 w-px bg-outline-variant/50" />
            <div>
              <span className="font-label-sm text-[10px] uppercase text-outline block font-semibold">
                Previous Baseline
              </span>
              <span className="font-headline-md text-headline-md font-medium text-outline">
                23.0 <span className="text-xs font-normal ml-0.5">min</span>
              </span>
            </div>
          </div>
        </div>

        {/* Trend Graph SVG (Identical to Stitch vector artwork) */}
        <div className="relative w-full h-44 mt-4">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 540 160">
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#155EEF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#155EEF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            <line stroke="#F1F3F9" strokeWidth="1" x1="40" x2="520" y1="20" y2="20" />
            <line stroke="#F1F3F9" strokeWidth="1" x1="40" x2="520" y1="60" y2="60" />
            <line stroke="#F1F3F9" strokeWidth="1" x1="40" x2="520" y1="100" y2="100" />
            <line stroke="#F1F3F9" strokeWidth="1" x1="40" x2="520" y1="140" y2="140" />

            {/* Y Axis Labels */}
            <text fill="#737687" fontFamily="Inter" fontSize="10" x="12" y="24">25m</text>
            <text fill="#737687" fontFamily="Inter" fontSize="10" x="12" y="64">20m</text>
            <text fill="#737687" fontFamily="Inter" fontSize="10" x="12" y="104">15m</text>
            <text fill="#737687" fontFamily="Inter" fontSize="10" x="12" y="144">10m</text>

            {/* Baseline Trajectory */}
            <path
              d="M 60,35 L 140,42 L 220,50 L 300,52 L 380,48 L 460,54 L 510,50"
              fill="none"
              stroke="#94A3B8"
              strokeDasharray="4 4"
              strokeWidth="2"
            />
            {/* Optimized Gradient Area */}
            <path
              d="M 60,40 L 140,55 L 220,78 L 300,90 L 380,105 L 460,118 L 510,122 L 510,150 L 60,150 Z"
              fill="url(#areaGradient)"
            />
            {/* Optimized Curve */}
            <path
              d="M 60,40 L 140,55 L 220,78 L 300,90 L 380,105 L 460,118 L 510,122"
              fill="none"
              stroke="#155EEF"
              strokeLinecap="round"
              strokeWidth="3"
            />
            {/* Markers */}
            <circle cx="60" cy="40" fill="#FFFFFF" r="3.5" stroke="#155EEF" strokeWidth="2.5" />
            <circle cx="140" cy="55" fill="#FFFFFF" r="3.5" stroke="#155EEF" strokeWidth="2.5" />
            <circle cx="220" cy="78" fill="#FFFFFF" r="3.5" stroke="#155EEF" strokeWidth="2.5" />
            <circle cx="300" cy="90" fill="#FFFFFF" r="3.5" stroke="#155EEF" strokeWidth="2.5" />
            <circle cx="380" cy="105" fill="#FFFFFF" r="3.5" stroke="#155EEF" strokeWidth="2.5" />
            <circle cx="460" cy="118" fill="#FFFFFF" r="3.5" stroke="#155EEF" strokeWidth="2.5" />
            <circle cx="510" cy="122" fill="#155EEF" r="5" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>
        </div>

        {/* X-Axis */}
        <div className="flex justify-between px-8 text-outline text-[11px] font-code-sm mt-1">
          <span>Cycle -6 (13:10)</span>
          <span>Cycle -5 (13:25)</span>
          <span>Cycle -4 (13:40)</span>
          <span>Cycle -3 (13:55)</span>
          <span>Cycle -2 (14:10)</span>
          <span>Cycle -1 (14:25)</span>
          <span className="text-primary font-bold">Live (#884)</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-outline-variant/30 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 bg-primary rounded" />
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              Current Allocation (18.4m)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-0.5 bg-outline border-b border-dashed border-outline" />
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Baseline Non-Optimized (23.0m)
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[#16A34A] font-semibold bg-[#F0FDF4] px-2 py-0.5 rounded">
          <span className="material-symbols-outlined text-[14px]">bolt</span>
          20.0% time reduction preserved
        </span>
      </div>
    </div>
  );
};
