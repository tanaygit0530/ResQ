import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { PublicLayout } from './layouts/PublicLayout';

// Control Room Pages
import { OverviewPage } from './pages/Overview';
import { LiveOperationsPage } from './pages/LiveOperations';
import { PatientsPage } from './pages/Patients';
import { AmbulancesPage } from './pages/Ambulances';
import { HospitalsPage } from './pages/Hospitals';
import { ResourcesPage } from './pages/Resources';
import { AllocationsPage } from './pages/Allocations';
import { AlertsPage } from './pages/Alerts';
import { LedgerPage } from './pages/Ledger';
import { FundTraceabilityPage } from './pages/FundTraceability';
import { SimulatorPage } from './pages/Simulator';
import { AnalyticsPage } from './pages/Analytics';
import { SystemHealthPage } from './pages/SystemHealth';
import { SettingsPage } from './pages/Settings';

// Public Portal Page
import { PublicPortalPage } from './pages/PublicPortal';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect to overview */}
      <Route path="/" element={<Navigate to="/overview" replace />} />

      {/* Internal Control-Room Operations Routes */}
      <Route element={<AppLayout />}>
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/live" element={<LiveOperationsPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/ambulances" element={<AmbulancesPage />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/allocations" element={<AllocationsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/ledger" element={<LedgerPage />} />
        <Route path="/funds" element={<FundTraceabilityPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/system-health" element={<SystemHealthPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Public Emergency Citizen Portal (Separate Layout) */}
      <Route element={<PublicLayout />}>
        <Route path="/public" element={<PublicPortalPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/overview" replace />} />
    </Routes>
  );
};

export default App;
