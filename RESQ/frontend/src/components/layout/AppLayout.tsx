import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DecisionDrawer } from '../allocation/DecisionDrawer';
import { PatientDrawer } from '../patients/PatientDrawer';
import { AmbulanceDrawer } from '../ambulances/AmbulanceDrawer';
import { HospitalDrawer } from '../hospitals/HospitalDrawer';
import { LedgerDetailDrawer } from '../ledger/LedgerDetailDrawer';
import { TransferDetail } from '../funds/TransferDetail';
import { OverrideModal } from '../common/OverrideModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md antialiased select-none">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Viewport */}
      <div className="pl-60 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 pt-16 w-full px-gutter-desktop py-space-md bg-background">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <DecisionDrawer />
      <PatientDrawer />
      <AmbulanceDrawer />
      <HospitalDrawer />
      <LedgerDetailDrawer />
      <TransferDetail />
      <OverrideModal />
    </div>
  );
};
