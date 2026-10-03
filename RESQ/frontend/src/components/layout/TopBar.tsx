import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';
import { ResqLogo } from '../common/ResqLogo';

export const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { operator, alerts } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const unreadAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    if (query.includes('amb') || query.includes('vehicle')) {
      navigate('/ambulances');
    } else if (query.includes('hosp') || query.includes('icu') || query.includes('bed')) {
      navigate('/hospitals');
    } else if (query.includes('blood') || query.includes('med')) {
      navigate('/resources');
    } else if (query.includes('alert') || query.includes('bridge')) {
      navigate('/alerts');
    } else if (query.includes('ledger') || query.includes('block')) {
      navigate('/ledger');
    } else {
      navigate('/patients');
    }
  };

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/40 z-40 px-gutter-desktop flex items-center justify-between">
      {/* Zone Breadcrumb */}
      <div className="flex items-center gap-space-sm">
        <ResqLogo className="h-8 w-auto object-contain" />
        <div className="flex items-center gap-1.5">
          <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
            Emergency Command Center
          </span>
          <span className="text-outline-variant text-[14px]">/</span>
          <span className="font-label-md text-label-md font-semibold text-on-surface">
            {operator.zone}
          </span>
        </div>
      </div>

      {/* Quick Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-space-lg">
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick search dispatch, asset ID, hospital... (⌘K)"
            className="w-full pl-9 pr-12 py-1.5 bg-surface-container-low border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-all"
          />
          <span className="absolute right-2.5 px-1.5 py-0.5 rounded bg-surface-container-highest border border-outline-variant/40 font-code-sm text-code-sm text-on-surface-variant font-medium">
            ⌘K
          </span>
        </div>
      </form>

      {/* Right Telemetry & Operator Controls */}
      <div className="flex items-center gap-space-sm">
        {/* Live Zone Alert Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container/40 border border-error/30 text-on-error-container font-label-sm text-label-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span className="font-semibold uppercase tracking-wider text-[10px]">
            LIVE Mumbai Disaster Zone
          </span>
        </div>

        {/* Last Optimized Timestamp */}
        <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-low border border-outline-variant/30 text-outline">
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          <span className="font-code-sm text-code-sm font-normal text-on-surface-variant">
            Last optimized: 14:32:08
          </span>
        </div>

        {/* Health status badge */}
        <div className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary-fixed/50 border border-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
          <span>Healthy</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/alerts')}
          type="button"
          className="relative p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
          title="View Active Alerts"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary text-on-tertiary font-label-sm text-[9px] font-bold ring-2 ring-surface-container-lowest">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-outline-variant/40 mx-0.5" />

        {/* Operator Profile */}
        <div
          onClick={() => navigate('/settings')}
          className="flex items-center gap-space-sm pl-1 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <div className="flex flex-col text-right">
            <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
              {operator.name}
            </span>
            <span className="font-label-sm text-label-sm text-outline leading-tight">
              {operator.callsign}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
