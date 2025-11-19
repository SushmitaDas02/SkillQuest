import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function AdminRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  // ensure property name matches AuthProvider (userType)
  if (!currentUser || currentUser.userType !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}
