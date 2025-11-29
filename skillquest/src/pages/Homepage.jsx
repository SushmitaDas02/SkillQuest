// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, Users, Calendar, Target, Zap, BookOpen, Trophy,
  Mic, Palette, Code, Heart, Globe, Rocket, Star, ArrowRight,
  LogIn, UserPlus, X, Mail, Lock, User, GraduationCap, Settings,
  ChevronRight, ChevronLeft, Play, Clock, MapPin, Share, Building,
  Facebook, Twitter, Instagram, Linkedin, Menu, X as CloseIcon,
  Shield, CheckCircle, AlertCircle, Phone, Mail as MailIcon,
  Map, Award, Globe as GlobeIcon, Users as UsersIcon,
  Camera, Music, GamepadIcon, Leaf
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const { currentUser: user, logout, login, signup } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    department: '',
    year: '',
    adminCode: ''
  });

  const authModalRef = useRef(null);

  // Departments data
  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Economics',
    'Psychology',
    'Biology',
    'Chemistry',
    'Physics',
    'Mathematics',
    'English Literature',
    'History',
    'Art & Design',
    'Music',
    'Other'
  ];

  // Academic years
  const academicYears = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    '5th Year',
    'Postgraduate'
  ];

  // Featured activities data
  const activities = [
    { id: 1, title: 'Hackathon 2024', category: 'Technical', icon: Code, participants: 250, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Cultural Fest', category: 'Cultural', icon: Mic, participants: 500, color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Sports Tournament', category: 'Sports', icon: Trophy, participants: 300, color: 'from-green-500 to-emerald-500' },
    { id: 4, title: 'Art Workshop', category: 'Arts', icon: Palette, participants: 80, color: 'from-orange-500 to-red-500' },
    { id: 5, title: 'Tech Talks', category: 'Technical', icon: Users, participants: 150, color: 'from-indigo-500 to-blue-500' },
    { id: 6, title: 'Social Service', category: 'Community', icon: Heart, participants: 200, color: 'from-rose-500 to-pink-500' },
  ];

  // Campus clubs data
  const clubs = [
    { 
      id: 1, 
      name: 'Tech Club', 
      category: 'Technical', 
      members: 450, 
      icon: Code, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Explore cutting-edge technology and innovation through workshops, hackathons, and collaborative projects.',
      president: 'Alex Chen',
      established: '2018',
      meetings: 'Every Wednesday, 4 PM',
      room: 'Tech Lab 101'
    },
    { 
      id: 2, 
      name: 'Cultural Society', 
      category: 'Cultural', 
      members: 320, 
      icon: Globe, 
      color: 'from-purple-500 to-pink-500',
      description: 'Celebrate diversity through cultural events, festivals, and international student gatherings.',
      president: 'Priya Sharma',
      established: '2015',
      meetings: 'Every Friday, 5 PM',
      room: 'Cultural Center'
    },
    { 
      id: 3, 
      name: 'Sports Association', 
      category: 'Sports', 
      members: 600, 
      icon: Trophy, 
      color: 'from-green-500 to-emerald-500',
      description: 'Promote sports and physical wellness through tournaments, training sessions, and fitness programs.',
      president: 'Marcus Johnson',
      established: '2010',
      meetings: 'Daily, 6-8 PM',
      room: 'Sports Complex'
    },
    { 
      id: 4, 
      name: 'Art & Design Club', 
      category: 'Arts', 
      members: 180, 
      icon: Palette, 
      color: 'from-orange-500 to-red-500',
      description: 'Foster creativity and artistic expression through workshops, exhibitions, and collaborative projects.',
      president: 'Sophie Williams',
      established: '2019',
      meetings: 'Every Thursday, 3 PM',
      room: 'Art Studio B'
    },
    { 
      id: 5, 
      name: 'Entrepreneurship Cell', 
      category: 'Innovation', 
      members: 220, 
      icon: Rocket, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Nurture future business leaders through startup competitions, mentorship, and networking events.',
      president: 'Ryan Thompson',
      established: '2017',
      meetings: 'Every Tuesday, 4:30 PM',
      room: 'Innovation Hub'
    },
    { 
      id: 6, 
      name: 'Social Service Club', 
      category: 'Community', 
      members: 350, 
      icon: Heart, 
      color: 'from-rose-500 to-pink-500',
      description: 'Make a difference in the community through volunteering, charity events, and social initiatives.',
      president: 'Maria Garcia',
      established: '2012',
      meetings: 'Every Saturday, 10 AM',
      room: 'Community Hall'
    },
  ];

  // Events data
  const events = [
    { 
      id: 1, 
      title: 'Tech Innovation Summit', 
      date: 'Mar 20, 2024', 
      time: '10:00 AM', 
      location: 'Main Auditorium', 
      type: 'conference',
      description: 'Annual technology conference featuring industry leaders and cutting-edge innovations.',
      organizer: 'Tech Club',
      capacity: 300,
      registered: 245,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'
    },
    { 
      id: 2, 
      title: 'Startup Pitch Competition', 
      date: 'Mar 22, 2024', 
      time: '2:00 PM', 
      location: 'Innovation Hub', 
      type: 'competition',
      description: 'Pitch your startup ideas to investors and win funding for your business venture.',
      organizer: 'Entrepreneurship Cell',
      capacity: 100,
      registered: 87,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400'
    },
    { 
      id: 3, 
      title: 'Cultural Night', 
      date: 'Mar 25, 2024', 
      time: '6:00 PM', 
      location: 'Open Amphitheater', 
      type: 'cultural',
      description: 'An evening of diverse cultural performances, food, and international celebrations.',
      organizer: 'Cultural Society',
      capacity: 500,
      registered: 423,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
    },
    { 
      id: 4, 
      title: 'Sports Day', 
      date: 'Mar 28, 2024', 
      time: '8:00 AM', 
      location: 'Sports Complex', 
      type: 'sports',
      description: 'Annual inter-department sports competition with various athletic events and games.',
      organizer: 'Sports Association',
      capacity: 200,
      registered: 198,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'
    },
  ];

  // Facilities data
  const facilities = [
    {
      id: 1,
      name: 'Innovation Lab',
      description: 'State-of-the-art technology lab with 3D printers, laser cutters, and prototyping equipment for student projects.',
      capacity: 30,
      equipment: ['3D Printers', 'Laser Cutters', 'Electronics Workbench', 'VR Equipment'],
      image: 'https://images.unsplash.com/photo-1581093458791-8a6b6d0c20c0?w=400',
      hours: '9 AM - 9 PM'
    },
    {
      id: 2,
      name: 'Art Studio',
      description: 'Creative space with natural lighting, various art supplies, and dedicated areas for different art forms.',
      capacity: 25,
      equipment: ['Easels', 'Pottery Wheels', 'Drawing Tables', 'Painting Supplies'],
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
      hours: '10 AM - 8 PM'
    },
    {
      id: 3,
      name: 'Music Room',
      description: 'Sound-proof room with various musical instruments and recording equipment for practice and performances.',
      capacity: 15,
      equipment: ['Piano', 'Guitars', 'Drums', 'Recording Equipment'],
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
      hours: '8 AM - 10 PM'
    },
    {
      id: 4,
      name: 'Conference Hall',
      description: 'Modern conference facility with advanced presentation equipment and comfortable seating arrangement.',
      capacity: 100,
      equipment: ['Projector', 'Sound System', 'Video Conferencing', 'Whiteboards'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      hours: '7 AM - 11 PM'
    },
  ];

  // About section data
  const aboutStats = [
    { number: '50+', label: 'Active Clubs' },
    { number: '10,000+', label: 'Students' },
    { number: '200+', label: 'Monthly Events' },
    { number: '15', label: 'Years of Excellence' },
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Director',
      department: 'Student Affairs',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Faculty Advisor',
      department: 'Computer Science',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Program Coordinator',
      department: 'Student Activities',
      experience: '6 years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
    },
  ];

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (message) setMessage('');
  };

  // Auth handler
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (authMode === 'login') {
        await login(formData.email, formData.password, userType);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          setAuthModalOpen(false);
          navigate(userType === 'admin' ? '/admin' : '/dashboard');
        }, 1500);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        await signup({
          ...formData,
          userType: userType
        });
        
        setMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          setAuthModalOpen(false);
          navigate(userType === 'admin' ? '/admin' : '/dashboard');
        }, 1500);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const openLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
    resetForm();
  };

  const openSignup = () => {
    setAuthMode('signup');
    setUserType('student');
    setAuthModalOpen(true);
    resetForm();
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      department: '',
      year: '',
      adminCode: ''
    });
    setMessage('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Carousel controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activities.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activities.length) % activities.length);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authModalRef.current && !authModalRef.current.contains(event.target)) {
        setAuthModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Enhanced Auth Modal Component
  const AuthModal = () => (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            ref={authModalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {authMode === 'login' ? `Login as ${userType}` : `Create ${userType} Account`}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {authMode === 'login' 
                      ? `Access your ${userType} dashboard` 
                      : `Join as ${userType === 'student' ? 'a student' : 'an administrator'}`
                    }
                  </p>
                </div>
                <button
                  onClick={() => setAuthModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* User Type Toggle */}
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mt-4">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
                    userType === 'student'
                      ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <GraduationCap size={16} />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('admin')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
                    userType === 'admin'
                      ? 'bg-white dark:bg-gray-600 shadow text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <Shield size={16} />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Demo Credentials */}
              {authMode === 'login' && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Demo {userType}:</strong><br />
                    {userType === 'student' 
                      ? 'student@university.edu / password123'
                      : 'admin@university.edu / admin123'
                    }
                  </p>
                </div>
              )}

              {/* Messages */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg mb-4 flex items-start space-x-2 ${
                    message.includes('successful') 
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  }`}
                >
                  {message.includes('successful') ? (
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}

              {/* Enhanced Form */}
              <form onSubmit={handleAuth} className="space-y-4">
                {/* Full Name - Required for signup */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required={authMode === 'signup'}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Student-specific fields */}
                {authMode === 'signup' && userType === 'student' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Department *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Academic Year
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select Year</option>
                          {academicYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Code */}
                {authMode === 'signup' && userType === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Admin Access Code *
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        name="adminCode"
                        value={formData.adminCode}
                        onChange={handleInputChange}
                        placeholder="Enter admin access code"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Use <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">ADMIN2024</code> for demo
                    </p>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Must be at least 6 characters long
                  </p>
                </div>

                {/* Confirm Password - Signup only */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                    userType === 'admin' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      {authMode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                      <span>
                        {authMode === 'login' 
                          ? `Login as ${userType}`
                          : `Create ${userType} Account`
                        }
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Switch Auth Mode */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={switchAuthMode}
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors"
                  >
                    {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="fixed w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Student Activity Centre</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 -mt-1">University Hub</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: 'About', id: 'about' },
                { name: 'Activities', id: 'activities' },
                { name: 'Clubs', id: 'clubs' },
                { name: 'Events', id: 'events' },
                { name: 'Facilities', id: 'facilities' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Auth & Dark Mode - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <img src={user.avatar} alt={user.fullName} className="w-8 h-8 rounded-full border-2 border-blue-500" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.fullName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user.userType}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={openLogin}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center space-x-2"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={openSignup}
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {mobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-2 overflow-hidden"
              >
                <div className="py-2 space-y-1">
                  {[
                    { name: 'About', id: 'about' },
                    { name: 'Activities', id: 'activities' },
                    { name: 'Clubs', id: 'clubs' },
                    { name: 'Events', id: 'events' },
                    { name: 'Facilities', id: 'facilities' },
                    { name: 'Contact', id: 'contact' }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      {item.name}
                    </button>
                  ))}
                  
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-white">{user.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.userType}</p>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { openLogin(); setUserType('student'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center space-x-2"
                      >
                        <GraduationCap size={16} />
                        <span>Login as Student</span>
                      </button>
                      <button
                        onClick={() => { openLogin(); setUserType('admin'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center space-x-2"
                      >
                        <Shield size={16} />
                        <span>Login as Admin</span>
                      </button>
                      <button
                        onClick={() => { openSignup(); setMobileMenuOpen(false); }}
                        className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                Student
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Activity Centre
                </span>
              </h1>
              
              {/* IMPROVED: High visibility text with better contrast */}
              <p className="text-xl font-semibold mb-8 leading-relaxed bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Discover events, join clubs, attend workshops, and collaborate in innovative spaces designed for your growth and success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('activities')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold flex items-center space-x-2"
                >
                  <span>Explore Activities</span>
                  <ArrowRight size={20} />
                </button>
                
                {/* IMPROVED: Better visible Join Club button */}
                <button 
                  onClick={() => scrollToSection('clubs')}
                  className="px-8 py-4 border-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 font-semibold shadow-lg"
                >
                  Join a Club
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {activities.slice(0, 4).map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center mb-4`}>
                        <activity.icon size={24} className="text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{activity.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.category}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About Student Activity Centre</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering students through diverse activities, fostering leadership, and building a vibrant campus community since 2009.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Mission & Vision</h3>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The Student Activity Centre serves as the heart of campus life, providing students with opportunities 
                  to explore their interests, develop new skills, and create lasting memories.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We believe in holistic development through extracurricular activities that complement academic learning 
                  and prepare students for successful careers and meaningful lives.
                </p>
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <Award size={20} />
                  <span className="font-semibold">Recognized as Best Student Activity Centre 2023</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {aboutStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Meet Our Team</h3>
            <p className="text-gray-600 dark:text-gray-300">Dedicated professionals committed to student success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-600 shadow-lg group-hover:scale-105 transition-transform"
                />
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{member.department}</p>
                <p className="text-gray-500 dark:text-gray-500 text-xs">Experience: {member.experience}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Featured Activities</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Discover what's happening on campus</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex"
                animate={{ x: -currentSlide * 100 + '%' }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {activities.map((activity, index) => (
                  <div key={activity.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-3xl p-8 border border-gray-200 dark:border-gray-600 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center shadow-lg`}>
                            <activity.icon size={24} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{activity.title}</h3>
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{activity.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">{activity.participants}+</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Participants</div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Join this exciting {activity.category.toLowerCase()} activity and connect with fellow students.
                      </p>
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:scale-110 transition-transform z-10"
            >
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:scale-110 transition-transform z-10"
            >
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section id="clubs" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Campus Clubs</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Find your community and pursue your passions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${club.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <club.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{club.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{club.description}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Category:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{club.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Members:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{club.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">President:</span>
                    <span className="text-gray-700 dark:text-gray-300">{club.president}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Meetings:</span>
                    <span className="text-gray-700 dark:text-gray-300 text-right">{club.meetings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Room:</span>
                    <span className="text-gray-700 dark:text-gray-300">{club.room}</span>
                  </div>
                </div>
                
                {/* IMPROVED: Better visible Join Club button */}
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold shadow-md hover:scale-105">
                  Join Club
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Mark your calendar and join the excitement</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.type === 'conference' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      event.type === 'competition' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      event.type === 'cultural' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 dark:text-white text-xl">{event.title}</h3>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">by</div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{event.organizer}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {event.registered}/{event.capacity} registered
                      </span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Facilities</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">State-of-the-art spaces for learning and collaboration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{facility.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{facility.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-500">Capacity:</span>
                      <span className="text-gray-700 dark:text-gray-300">{facility.capacity} people</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-500">Hours:</span>
                      <span className="text-gray-700 dark:text-gray-300">{facility.hours}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-500 text-sm">Equipment:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {facility.equipment.map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                    Book Facility
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Get in touch with the Student Activity Centre</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Visit Our Centre</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Map className="text-blue-600 dark:text-blue-400" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Address</p>
                    <p className="text-gray-600 dark:text-gray-400">Student Activity Centre, University Campus</p>
                    <p className="text-gray-600 dark:text-gray-400">123 University Avenue, City, State 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Phone</p>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MailIcon className="text-blue-600 dark:text-blue-400" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">sac@university.edu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-blue-600 dark:text-blue-400" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Hours</p>
                    <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-400">Saturday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Student Activity Centre</h3>
                  <p className="text-sm text-gray-400">University Hub</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting students, building communities, and creating unforgettable campus experiences.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: 'About', id: 'about' },
                  { name: 'Activities', id: 'activities' },
                  { name: 'Clubs', id: 'clubs' },
                  { name: 'Events', id: 'events' },
                  { name: 'Facilities', id: 'facilities' },
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-400 hover:text-white text-sm transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 University Campus</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ sac@university.edu</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a key={index} href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Student Activity Centre. All rights reserved. | Designed with ❤️ for students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;