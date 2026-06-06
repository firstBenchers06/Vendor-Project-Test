import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';

// Elegant placeholder for paths that do not have dedicated views implemented yet
function ComingSoonPlaceholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-slate-900/30 rounded-3xl border border-slate-800/50 backdrop-blur-md relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -inset-px bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-3xl -z-10" />
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-lg font-black mb-5 shadow-lg shadow-emerald-950/20">
        VB
      </div>
      <h2 className="text-xl font-bold text-white mb-2">{title} Module</h2>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
        This module is currently in active development. The surrounding navigation shell, animations, responsive layouts, and user session contexts are fully functional.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Default redirect from landing/root to Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Main Integrated Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />

          {/* Sourcing & Procurement flow pages */}
          <Route path="rfqs" element={<ComingSoonPlaceholder title="Sourcing RFQs" />} />
          <Route path="quotations" element={<ComingSoonPlaceholder title="Received Bids (Quotations)" />} />
          <Route path="comparison" element={<ComingSoonPlaceholder title="Bid Evaluation Matrix" />} />
          <Route path="approvals" element={<ComingSoonPlaceholder title="Expenditure Approvals" />} />
          <Route path="purchase-orders" element={<ComingSoonPlaceholder title="Purchase Orders" />} />
          <Route path="invoice" element={<ComingSoonPlaceholder title="Supplier Invoices" />} />
          <Route path="activity" element={<ComingSoonPlaceholder title="System Activity Logs" />} />

          {/* Catch-all redirection */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
