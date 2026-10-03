import React, { useState } from 'react';
import { useAppStore } from '../stores/appStore';

export const SettingsPage: React.FC = () => {
  const { operator } = useAppStore();
  const [operatorName, setOperatorName] = useState(operator.name);
  const [operatorEmail, setOperatorEmail] = useState(operator.email);
  const [urgencyWeight, setUrgencyWeight] = useState(35);
  const [transitWeight, setTransitWeight] = useState(25);
  const [capacityWeight, setCapacityWeight] = useState(20);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Operational Settings &amp; Command Credentials
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Supervisor Clearance L2
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Configure terminal authentication, dispatch zone bindings, and multi-objective optimization weight calibrations.
          </p>
        </div>

        {isSaved && (
          <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-label-sm text-label-sm font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check</span>
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Operator Credentials (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          {/* Operator Profile Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg">
            <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30 mb-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">manage_accounts</span>
                <h2 className="font-headline-md text-on-surface font-semibold">Operator Profile</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                {operator.role}
              </span>
            </div>

            <form onSubmit={handleSave} className="space-y-space-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="space-y-1.5">
                  <label className="font-label-md text-label-md font-semibold text-on-surface">
                    Operator Identity
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                      person
                    </span>
                    <input
                      type="text"
                      value={operatorName}
                      onChange={(e) => setOperatorName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-md text-label-md font-semibold text-on-surface">
                    Terminal Assignment
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                      desktop_windows
                    </span>
                    <input
                      type="text"
                      value={operator.terminalId}
                      readOnly
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg font-code-sm text-code-sm text-on-surface cursor-default focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label-md text-label-md font-semibold text-on-surface">
                  Direct Notification Gateway
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                    alternate_email
                  </span>
                  <input
                    type="email"
                    value={operatorEmail}
                    onChange={(e) => setOperatorEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm"
                >
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Optimizer Weights & Thresholds (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          {/* Supervisory Advisory */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">policy</span>
            <div>
              <span className="font-label-sm text-label-sm uppercase font-semibold text-secondary block">
                Supervisory Advisory
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                Changes to solver objective weights require Supervisory Level 2 clearance to apply across active emergency clusters.
              </p>
            </div>
          </div>

          {/* Optimizer Objective Formulations */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-md space-y-space-md">
            <h3 className="font-headline-sm font-bold text-on-surface">
              MILP Objective Weight Calibration
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-body-sm text-body-sm mb-1">
                  <span className="font-semibold text-on-surface">Patient Urgency Weight (w₁)</span>
                  <span className="font-code-sm font-bold text-tertiary">{urgencyWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={urgencyWeight}
                  onChange={(e) => setUrgencyWeight(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-body-sm text-body-sm mb-1">
                  <span className="font-semibold text-on-surface">Transit Latency Weight (w₂)</span>
                  <span className="font-code-sm font-bold text-primary">{transitWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={transitWeight}
                  onChange={(e) => setTransitWeight(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-body-sm text-body-sm mb-1">
                  <span className="font-semibold text-on-surface">ICU Preservation (w₃)</span>
                  <span className="font-code-sm font-bold text-secondary">{capacityWeight}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={capacityWeight}
                  onChange={(e) => setCapacityWeight(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-container-low font-code-sm text-code-sm text-outline">
              Formula: min Z = (w₁ · TriageLoss) + (w₂ · TravelDelay) + (w₃ · OverloadPenalty)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
