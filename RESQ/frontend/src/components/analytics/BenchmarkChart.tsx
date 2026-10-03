import React from 'react';

export const BenchmarkChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-md">
      {/* CHART 1: Average Red Patient Treatment Time */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between space-y-space-md">
        <div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Red Patient Treatment Latency
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Incident triage to definitive trauma care admission (Lower is better)
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-sm text-code-sm">
              Target &lt; 30 min
            </span>
          </div>

          <div className="mt-space-md space-y-3.5">
            {/* RESQ Optimizer */}
            <div className="p-space-sm rounded-lg bg-surface-container-low space-y-1.5">
              <div className="flex items-center justify-between text-body-sm font-label-md">
                <span className="font-semibold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  RESQ Optimizer (Deterministic Simplex)
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-code-sm font-semibold text-primary">
                    23.4 ± 2.1 min
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                    -40.2%
                  </span>
                </div>
              </div>
              <div className="relative w-full h-5 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-primary-container rounded" style={{ width: '39%' }} />
              </div>
              <div className="flex justify-between items-center text-outline font-label-sm text-label-sm pt-0.5">
                <span>Optimal diversion avoidance</span>
                <span>CI: [21.3 - 25.5 min]</span>
              </div>
            </div>

            {/* Greedy Severity */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-label-md text-label-md">
                <span className="text-on-surface">Greedy Severity First</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant">
                  39.1 ± 4.2 min
                </span>
              </div>
              <div className="relative w-full h-4 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-outline-variant rounded" style={{ width: '65.1%' }} />
              </div>
              <span className="font-body-sm text-body-sm text-outline">
                Saturation blindness at tertiary hubs
              </span>
            </div>

            {/* FCFS */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-label-md text-label-md">
                <span className="text-on-surface">First Come First Served (FCFS)</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant">
                  48.6 ± 5.4 min
                </span>
              </div>
              <div className="relative w-full h-4 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-outline-variant/80 rounded" style={{ width: '81%' }} />
              </div>
              <span className="font-body-sm text-body-sm text-outline">
                Queuing backpressure delays
              </span>
            </div>

            {/* Nearest Hospital */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-label-md text-label-md">
                <span className="text-on-surface">Nearest Hospital Baseline</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant">
                  54.2 ± 6.8 min
                </span>
              </div>
              <div className="relative w-full h-4 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-outline-variant/60 rounded" style={{ width: '90.3%' }} />
              </div>
              <span className="font-body-sm text-body-sm text-outline">
                Severe triage overcrowding cascades
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CHART 2: Golden Hour Compliance */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between space-y-space-md">
        <div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Golden Hour Evacuation Compliance
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Definitive surgical arrival within 60 minutes (Higher is better)
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-sm text-code-sm">
              Target &gt; 90%
            </span>
          </div>

          <div className="mt-space-md space-y-3.5">
            {/* RESQ Optimizer */}
            <div className="p-space-sm rounded-lg bg-surface-container-low space-y-1.5">
              <div className="flex items-center justify-between text-body-sm font-label-md">
                <span className="font-semibold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  RESQ Optimizer
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-code-sm font-bold text-primary">94.8%</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-label-sm text-label-sm font-bold">
                    +38.5%
                  </span>
                </div>
              </div>
              <div className="relative w-full h-5 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-emerald-500 rounded" style={{ width: '94.8%' }} />
              </div>
            </div>

            {/* Greedy */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-label-md text-label-md">
                <span className="text-on-surface">Greedy Severity</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant">68.5%</span>
              </div>
              <div className="relative w-full h-4 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-outline-variant rounded" style={{ width: '68.5%' }} />
              </div>
            </div>

            {/* FCFS */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-label-md text-label-md">
                <span className="text-on-surface">FCFS</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant">56.3%</span>
              </div>
              <div className="relative w-full h-4 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-outline-variant/80 rounded" style={{ width: '56.3%' }} />
              </div>
            </div>

            {/* Nearest */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-label-md text-label-md">
                <span className="text-on-surface">Nearest Baseline</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant">51.0%</span>
              </div>
              <div className="relative w-full h-4 bg-surface-container rounded overflow-hidden flex items-center">
                <div className="h-full bg-outline-variant/60 rounded" style={{ width: '51%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
