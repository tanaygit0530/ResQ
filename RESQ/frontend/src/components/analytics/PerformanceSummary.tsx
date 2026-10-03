import React from 'react';
import { MetricCard } from './MetricCard';

export const PerformanceSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      <MetricCard
        title="Red Patient Latency"
        value="23.4 min"
        deltaText="-40.2%"
        isPositive={true}
        baseline="39.1 min"
        details="Incident triage to ICU admission via optimal route clearing"
      />
      <MetricCard
        title="Golden Hour Compliance"
        value="94.8%"
        deltaText="+38.5%"
        isPositive={true}
        baseline="56.3%"
        details="Critical casualties arriving under 60 minutes limit"
      />
      <MetricCard
        title="Hospital Gini Index"
        value="0.14"
        deltaText="-65.0%"
        isPositive={true}
        baseline="0.40"
        details="Workload balancing prevents premature hub saturation"
      />
      <MetricCard
        title="Route Detour Overhead"
        value="+3.2 min"
        deltaText="-72.0%"
        isPositive={true}
        baseline="+11.4 min"
        details="Real-time rerouting around inundated road sectors"
      />
    </div>
  );
};
