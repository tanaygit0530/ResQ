import React from 'react';
import { ScenarioSelector } from '../components/simulator/ScenarioSelector';
import { SimulationControls } from '../components/simulator/SimulationControls';
import { EventControls } from '../components/simulator/EventControls';
import { SimulationTimeline } from '../components/simulator/SimulationTimeline';
import { DisasterMap } from '../components/map/DisasterMap';

export const SimulatorPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Disaster Operations Simulator
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
              Live Hackathon Sandbox
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Inject real-time catastrophic constraints and watch the multi-commodity simplex optimizer dynamically re-route field units.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Controls (5 cols) / Right Map & Timeline (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <ScenarioSelector />
          <SimulationControls />
          <EventControls />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <DisasterMap heightClass="h-[460px]" showFilters={true} />
          <SimulationTimeline />
        </div>
      </div>
    </div>
  );
};
