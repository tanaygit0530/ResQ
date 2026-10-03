import React from 'react';
import { PerformanceSummary } from '../components/analytics/PerformanceSummary';
import { BenchmarkChart } from '../components/analytics/BenchmarkChart';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Response Performance Analytics
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Empirical Benchmarks
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Statistical validation comparing the RESQ multi-objective solver against standard dispatch baselines (FCFS, Greedy Severity, Nearest Hospital).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="font-label-sm text-outline uppercase font-semibold text-[11px]">
              Confidence Bounds
            </span>
            <span className="font-code-sm font-bold text-secondary">95% CI (α = 0.05, p &lt; 0.001)</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <PerformanceSummary />

      {/* Benchmark Comparisons Grid */}
      <BenchmarkChart />
    </div>
  );
};
