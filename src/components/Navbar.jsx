import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiSearch, 
  FiBell, 
  FiChevronDown, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiAlignLeft
} from 'react-icons/fi';
import { CURRENT_USER } from '../constants/user';

// Dynamic Page Title mapping based on active route
const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard': return 'Dashboard Overview';
    case '/analytics': return 'Analytics Intelligence';
    case '/reports': return 'Sourcing & Reports';
    case '/vendors': return 'Supplier Directory';
    case '/rfqs': return 'Sourcing RFQs';
    case '/quotations': return 'Received Bids';
    case '/comparison': return 'Bid Evaluation Matrix';
    case '/approvals': return 'Expenditure Approvals';
    case '/purchase-orders': return 'Purchase Orders';
    case '/invoice': return 'Supplier Invoices';
    case '/activity': return 'System Activity Logs';
    default: return 'VendorBridge ERP';
  }
};

export default function Navbar({ toggleSidebar, toggleMobileSidebar, isCollapsed }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-800/60 bg-[#090d16]/90 px-6 backdrop-blur-md text-slate-300">
      
      {/* LEFT SECTION: Sidebar Toggles & Title */}
      <div className="flex items-center gap-4">
        {/* Desktop Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-1.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition-colors cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <FiAlignLeft className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleMobileSidebar}
          className="flex md:hidden p-1.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition-colors cursor-pointer"
          title="Open Menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Current Page Title */}
        <h2 className="text-base font-extrabold text-white tracking-tight hidden sm:block">
          {pageTitle}
        </h2>
      </div>

      {/* CENTER SECTION: Search */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative group">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder="Search RFQs, Vendors, or Invoices..."
            className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 outline-none focus:border-emerald-500/50 focus:bg-slate-900 transition-all duration-300 placeholder-slate-500"
          />
        </div>
      </div>

      {/* RIGHT SECTION: Indicators & Profile Dropdown */}
      <div className="flex items-center gap-4">
        {/* Live Operational Status */}
        <div className="hidden lg:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full text-[10px] tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Gateways Active
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-xl bg-slate-900/40 border border-slate-800/40 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <FiBell className="w-4.5 h-4.5" />
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
              3
            </span>
          </button>

          {/* Click out backdrop for notifications */}
          {isNotificationsOpen && (
            <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
          )}

          {/* Notifications Dropdown Panel */}
          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                key="notifications-dropdown"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800/90 shadow-2xl p-4 z-50 text-xs text-slate-300 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white">System Notifications</span>
                  <span className="text-[10px] text-emerald-400 font-bold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                    <span className="block font-bold text-slate-200">New Bid Submitted</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Apex Metals Ltd placed a bid on RFQ-2026-981</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                    <span className="block font-bold text-slate-200">Approval Required</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Sarah J. requested expenditure sign-off for APP-101</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                    <span className="block font-bold text-slate-200">Payment Processed</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Invoice INV-2026-402 paid successfully ($42,500)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile dropdown menu block */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pl-2.5 pr-3 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-350 hover:border-slate-700 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
              {CURRENT_USER.initials}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200 leading-tight">{CURRENT_USER.name}</span>
              <span className="text-[9px] text-slate-500 font-semibold leading-none">{CURRENT_USER.role}</span>
            </div>
            <FiChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Click out backdrop for profile */}
          {isProfileOpen && (
            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
          )}

          {/* Profile Dropdown panel */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                key="profile-dropdown"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800/90 shadow-2xl p-1 z-50 text-xs text-slate-350 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                  <span className="block font-bold text-slate-200">{CURRENT_USER.name}</span>
                  <span className="text-[10px] text-slate-500 truncate block">{CURRENT_USER.email}</span>
                </div>
                
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    alert("Profile Settings clicked");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <FiUser className="w-4 h-4 text-slate-400" />
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    alert("System Settings clicked");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <FiSettings className="w-4 h-4 text-slate-400" />
                  System Settings
                </button>
                
                <div className="h-px bg-slate-800/85 my-1" />
                
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    alert("Logging out...");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer text-left"
                >
                  <FiLogOut className="w-4 h-4" />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
