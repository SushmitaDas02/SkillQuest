// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Laptop, Code2, Monitor, Cpu, Search, Bell, Sun, Moon, 
  Plus, CalendarPlus, Edit, Users, Camera, Music, User, Megaphone,
  Sparkles, Zap, TrendingUp, Target, ArrowRight, Mouse, ChevronDown,
  LogIn, UserPlus, X, Lock, Shield, GraduationCap, BookOpen,
  LogOut, Settings, Mail, Key, UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { currentUser: user, logout, loading, login, signup } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [feedItems, setFeedItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchFocused, setSearchFocused] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    studentId: '',
    department: '',
    adminCode: ''
  });

  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const heroRef = useRef(null);
  const authModalRef = useRef(null);

  // Background images
  const backgroundImages = {
    hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    dashboard: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
    activity: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  };

  // Mock data
  const dummyData = [
    { type: 'Event', name: 'Hackathon 2025', icon: <Laptop size={16} /> },
    { type: 'Club', name: 'Photography Club', icon: <Camera size={16} /> },
    { type: 'Event', name: 'Annual Music Fest', icon: <Music size={16} /> },
    { type: 'Person', name: 'Prof. Alok Sharma', icon: <User size={16} /> },
    { type: 'Club', name: 'Tech Club', icon: <Users size={16} /> },
  ];

  const featuredEvents = [
    { id: 1, title: 'Tech Innovation Summit', club: 'Tech Club', date: 'Mar 15, 2024', attendees: 250, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 2, title: 'Music Festival 2024', club: 'Music Club', date: 'Apr 20, 2024', attendees: 500, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 3, title: 'Photography Workshop', club: 'Photography Club', date: 'Feb 28, 2024', attendees: 80, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2054&q=80' },
    { id: 4, title: 'AI & ML Conference', club: 'Computer Society', date: 'May 5, 2024', attendees: 300, image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  ];

  const initialFeedItems = [
    { id: 1, user: 'Priya Sharma', action: 'registered for', event: 'Hackathon 2025', time: '2m ago', icon: 'calendar-plus', color: 'text-green-500' },
    { id: 2, user: 'Tech Club', action: 'posted an announcement:', event: '"New 3D printing workshop!"', time: '15m ago', icon: 'megaphone', color: 'text-blue-500' },
    { id: 3, user: 'Anjali Singh', action: 'joined', event: 'Photography Club', time: '1h ago', icon: 'users', color: 'text-purple-500' },
  ];

  // Effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
      if (authModalRef.current && !authModalRef.current.contains(event.target) && authModalOpen) {
        setAuthModalOpen(false);
        setAuthError('');
        setSuccessMessage('');
      }
    };

    const heroSection = heroRef.current;
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [authModalOpen]);

  useEffect(() => {
    setFeedItems(initialFeedItems);
    setIsVisible(true);

    const interval = setInterval(() => {
      const newItem = {
        id: Date.now(),
        user: 'Rahul Verma',
        action: 'created a new event:',
        event: 'Guest Lecture on AI',
        time: 'Just now',
        icon: 'calendar-plus',
        color: 'text-yellow-500'
      };
      setFeedItems(prev => [newItem, ...prev.slice(0, 4)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const results = dummyData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Auth handlers - COMPLETELY FIXED VERSION
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMessage('');
    setAuthLoading(true);

    // Enhanced validation
    if (!formData.email || !formData.password) {
      setAuthError('Please fill in all required fields');
      setAuthLoading(false);
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setAuthError('Passwords do not match');
        setAuthLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setAuthError('Password must be at least 6 characters long');
        setAuthLoading(false);
        return;
      }
      if (userType === 'admin' && formData.adminCode !== 'ADMIN2024') {
        setAuthError('Invalid admin access code. Use ADMIN2024');
        setAuthLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        // Login logic
        await login(formData.email, formData.password);
        setSuccessMessage('Successfully logged in!');
        setTimeout(() => {
          setAuthModalOpen(false);
          setSuccessMessage('');
        }, 1500);
      } else {
        // Signup logic
        const userData = {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          userType: userType,
          ...(userType === 'student' && {
            studentId: formData.studentId,
            department: formData.department
          })
        };
        await signup(userData);
        setSuccessMessage('Account created successfully!');
        setTimeout(() => {
          setAuthModalOpen(false);
          setSuccessMessage('');
        }, 1500);
      }
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        studentId: '',
        department: '',
        adminCode: ''
      });
    } catch (error) {
      setAuthError(error.message || 'An error occurred. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (authError) setAuthError('');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setAuthError('');
    setSuccessMessage('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      studentId: '',
      department: '',
      adminCode: ''
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Open Auth Modal handlers
  const openLoginModal = () => {
    setIsLogin(true);
    setUserType('student');
    setAuthModalOpen(true);
    setAuthError('');
    setSuccessMessage('');
  };

  const openSignupModal = () => {
    setIsLogin(false);
    setUserType('student');
    setAuthModalOpen(true);
    setAuthError('');
    setSuccessMessage('');
  };

  // Floating Particles Component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  // Animated Background Component
  const AnimatedBackground = () => (
    <motion.div 
      className="absolute inset-0"
      animate={{
        background: [
          'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          'linear-gradient(45deg, #764ba2 0%, #f093fb 50%, #667eea 100%)',
          'linear-gradient(45deg, #f093fb 0%, #667eea 50%, #764ba2 100%)',
          'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );

  // Auth Modal Component - COMPLETELY FIXED
  const AuthModal = () => (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            ref={authModalRef}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <button
              onClick={() => {
                setAuthModalOpen(false);
                setAuthError('');
                setSuccessMessage('');
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
              >
                {isLogin ? <LogIn size={28} className="text-white" /> : <UserPlus size={28} className="text-white" />}
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {isLogin ? 'Welcome Back' : 'Join Our Community'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </p>
            </div>

            {/* User Type Toggle - Only show for signup */}
            {!isLogin && (
              <div className="mb-6">
                <div className="flex bg-gray-100 dark:bg-slate-800 rounded-2xl p-1">
                  <button
                    type="button"
                    onClick={() => setUserType('student')}
                    className={`flex-1 py-3 px-4 rounded-xl text-center transition-all duration-300 ${
                      userType === 'student'
                        ? 'bg-white dark:bg-slate-700 shadow-lg text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <GraduationCap size={18} />
                      <span className="font-medium">Student</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('admin')}
                    className={`flex-1 py-3 px-4 rounded-xl text-center transition-all duration-300 ${
                      userType === 'admin'
                        ? 'bg-white dark:bg-slate-700 shadow-lg text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Shield size={18} />
                      <span className="font-medium">Admin</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl text-green-700 dark:text-green-300 text-sm flex items-center space-x-2"
              >
                <UserCheck size={16} />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {/* Error Message */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-sm flex items-center space-x-2"
              >
                <X size={16} />
                <span>{authError}</span>
              </motion.div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required={!isLogin}
                  />
                </motion.div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {!isLogin && userType === 'student' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      placeholder="Student ID"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="Department"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}

              {!isLogin && userType === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="adminCode"
                    value={formData.adminCode}
                    onChange={handleInputChange}
                    placeholder="Admin Access Code (ADMIN2024)"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required={!isLogin && userType === 'admin'}
                  />
                </motion.div>
              )}

              <div className="relative">
                <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                  minLength={6}
                />
              </div>

              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required={!isLogin}
                  />
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={authLoading}
                whileHover={{ scale: authLoading ? 1 : 1.02 }}
                whileTap={{ scale: authLoading ? 1 : 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {authLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                {userType === 'student' ? (
                  <>
                    <GraduationCap size={20} className="text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="font-semibold text-purple-700 dark:text-purple-300">Student Account</p>
                      <p className="text-sm text-purple-600/70 dark:text-purple-400/70">
                        Join clubs, register for events, and connect with peers
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Shield size={20} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-semibold text-blue-700 dark:text-blue-300">Admin Account</p>
                      <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
                        Manage events, clubs, and oversee campus activities
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // User Profile Dropdown
  const UserDropdown = () => (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <button 
        onClick={() => setNotificationOpen(!notificationOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/20 transition-all duration-300"
      >
        <img 
          src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=7c3aed&color=fff`} 
          alt={user?.fullName || 'User'}
          className="w-8 h-8 rounded-full border-2 border-purple-400"
        />
        <div className="text-left hidden md:block">
          <p className="text-sm font-semibold text-white">{user?.fullName || 'User'}</p>
          <p className="text-xs text-white/70 capitalize">{user?.userType || 'user'}</p>
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
    </motion.div>
  );

  // Search Result Item Component
  const SearchResultItem = ({ item }) => (
    <motion.div 
      className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 border-b border-gray-200 dark:border-slate-600 last:border-b-0 group cursor-pointer"
      whileHover={{ x: 8 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.div 
        className="text-purple-600 dark:text-purple-400 w-8 text-center mr-4"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {item.icon}
      </motion.div>
      <div>
        <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{item.type}</p>
      </div>
    </motion.div>
  );

  // Feed Item Component
  const FeedItem = ({ item }) => (
    <motion.div 
      className="flex items-start bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group border border-white/10"
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mr-4">
        <motion.span 
          className={`h-12 w-12 rounded-full flex items-center justify-center bg-white/20 dark:bg-slate-700/70 ${item.color} shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {item.icon === 'calendar-plus' && <CalendarPlus size={24} />}
          {item.icon === 'megaphone' && <Megaphone size={24} />}
          {item.icon === 'users' && <Users size={24} />}
          {item.icon === 'plus-circle' && <Plus size={24} />}
        </motion.span>
      </div>
      <div className="flex-1">
        <p className="text-gray-700 dark:text-gray-200">
          <span className="font-bold text-gray-900 dark:text-white">{item.user}</span> {item.action}{' '}
          <span className="font-semibold text-purple-600 dark:text-purple-400">{item.event}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{item.time}</p>
      </div>
      <motion.div 
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.2 }}
      >
        <Sparkles size={16} className="text-yellow-500" />
      </motion.div>
    </motion.div>
  );

  // Stats Card Component
  const StatsCard = ({ icon: Icon, number, text, delay }) => (
    <motion.div
      className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-500 border border-white/10"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">{number}</h3>
      <p className="text-gray-600 dark:text-gray-300 font-medium">{text}</p>
    </motion.div>
  );

  // Event Card Component
  const EventCard = ({ event, index }) => (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 border border-gray-200 dark:border-slate-600">
        <div className="relative overflow-hidden h-48">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-semibold">
            {event.date}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">by {event.club}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              👥 {event.attendees} attendees
            </span>
            <motion.button 
              className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>Join Event</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-slate-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-pink-50/20 dark:from-slate-900 dark:via-purple-900/10 dark:to-pink-900/10"></div>
        <FloatingParticles />
      </div>

      {/* Navbar */}
      <motion.nav 
        className="fixed w-full z-50 top-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Zap size={24} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Student Activity Centre</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">University Hub</p>
            </div>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {['Dashboard', 'Events', 'Clubs', 'Activities', 'Resources'].map((item, index) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-medium text-gray-700 dark:text-gray-200 relative group hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

            {/* Auth Buttons - WORKING VERSION */}
            {user ? (
              <div className="flex items-center space-x-4">
                <UserDropdown />
              </div>
            ) : (
              <motion.div className="flex space-x-3 ml-4">
                <motion.button 
                  onClick={openLoginModal}
                  className="px-4 py-2 rounded-full border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </motion.button>
                <motion.button 
                  onClick={openSignupModal}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </motion.button>
              </motion.div>
            )}
            
            {/* Dark Mode Toggle */}
            <motion.button 
              onClick={toggleDarkMode} 
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-full bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Authentication Modal */}
      <AuthModal />

      {/* Hero Section */}
      <header 
        ref={heroRef}
        className="hero-section-enhanced text-white min-h-screen flex items-center justify-center text-center pt-24 relative overflow-hidden"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${backgroundImages.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <AnimatedBackground />
        
        {/* Mouse Follow Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(120, 119, 198, 0.3) 0%, transparent 80%)`
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm font-medium">
                {user ? `Welcome back, ${user.fullName}!` : 'Welcome to Student Activity Centre'}
              </span>
            </motion.div>

            <div className="mb-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-2xl leading-tight"
              >
                Your Campus
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="origin-left"
              >
                <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Reimagined
                </h1>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed font-light"
            >
              {user 
                ? `Ready to explore campus activities? Check out the latest events and clubs.`
                : 'Discover events, join clubs, and connect with fellow students in a dashboard alive with activity.'
              }
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div 
              ref={searchRef} 
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/80 z-10" size={20} />
              <motion.input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search for events, clubs, people..." 
                className="w-full py-5 pl-14 pr-6 rounded-2xl bg-white/20 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-white/40 focus:ring-4 focus:ring-purple-500/30 text-white placeholder-white/70 font-medium text-lg shadow-2xl transition-all duration-300"
                animate={{
                  borderColor: searchFocused ? 'rgba(192, 132, 252, 0.8)' : 'rgba(255, 255, 255, 0.4)',
                  boxShadow: searchFocused ? '0 0 0 4px rgba(192, 132, 252, 0.3)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              />
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className="absolute mt-3 w-full text-left bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 border border-gray-200 dark:border-slate-600 overflow-hidden"
                  >
                    {searchResults.map((item, index) => (
                      <SearchResultItem key={index} item={item} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Call to Action for logged in users */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-8 flex justify-center space-x-4"
              >
                <Link
                  to={user.userType === 'admin' ? '/admin' : '/dashboard'}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById('featured-events')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="text-center">
            <motion.div
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center mb-2"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <p className="text-white/70 text-sm font-medium">Scroll to explore</p>
          </div>
        </motion.div>
      </header>

      {/* Featured Events Section */}
      <section id="featured-events" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Featured Events</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the most exciting upcoming events across campus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <StatsCard icon={Users} number="5K+" text="Active Students" delay={0.1} />
            <StatsCard icon={Target} number="50+" text="Clubs & Societies" delay={0.2} />
            <StatsCard icon={CalendarPlus} number="200+" text="Monthly Events" delay={0.3} />
            <StatsCard icon={TrendingUp} number="98%" text="Satisfaction Rate" delay={0.4} />
          </motion.div>
        </div>
      </section>

      {/* Activity Feed */}
      <section 
        id="feed" 
        className="py-20 relative"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${backgroundImages.activity})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 text-white">Live Activity Feed</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real-time updates from across the campus community
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {feedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeedItem item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      {user && (
        <div className="fixed bottom-8 right-8 z-40">
          <AnimatePresence>
            {fabOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="flex flex-col items-center space-y-4 mb-4"
              >
                <motion.button 
                  className="w-14 h-14 rounded-full bg-white dark:bg-slate-700 text-purple-600 flex items-center justify-center shadow-2xl border border-gray-200 dark:border-slate-600 hover:shadow-3xl transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CalendarPlus size={24} />
                </motion.button>
                <motion.button 
                  className="w-14 h-14 rounded-full bg-white dark:bg-slate-700 text-blue-600 flex items-center justify-center shadow-2xl border border-gray-200 dark:border-slate-600 hover:shadow-3xl transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit size={24} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button 
            onClick={() => setFabOpen(!fabOpen)} 
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              animate={{ rotate: fabOpen ? 45 : 0 }} 
              transition={{ duration: 0.3 }}
            >
              <Plus size={28} />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: fabOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 via-purple-900 to-slate-900 text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <Zap size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Student Activity Centre</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Connecting students, building communities, and creating unforgettable campus experiences.
            </p>
            <p className="text-gray-400">&copy; 2025 Student Activity Centre. All Rights Reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;