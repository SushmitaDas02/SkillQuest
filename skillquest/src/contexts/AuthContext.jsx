// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock users database
  const mockUsers = [
    {
      id: 1,
      email: 'student@university.edu',
      password: 'password123',
      fullName: 'Demo Student',
      userType: 'student',
      studentId: 'STU2024001',
      department: 'Computer Science',
      year: '3rd Year',
      avatar: 'https://ui-avatars.com/api/?name=Demo+Student&background=6366f1&color=fff'
    },
    {
      id: 2,
      email: 'admin@university.edu',
      password: 'admin123',
      fullName: 'Campus Admin',
      userType: 'admin',
      role: 'Administrator',
      avatar: 'https://ui-avatars.com/api/?name=Campus+Admin&background=059669&color=fff'
    }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const user = mockUsers.find(u => 
        u.email === email && 
        u.password === password && 
        u.userType === userType
      );
      
      if (user) {
        // Remove password before storing
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
      } else {
        throw new Error('Invalid email, password, or user type');
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validation
      if (!userData.email || !userData.password || !userData.fullName) {
        throw new Error('Please fill all required fields');
      }

      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (userData.userType === 'student' && !userData.department) {
        throw new Error('Please select your department');
      }

      if (userData.userType === 'admin') {
        if (!userData.adminCode) {
          throw new Error('Admin access code is required');
        }
        if (userData.adminCode !== 'ADMIN2024') {
          throw new Error('Invalid admin access code');
        }
      }

      // Check if email exists
      if (mockUsers.find(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        userType: userData.userType,
        ...(userData.userType === 'student' && {
          studentId: `STU${Date.now()}`,
          department: userData.department,
          year: userData.year || '1st Year'
        }),
        ...(userData.userType === 'admin' && {
          role: 'Administrator'
        }),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName)}&background=${
          userData.userType === 'admin' ? '059669' : '6366f1'
        }&color=fff`
      };

      // Remove password from stored user
      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};