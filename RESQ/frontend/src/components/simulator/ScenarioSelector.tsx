import React from 'react';
import { useAppStore } from '../../stores/appStore';

export const ScenarioSelector: React.FC = () => {
  const { simulation, setScenario } = useAppStore();

  const presets = [
    { id: 'flood_surge', title: 'Flood Surge', icon: 'water_damage' },
    { id: 'casualty_surge', title: 'Casualty Surge', icon: 'personal_injury' },
    { id: 'earthquake', title: 'Earthquake', icon: 'landslide' },
    { id: 'urban_fire', title: 'Urban Fire', icon: 'local_fire_department' },
  ] as const;

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
          Scenario Preset
        </span>
        <span className="font-code-sm text-code-sm text-tertiary font-medium bg-error-container/40 px-1.5 py-0.5 rounded">
          {simulation.severityLabel}
        </span>
      </div>

      {/* Preset Chips */}
      <div className="grid grid-cols-2 gap-1.5">
        {presets.map((p) => {
          const isActive = simulation.scenarioPreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setScenario(p.id)}
              className={`px-2.5 py-2 text-left rounded-lg font-label-md text-label-md transition-colors flex items-center justify-between ${
                isActive
                  ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              <span>{p.title}</span>
              <span className="material-symbols-outlined text-[16px]">{p.icon}</span>
            </button>
          );
        })}
      </div>

      <div className="p-2.5 rounded-lg bg-surface-container-low text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
        <strong className="text-on-surface font-semibold">Active:</strong> {simulation.description}
      </div>
    </div>
  );
};
