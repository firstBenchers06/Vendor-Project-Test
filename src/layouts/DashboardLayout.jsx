import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);

  // Reset scroll of main container to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Responsive hook to manage sidebar collapse/drawer states across breakpoints using matchMedia
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const handleMobileChange = (e) => {
      if (e.matches) {
        setIsOpenMobile(false);
      }
    };

    const handleTabletChange = (e) => {
      if (e.matches) {
        setIsCollapsed(true);
      }
    };

    const handleDesktopChange = (e) => {
      if (e.matches) {
        setIsCollapsed(false);
      }
    };

    // Initial evaluation
    if (mobileQuery.matches) setIsOpenMobile(false);
    if (tabletQuery.matches) setIsCollapsed(true);
    if (desktopQuery.matches) setIsCollapsed(false);

    // Attach listeners
    mobileQuery.addEventListener('change', handleMobileChange);
    tabletQuery.addEventListener('change', handleTabletChange);
    desktopQuery.addEventListener('change', handleDesktopChange);

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      tabletQuery.removeEventListener('change', handleTabletChange);
      desktopQuery.removeEventListener('change', handleDesktopChange);
    };
  }, []);

  // Lock scroll on body when mobile drawer is open to prevent background scrolling
  useEffect(() => {
    if (isOpenMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMobile]);

  return (
    <div className="flex h-screen h-[100dvh] w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isOpenMobile={isOpenMobile} 
        setIsOpenMobile={setIsOpenMobile} 
      />

      {/* Main Panel Content Container */}
      <div className="flex flex-col flex-1 h-screen h-[100dvh] overflow-hidden min-w-0 bg-slate-950">
        
        {/* Fixed Top Navbar */}
        <Navbar 
          toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
          toggleMobileSidebar={() => setIsOpenMobile(!isOpenMobile)} 
          isCollapsed={isCollapsed} 
        />

        {/* Scrollable Dashboard Viewport */}
        <main ref={mainRef} className="flex-1 overflow-y-auto bg-slate-900/40 p-6 md:p-8 relative">
          
          {/* Subtle Ambient Glowing Spotlights */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Animated Page Router Outlet */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full h-full relative z-10"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
