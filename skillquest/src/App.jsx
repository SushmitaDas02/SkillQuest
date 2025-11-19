// App.jsx - Updated for HashRouter
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Changed to HashRouter
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/Homepage';
import AdminPanel from './pages/AdminPanel';
import StudentDashboard from './pages/StudentDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router> {/* This will now use HashRouter */}
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;