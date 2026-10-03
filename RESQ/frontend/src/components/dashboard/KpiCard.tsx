import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  badgeText?: string;
  badgeType?: 'error' | 'warning' | 'primary' | 'secondary' | 'neutral';
  icon: string;
  iconBgColor?: string;
  iconColor?: string;
  trendIcon?: string;
  trendText?: string;
  footerText?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtext,
  badgeText,
  badgeType = 'neutral',
  icon,
  iconBgColor = 'bg-surface-container',
  iconColor = 'text-primary',
  trendIcon,
  trendText,
  footerText,
}) => {
  const getBadgeClass = () => {
    switch (badgeType) {
      case 'error':
        return 'bg-error-container text-on-error-container';
      case 'warning':
        return 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
      case 'primary':
        return 'bg-primary-fixed text-on-primary-fixed';
      case 'secondary':
        return 'bg-secondary-fixed text-on-secondary-fixed';
      default:
        return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
          {title}
        </span>
        <span className={`p-1.5 rounded-lg ${iconBgColor} ${iconColor} flex items-center justify-center`}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display-lg text-display-lg text-on-surface font-bold leading-none">
          {value}
        </span>
        {subtext && (
          <span className="font-headline-sm text-headline-sm text-outline font-normal">
            {subtext}
          </span>
        )}
        {badgeText && (
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${getBadgeClass()}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
        {trendText && (
          <p className="flex items-center gap-1">
            {trendIcon && (
              <span className="material-symbols-outlined text-[14px] text-secondary">
                {trendIcon}
              </span>
            )}
            <span>{trendText}</span>
          </p>
        )}
        {footerText && <span className="font-code-sm text-code-sm text-secondary font-medium">{footerText}</span>}
      </div>
    </div>
  );
};
