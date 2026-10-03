import React from 'react';
import { Alert } from '../../types';
import { AlertBadge } from './AlertBadge';
import { useAppStore } from '../../stores/appStore';
import { useNavigate } from 'react-router-dom';

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const navigate = useNavigate();
  const { acknowledgeAlert, openDecisionExplanation } = useAppStore();

  return (
    <div
      className={`p-space-md rounded-xl border flex flex-col justify-between gap-space-sm transition-all ${
        alert.acknowledged
          ? 'bg-surface-container-lowest/60 border-outline-variant/30 opacity-70'
          : alert.severity === 'critical'
          ? 'bg-surface-container-lowest border-error/40 shadow-sm'
          : 'bg-surface-container-lowest border-outline-variant/30 shadow-sm'
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertBadge severity={alert.severity} />
            <span className="font-label-sm text-outline uppercase font-semibold text-[11px]">
              {alert.category}
            </span>
          </div>
          <span className="font-code-sm text-code-sm text-outline">{alert.timeAgo}</span>
        </div>

        <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mt-2">
          {alert.title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
          {alert.description}
        </p>
      </div>

      <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {alert.actionTarget ? (
            <button
              onClick={() => navigate(alert.actionTarget!)}
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[15px]">alt_route</span>
              <span>{alert.actionLabel || 'Take Action'}</span>
            </button>
          ) : (
            <button
              onClick={() => openDecisionExplanation('P-7F3A')}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Explain Rationale
            </button>
          )}
        </div>

        {!alert.acknowledged && (
          <button
            onClick={() => acknowledgeAlert(alert.id)}
            className="px-2.5 py-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container text-xs font-semibold"
          >
            Acknowledge
          </button>
        )}
      </div>
    </div>
  );
};
