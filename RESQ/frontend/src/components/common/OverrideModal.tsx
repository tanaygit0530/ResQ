import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';

export const OverrideModal: React.FC = () => {
  const { isOverrideModalOpen, overrideTarget, closeOverrideModal, confirmOverride } = useAppStore();
  const [reason, setReason] = useState('On-scene paramedic triage elevation request.');

  if (!isOverrideModalOpen || !overrideTarget) return null;

  return (
    <div className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-lg border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-space-md">
          <div className="w-10 h-10 rounded-full bg-error-container text-tertiary flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
          </div>
          <div className="flex-1">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Supervisor Override Confirmation
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              Bypassing the deterministic optimization solver will commit an immutable human intervention record to the cryptographic ledger block.
            </p>

            <div className="mt-space-md p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold block">Target Action</span>
              <span className="font-label-md text-label-md font-bold text-on-surface block mt-0.5">
                {overrideTarget.title} ({overrideTarget.id})
              </span>
            </div>

            <div className="mt-space-md space-y-1.5">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider block">
                Required Statutory Rationale:
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-all"
                placeholder="State the clinical or logistical justification for manual rerouting..."
              />
            </div>

            <div className="mt-space-lg flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeOverrideModal}
                className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => confirmOverride(reason)}
                className="px-4 py-2 rounded-lg bg-tertiary hover:bg-tertiary-container text-on-tertiary font-label-md text-label-md font-semibold shadow-sm transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Confirm &amp; Log to Ledger</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
