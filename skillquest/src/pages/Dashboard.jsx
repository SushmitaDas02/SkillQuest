// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome, {currentUser?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            You are successfully logged in to your {currentUser?.userType} dashboard.
          </p>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✅ Authentication is working perfectly! You can now go back to the homepage and test the login/signup forms.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;