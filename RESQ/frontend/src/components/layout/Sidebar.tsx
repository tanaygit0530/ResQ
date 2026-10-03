import React from 'react';
import { NavLink } from 'react-router-dom';
import { ResqLogo } from '../common/ResqLogo';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Operations',
    items: [
      { name: 'Overview', path: '/overview', icon: 'dashboard' },
      { name: 'Live Operations', path: '/live', icon: 'emergency' },
      { name: 'Patients', path: '/patients', icon: 'personal_injury', badge: '12' },
      { name: 'Ambulances', path: '/ambulances', icon: 'airport_shuttle' },
      { name: 'Hospitals', path: '/hospitals', icon: 'local_hospital' },
      { name: 'Resources', path: '/resources', icon: 'inventory_2' },
      { name: 'Allocations', path: '/allocations', icon: 'alt_route' },
      { name: 'Alerts', path: '/alerts', icon: 'notifications_active', badge: '3' },
    ],
  },
  {
    title: 'Transparency',
    items: [
      { name: 'Ledger', path: '/ledger', icon: 'receipt_long' },
      { name: 'Fund Traceability', path: '/funds', icon: 'account_balance_wallet' },
    ],
  },
  {
    title: 'Simulation',
    items: [
      { name: 'Simulator', path: '/simulator', icon: 'model_training' },
      { name: 'Analytics', path: '/analytics', icon: 'monitoring' },
    ],
  },
  {
    title: 'System',
    items: [
      { name: 'System Health', path: '/system-health', icon: 'health_and_safety' },
      { name: 'Settings', path: '/settings', icon: 'settings' },
      { name: 'Public Portal', path: '/public', icon: 'public' },
    ],
  },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-surface-container-lowest border-r border-outline-variant/40 z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand header */}
        <div className="h-16 px-space-md flex items-center gap-space-sm border-b border-outline-variant/30">
          <ResqLogo className="h-8 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold tracking-tight">
              RESQ
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
              Disaster Response
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-space-xs py-space-sm">
          <nav className="space-y-0.5">
            {navSections.map((section) => (
              <div key={section.title} className="mb-2">
                <div className="px-space-sm py-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                    {section.title}
                  </span>
                </div>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-space-sm py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                          : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                      }`
                    }
                  >
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span className="font-body-md text-body-md">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-error-container text-on-error-container">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* System Status footer chip */}
      <div className="p-space-md border-t border-outline-variant/30 bg-surface-container-low/40">
        <div className="flex items-center justify-between px-space-sm py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wide">
              System Healthy
            </span>
          </div>
          <span className="material-symbols-outlined text-secondary text-[16px]">ecg_heart</span>
        </div>
      </div>
    </aside>
  );
};
