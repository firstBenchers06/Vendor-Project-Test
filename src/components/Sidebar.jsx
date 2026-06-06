import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, 
  FiBarChart2, 
  FiFileText, 
  FiUsers, 
  FiGitPullRequest, 
  FiDollarSign, 
  FiUserCheck, 
  FiPackage, 
  FiCreditCard, 
  FiActivity, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX, 
  FiLogOut 
} from 'react-icons/fi';
import { GoGitCompare } from 'react-icons/go';
import { CURRENT_USER } from '../constants/user';

const navGroups = [
  {
    title: 'Core',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
      { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
      { name: 'Reports', path: '/reports', icon: FiFileText },
    ]
  },
  {
    title: 'Procurement Flow',
    items: [
      { name: 'Vendors', path: '/vendors', icon: FiUsers },
      { name: 'RFQs', path: '/rfqs', icon: FiGitPullRequest },
      { name: 'Quotations', path: '/quotations', icon: FiDollarSign },
      { name: 'Comparison', path: '/comparison', icon: GoGitCompare },
      { name: 'Approvals', path: '/approvals', icon: FiUserCheck },
      { name: 'Purchase Orders', path: '/purchase-orders', icon: FiPackage },
      { name: 'Invoice', path: '/invoice', icon: FiCreditCard },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Activity', path: '/activity', icon: FiActivity },
    ]
  }
];

function Branding({ isCollapsed }) {
  return (
    <div className="flex items-center gap-3 px-6 border-b border-slate-800/50 h-16 flex-shrink-0">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm shadow-[0_0_12px_rgba(16,185,129,0.35)] flex-shrink-0">
        VB
      </div>
      <AnimatePresence initial={false} mode="wait">
        {!isCollapsed && (
          <motion.div
            key="branding-text"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col overflow-hidden whitespace-nowrap"
          >
            <span className="font-extrabold text-sm bg-gradient-to-r from-white via-indigo-150 to-indigo-300 bg-clip-text text-transparent">
              VendorBridge
            </span>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest">
              ENTERPRISE ERP
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavMenu({ isCollapsed, onItemClick, activeIndicatorId }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin">
      {navGroups.map((group) => (
        <div key={group.title} className="space-y-2">
          {/* Group Title or divider */}
          <div className="h-4 flex items-center">
            {!isCollapsed ? (
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3">
                {group.title}
              </h4>
            ) : (
              <div className="h-px w-full bg-slate-800/60 my-2 mx-1" />
            )}
          </div>

          {/* Items List */}
          <ul className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="relative group list-none">
                  <NavLink
                    to={item.path}
                    onClick={onItemClick}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide relative overflow-hidden transition-all duration-200
                      ${isActive 
                        ? 'text-emerald-400 bg-emerald-500/[0.08]' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId={activeIndicatorId}
                            className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-emerald-500 rounded-r-md shadow-[0_0_8px_rgba(16,185,129,0.85)]"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <Icon className={`w-4.5 h-4.5 flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                        <AnimatePresence initial={false} mode="wait">
                          {!isCollapsed && (
                            <motion.span
                              key={item.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.15 }}
                              className="truncate"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </NavLink>
                  {/* Collapsed Tooltip */}
                  {isCollapsed && (
                    <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                      <div className="bg-slate-950 border border-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                        {item.name}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function UserProfileFooter({ isCollapsed, onSignOut }) {
  return (
    <div className="mt-auto border-t border-slate-800/50 p-4 bg-slate-900/20 flex-shrink-0">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700/60 overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-350 shadow-inner">
          {CURRENT_USER.initials}
        </div>
        <AnimatePresence initial={false} mode="wait">
          {!isCollapsed && (
            <motion.div
              key="user-info"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col flex-1 min-w-0"
            >
              <span className="text-xs font-bold text-slate-200 truncate">{CURRENT_USER.name}</span>
              <span className="text-[10px] text-slate-500 font-semibold truncate">{CURRENT_USER.role}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {!isCollapsed && (
          <button 
            onClick={onSignOut} 
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors"
            title="Sign Out"
          >
            <FiLogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({ isCollapsed, setIsCollapsed, isOpenMobile, setIsOpenMobile }) {
  const handleSignOut = () => {
    alert('Signing out...');
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: 'spring', damping: 22, stiffness: 160 }}
        className="hidden md:flex flex-col h-screen bg-[#090d16] border-r border-slate-800/80 text-slate-300 relative z-30 select-none flex-shrink-0"
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-6 -right-3 w-6 h-6 items-center justify-center bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 shadow-lg cursor-pointer transition-all duration-200 z-50 flex"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <FiChevronRight className="w-3.5 h-3.5" /> : <FiChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Branding Logo Block */}
        <Branding isCollapsed={isCollapsed} />

        {/* Navigation Links */}
        <NavMenu 
          isCollapsed={isCollapsed} 
          activeIndicatorId="activeIndicator" 
        />

        {/* User Profile Footer */}
        <UserProfileFooter 
          isCollapsed={isCollapsed} 
          onSignOut={handleSignOut} 
        />
      </motion.aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div
            key="mobile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenMobile(false)}
            className="md:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
          />
        )}
        {isOpenMobile && (
          <motion.aside
            key="mobile-drawer-aside"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#090d16] border-r border-slate-800/80 text-slate-300 z-50 flex flex-col select-none h-screen"
          >
            {/* Header inside drawer */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/50 h-16 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm shadow-[0_0_12px_rgba(16,185,129,0.35)] flex-shrink-0">
                  VB
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm bg-gradient-to-r from-white via-indigo-150 to-indigo-300 bg-clip-text text-transparent">
                    VendorBridge
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold tracking-widest">
                    ENTERPRISE ERP
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpenMobile(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 cursor-pointer transition-colors"
                aria-label="Close Drawer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items for mobile */}
            <NavMenu 
              isCollapsed={false} 
              onItemClick={() => setIsOpenMobile(false)} 
              activeIndicatorId="activeIndicatorMobile" 
            />

            {/* User Info for Mobile */}
            <UserProfileFooter 
              isCollapsed={false} 
              onSignOut={handleSignOut} 
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
