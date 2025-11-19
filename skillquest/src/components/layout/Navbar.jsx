import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';

const Navbar = ({ 
  darkMode, 
  toggleDarkMode, 
  notificationOpen, 
  setNotificationOpen, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  notificationRef 
}) => {
  return (
    <nav className="fixed w-full z-50 top-0 glass-panel">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold dark:text-white">
          <span className="gradient-text">SAC</span>
        </a>
        
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#dashboard" className="nav-link">Dashboard</a>
          <a href="#feed" className="nav-link">Activity</a>
          <a href="#features" className="nav-link">Features</a>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="nav-link p-2"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="nav-link p-2">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-link p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800">
          <a href="#dashboard" className="block py-3 px-6 border-b border-gray-200 dark:border-slate-700">Dashboard</a>
          <a href="#feed" className="block py-3 px-6 border-b border-gray-200 dark:border-slate-700">Activity</a>
          <a href="#features" className="block py-3 px-6">Features</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;