import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ResqLogo } from '../components/common/ResqLogo';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body-md antialiased">
      {/* Public Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-margin-desktop flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-md">
            <ResqLogo className="h-8 w-auto object-contain" />
            <div className="flex flex-col">
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-none font-bold">
                  RESQ
                </span>
                <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant uppercase tracking-wider font-semibold">
                  Public Portal
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">
                Public Emergency Information &amp; Triage Relief
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                Civil Emergency Grid Active
              </span>
            </div>
          </div>

          {/* Quick Helplines & Return to Control Room */}
          <div className="flex items-center gap-space-md">
            <a
              href="tel:112"
              className="hidden md:flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-tertiary text-on-tertiary font-label-md text-label-md hover:bg-tertiary-container transition-colors shadow-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>112</span>
              <span className="opacity-80">| 1800-RESQ-EMERGENCY</span>
            </a>
            <Link
              to="/overview"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              <span className="hidden sm:inline">Control Room</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="w-full pt-20 flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-8 px-margin-desktop text-center text-outline font-body-sm text-body-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ResqLogo className="h-6 w-auto" size={24} />
            <span className="font-semibold text-on-surface">RESQ Civil Emergency Transparency Grid</span>
          </div>
          <p>© 2026 Maharashtra State Disaster Management Authority • Zero PII Sanitized Feeds</p>
        </div>
      </footer>
    </div>
  );
};
