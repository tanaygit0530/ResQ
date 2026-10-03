import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';

export const DecisionDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    isDecisionDrawerOpen,
    activeDecisionExplanation,
    closeAllDrawers,
    openOverrideModal,
  } = useAppStore();

  const [isTechOpen, setIsTechOpen] = useState(false);
  const [copiedAudit, setCopiedAudit] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDecisionDrawerOpen) {
        closeAllDrawers();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDecisionDrawerOpen, closeAllDrawers]);

  if (!isDecisionDrawerOpen || !activeDecisionExplanation) return null;

  const data = activeDecisionExplanation;

  const handleExportDossier = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RESQ_Audit_Dossier_${data.patientId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTrace = () => {
    navigator.clipboard?.writeText('Block #1284 • Root: a8f3c7...91c2e4');
    setCopiedAudit(true);
    setTimeout(() => setCopiedAudit(false), 2000);
  };

  return (
    <>
      {/* Backdrop Scrim */}
      <div
        onClick={closeAllDrawers}
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-[3px] z-50 transition-opacity duration-300"
      />

      {/* Flyout Side Drawer */}
      <div
        aria-modal="true"
        role="dialog"
        className="fixed top-2 bottom-2 right-2 w-[calc(100vw-16px)] sm:w-[620px] max-w-[94vw] bg-surface-container-lowest rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Top Action / Breadcrumb Bar */}
        <div className="px-space-lg pt-space-md pb-space-sm bg-surface-container-low flex items-center justify-between select-none border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary-container text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Optimizer Explainability v4.2
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-sm text-[10px]">
              Deterministic MILP
            </span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface-container text-outline font-code-sm text-[11px] shadow-sm">
              ESC
            </kbd>
            <button
              onClick={closeAllDrawers}
              aria-label="Close why panel"
              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-space-lg py-space-md space-y-space-lg">
          {/* Primary Title */}
          <div>
            <h2 className="font-display-lg-mobile sm:font-display-lg text-display-lg-mobile sm:text-display-lg text-on-surface tracking-tight leading-tight">
              Why This Decision?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Real-time multi-objective constraint satisfaction rationale for automated dispatch solver.
            </p>
          </div>

          {/* Active Case Header Card */}
          <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="font-code-sm text-code-sm font-semibold text-on-surface">Patient Case:</span>
                <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-surface-container-lowest font-bold text-primary">
                  {data.patientId}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                {data.patientSeverity}
              </span>
            </div>

            {/* Assignment Pipeline Visual Graph */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-surface-container-lowest p-space-sm rounded-lg">
              <div className="sm:col-span-5 flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">airport_shuttle</span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    Ambulance {data.ambulanceId}
                  </p>
                  <p className="font-label-sm text-label-sm text-outline truncate">{data.ambulanceType}</p>
                </div>
              </div>
              <div className="sm:col-span-2 flex items-center justify-center py-1 sm:py-0">
                <div className="flex items-center text-primary-container">
                  <span className="hidden sm:inline-block w-3 h-0.5 bg-primary-container"></span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  <span className="hidden sm:inline-block w-3 h-0.5 bg-primary-container"></span>
                </div>
              </div>
              <div className="sm:col-span-5 flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[18px]">local_hospital</span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    {data.hospitalName}
                  </p>
                  <p className="font-label-sm text-label-sm text-outline truncate">Facility Level 1 • Bay 04</p>
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1">
              <span className="flex items-center gap-1 font-semibold text-on-surface">
                <span className="material-symbols-outlined text-primary text-[15px]">timer</span>
                Calculated Arrival: <span className="text-primary font-bold">{data.etaMinutes} mins</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-code-sm text-[11px] text-on-surface-variant font-medium">
                {data.optimalTransitText}
              </span>
            </div>
          </div>

          {/* SECTION 1: DECISION FACTORS */}
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline text-[18px]">tune</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
                  Decision Factors
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Global Score: {data.globalScore} / 100
              </span>
            </div>

            <div className="space-y-space-sm">
              {data.factors.map((factor, index) => (
                <div key={index} className="p-space-sm rounded-lg bg-surface-container-low">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      {factor.name}
                    </span>
                    <span
                      className="font-code-sm text-code-sm font-bold"
                      style={{ color: factor.color }}
                    >
                      {factor.score} / 100
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden mb-1">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${factor.score}%`, backgroundColor: factor.color }}
                    />
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{factor.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: WHY? (Human-Language Causal Rationale) */}
          <div>
            <div className="flex items-center gap-1.5 mb-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px]">chat_bubble_outline</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
                Human-Language Causal Rationale
              </span>
            </div>
            <div className="space-y-space-sm">
              <div className="p-space-sm rounded-xl bg-error-container/30 flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold text-sm">
                  ✕
                </span>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-error-container font-semibold">
                    Hospital A was excluded because ICU capacity is currently unavailable.
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Apex Central ICU reached 0 unreserved beds at 14:30 IST. Diverting to prevent dangerous stretcher delays.
                  </p>
                </div>
              </div>

              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">
                  <span className="material-symbols-outlined text-[14px]">airport_shuttle</span>
                </span>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Ambulance {data.ambulanceId} was chosen because the patient requires ALS support.
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Patient vitals trigger severe respiratory distress protocol; Basic Life Support (BLS) units were safely filtered out.
                  </p>
                </div>
              </div>

              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">
                  <span className="material-symbols-outlined text-[14px]">domain_verification</span>
                </span>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {data.hospitalName} has guaranteed available trauma &amp; ICU capacity.
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Resuscitation Bay 04 and Attending Trauma Surgeon were electronically held upon algorithm execution.
                  </p>
                </div>
              </div>

              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">
                  <span className="material-symbols-outlined text-[14px]">alt_route</span>
                </span>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    The assigned surface corridor is confirmed open and flood-free.
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Dynamic sensor telemetry rerouted around flooded Underpass U-03 via high-elevation arterial connector.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: HARD CONSTRAINT PROOFS */}
          <div>
            <div className="flex items-center gap-1.5 mb-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px]">verified</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
                System Decision &amp; Hard Constraint Proof
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center text-[12px] font-bold">
                  ✓
                </span>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-semibold text-on-surface">Mathematically Feasible</p>
                  <p className="font-label-sm text-label-sm text-outline truncate">Spatial &amp; temporal limits verified</p>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center text-[12px] font-bold">
                  ✓
                </span>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-semibold text-on-surface">Capability Matched</p>
                  <p className="font-label-sm text-label-sm text-outline truncate">ALS ventilator gear certified</p>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center text-[12px] font-bold">
                  ✓
                </span>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-semibold text-on-surface">Hospital Bed Reserved</p>
                  <p className="font-label-sm text-label-sm text-outline truncate">Lilavati EHR slot pre-allocated</p>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center text-[12px] font-bold">
                  ✓
                </span>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-semibold text-on-surface">Route Verified Open</p>
                  <p className="font-label-sm text-label-sm text-outline truncate">Flood sensors confirm 0cm depth</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLLAPSIBLE SECTION: TECHNICAL DETAILS */}
          <div className="rounded-xl bg-surface-container-low overflow-hidden">
            <button
              onClick={() => setIsTechOpen(!isTechOpen)}
              className="w-full p-space-md flex items-center justify-between text-left hover:bg-surface-container transition-colors"
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-outline text-[18px]">terminal</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Technical Details &amp; Optimization Metrics
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-outline transition-transform duration-200 ${
                  isTechOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {isTechOpen && (
              <div className="px-space-md pb-space-md pt-1 space-y-2.5">
                <div className="grid grid-cols-2 gap-2 font-code-sm text-code-sm">
                  <div className="p-2 rounded bg-surface-container-lowest">
                    <p className="text-outline text-[10px] uppercase font-bold">Solver Architecture</p>
                    <p className="text-on-surface font-semibold mt-0.5">MILP Branch &amp; Cut Simplex</p>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest">
                    <p className="text-outline text-[10px] uppercase font-bold">Solve Duration</p>
                    <p className="text-primary font-bold mt-0.5">34 milliseconds</p>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-surface-container-lowest font-code-sm text-code-sm">
                  <p className="text-outline text-[10px] uppercase font-bold">Objective Minimization Function</p>
                  <p className="text-on-surface font-medium mt-1 select-all font-mono">
                    min Z = (w₁ · Delay) + (w₂ · HospitalOverload) + (w₃ · MorbidityRisk)
                  </p>
                  <p className="text-outline text-[11px] mt-1">Weights calibrated: w₁ = 0.45, w₂ = 0.35, w₃ = 0.20</p>
                </div>
                <div className="p-2.5 rounded bg-surface-container-lowest font-code-sm text-code-sm flex items-center justify-between">
                  <div>
                    <p className="text-outline text-[10px] uppercase font-bold">Cryptographic Trace Proof</p>
                    <p className="text-on-surface text-[11px] font-mono mt-0.5 truncate max-w-[260px]">
                      Block #1284 • Root: a8f3c7...91c2e4
                    </p>
                  </div>
                  <button
                    onClick={handleCopyTrace}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-container text-[11px] font-semibold"
                  >
                    <span>{copiedAudit ? 'Copied!' : 'Copy Hash'}</span>
                    <span className="material-symbols-outlined text-[13px]">
                      {copiedAudit ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Drawer Dock Footer */}
        <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm select-none border-t border-outline-variant/30">
          <button
            onClick={handleExportDossier}
            className="w-full sm:w-auto px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export Audit Dossier</span>
          </button>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                openOverrideModal({
                  type: 'allocation',
                  id: data.patientId,
                  title: `Override Dispatch for Patient ${data.patientId}`,
                });
              }}
              className="flex-1 sm:flex-initial px-space-md py-2 rounded-lg bg-surface-container-highest text-error hover:bg-error-container hover:text-on-error-container font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>Manual Override</span>
            </button>
            <button
              onClick={() => {
                closeAllDrawers();
                navigate('/live');
              }}
              className="flex-1 sm:flex-initial px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">map</span>
              <span>View Route</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
