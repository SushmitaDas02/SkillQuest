'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X, LogIn, UserPlus, GraduationCap, Shield,
  User, Mail, Key, Lock, Eye, EyeOff, UserCheck
} from 'lucide-react';

/* --------------------------------------------------------------
   AUTH MODAL – FULLY WORKING (type, validate, submit, toggle)
   -------------------------------------------------------------- */
const AuthModal = () => {
  /* -------------------------- STATE -------------------------- */
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: '',
    adminCode: '',
    password: '',
    confirmPassword: '',
  });

  const authModalRef = useRef(null);

  /* ----------------------- INPUT CHANGE ---------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // clear error for this field as soon as the user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  /* ---------------------- TOGGLE MODE ----------------------- */
  const toggleAuthMode = () => {
    setIsLogin(prev => !prev);
    setFormErrors({});
    setAuthError('');
    setSuccessMessage('');
    setFormData({
      fullName: '',
      email: '',
      studentId: '',
      department: '',
      adminCode: '',
      password: '',
      confirmPassword: '',
    });
  };

  /* ----------------------- VALIDATION ----------------------- */
  const validateForm = () => {
    const errors = {};

    if (!isLogin) {
      if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
      if (userType === 'admin' && formData.adminCode !== 'ADMIN2024')
        errors.adminCode = 'Invalid admin code';
    }

    if (!formData.email.includes('@')) errors.email = 'Enter a valid email';
    if (formData.password.length < 6)
      errors.password = 'Password must be at least 6 characters';
    if (!isLogin && formData.password !== formData.confirmPassword)
      errors.confirmPassword = 'Passwords do not match';

    return errors;
  };

  /* ----------------------- SUBMIT -------------------------- */
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMessage('');
    setFormErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setAuthLoading(true);
    try {
      // ---- Replace with your real API call ----
      await new Promise(res => setTimeout(res, 1200)); // fake delay

      setSuccessMessage(
        isLogin
          ? 'Logged in successfully!'
          : `Account created as ${userType === 'student' ? 'Student' : 'Admin'}!`
      );

      setTimeout(() => setAuthModalOpen(false), 1500);
    } catch {
      setAuthError('Something went wrong. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  /* --------------------------- JSX --------------------------- */
  return (
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
            {/* CLOSE */}
            <button
              onClick={() => {
                setAuthModalOpen(false);
                setAuthError('');
                setSuccessMessage('');
                setFormErrors({});
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>

            {/* HEADER */}
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

            {/* USER TYPE TOGGLE – SIGNUP ONLY */}
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

            {/* SUCCESS */}
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

            {/* ERROR */}
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

            {/* FORM */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">

              {/* FULL NAME – SIGNUP */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                        formErrors.fullName
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                          : 'border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                      }`}
                      required
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{formErrors.fullName}</p>
                  )}
                </motion.div>
              )}

              {/* EMAIL */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                      formErrors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                        : 'border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    }`}
                    required
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{formErrors.email}</p>
                )}
              </div>

              {/* STUDENT FIELDS */}
              {!isLogin && userType === 'student' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* Student ID */}
                    <div>
                      <div className="relative">
                        <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          placeholder="Student ID"
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                            formErrors.studentId
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                              : 'border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                          }`}
                        />
                      </div>
                      {formErrors.studentId && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{formErrors.studentId}</p>
                      )}
                    </div>

                    {/* Department */}
                    <div>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          placeholder="Department"
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                            formErrors.department
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                              : 'border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                          }`}
                        />
                      </div>
                      {formErrors.department && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{formErrors.department}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ADMIN CODE */}
              {!isLogin && userType === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="adminCode"
                      value={formData.adminCode}
                      onChange={handleInputChange}
                      placeholder="Admin Access Code (ADMIN2024)"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                        formErrors.adminCode
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                          : 'border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      required
                    />
                  </div>
                  {formErrors.adminCode && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{formErrors.adminCode}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                    Use <span className="font-mono bg-gray-100 dark:bg-slate-700 px-1 rounded">ADMIN2024</span> for demo
                  </p>
                </motion.div>
              )}

              {/* PASSWORD */}
              <div>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                      formErrors.password
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                        : 'border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    }`}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{formErrors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD – SIGNUP */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                        formErrors.confirmPassword
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                          : 'border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{formErrors.confirmPassword}</p>
                  )}
                </motion.div>
              )}

              {/* SUBMIT */}
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
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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

            {/* TOGGLE LOGIN / SIGNUP */}
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

            {/* ACCOUNT INFO */}
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

            {/* DEMO INSTRUCTIONS */}
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-xs text-yellow-700 dark:text-yellow-300 text-center">
                <strong>Demo:</strong> Any email + password (≥6 chars). Admin code = <code className="bg-gray-200 dark:bg-slate-700 px-1 rounded">ADMIN2024</code>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;