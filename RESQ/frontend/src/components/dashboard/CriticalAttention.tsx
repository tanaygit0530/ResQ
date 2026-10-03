import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';

export const CriticalAttention: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, openDecisionExplanation } = useAppStore();
  const activeAlerts = alerts.slice(0, 4);

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm p-space-md justify-between h-full">
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Critical Attention
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                {activeAlerts.length} Active
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Requires immediate dispatch intervention
            </p>
          </div>
          <button
            onClick={() => navigate('/alerts')}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            title="Filter Alerts"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>

        {/* Alert Feed */}
        <div className="divide-y divide-outline-variant/30 mt-1">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className="py-space-md flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                    alert.severity === 'critical'
                      ? 'bg-error-container text-on-error-container'
                      : alert.severity === 'warning'
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      alert.severity === 'critical'
                        ? 'bg-tertiary animate-pulse'
                        : alert.severity === 'warning'
                        ? 'bg-secondary'
                        : 'bg-outline'
                    }`}
                  />
                  {alert.severity}
                </span>
                <span className="font-code-sm text-code-sm text-outline">{alert.timeAgo}</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[15px] font-semibold text-on-surface">
                  {alert.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
                  {alert.description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {alert.actionTarget ? (
                  <button
                    onClick={() => navigate(alert.actionTarget!)}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-1 shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">alt_route</span>
                    <span>{alert.actionLabel || 'Inspect'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/live')}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-1 shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">turn_sharp_right</span>
                    <span>Action</span>
                  </button>
                )}
                <button
                  onClick={() => openDecisionExplanation('P-7F3A')}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm font-medium hover:bg-surface-container hover:text-on-surface transition-colors"
                  type="button"
                >
                  Why?
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-outline-variant/30 mt-2">
        <button
          onClick={() => navigate('/alerts')}
          className="inline-flex items-center gap-1 text-primary font-label-md text-label-md font-semibold hover:underline"
        >
          <span>View all alerts</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
