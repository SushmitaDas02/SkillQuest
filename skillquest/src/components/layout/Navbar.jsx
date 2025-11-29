import React from 'react';
import { Bell, Sun, Moon, LogIn, UserPlus, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = ({ 
  darkMode, 
  toggleDarkMode, 
  notificationOpen, 
  setNotificationOpen, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  notificationRef,
  // New auth props
  user,
  logout,
  openLoginModal,
  openSignupModal,
  authModalOpen
}) => {
  return (
    <nav className="fixed w-full z-50 top-0 glass-panel">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold dark:text-white">
          <span className="gradient-text">SAC</span>
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#dashboard" className="nav-link">Dashboard</a>
          <a href="#feed" className="nav-link">Activity</a>
          <a href="#features" className="nav-link">Features</a>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="nav-link p-2 relative"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 border border-gray-200 dark:border-slate-600"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-slate-600">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {/* Notification Items */}
                    <div className="p-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                          <Bell size={14} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-white">
                            New event: <span className="font-semibold">Tech Innovation Summit</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <User size={14} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-white">
                            <span className="font-semibold">Rahul Verma</span> joined Photography Club
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                          <Settings size={14} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-white">
                            System update completed successfully
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-slate-600">
                    <button className="w-full text-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu or Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* User Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <img 
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=7c3aed&color=fff`} 
                    alt={user?.fullName || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-purple-400"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold dark:text-white">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 capitalize">{user?.userType || 'user'}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {notificationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 border border-gray-200 dark:border-slate-600"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-slate-600">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=7c3aed&color=fff`} 
                            alt={user?.fullName || 'User'}
                            className="w-12 h-12 rounded-full border-2 border-purple-400"
                          />
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{user?.fullName || 'User'}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{user?.userType || 'user'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <Link 
                          to={user?.userType === 'admin' ? '/admin' : '/dashboard'} 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-200"
                        >
                          <Settings size={18} />
                          <span>Dashboard</span>
                        </Link>
                        <button 
                          onClick={logout}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                        >
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Auth Buttons */
            <div className="flex items-center space-x-3">
              <motion.button 
                onClick={openLoginModal}
                className="px-4 py-2 rounded-full border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={authModalOpen}
              >
                <LogIn size={16} />
                <span>Login</span>
              </motion.button>
              
              <motion.button 
                onClick={openSignupModal}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={authModalOpen}
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </motion.button>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <motion.button 
            onClick={toggleDarkMode} 
            className="nav-link p-2 rounded-full bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-800 overflow-hidden"
          >
            <div className="py-2">
              <a href="#dashboard" className="block py-3 px-6 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Dashboard</a>
              <a href="#feed" className="block py-3 px-6 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Activity</a>
              <a href="#features" className="block py-3 px-6 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Features</a>
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <>
                  <Link 
                    to={user?.userType === 'admin' ? '/admin' : '/dashboard'} 
                    className="py-3 px-6 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3"
                  >
                    <Settings size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full text-left py-3 px-6 border-b border-gray-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 flex items-center space-x-3"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      openLoginModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-6 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                  <button 
                    onClick={() => {
                      openSignupModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;