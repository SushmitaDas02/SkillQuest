import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Initialize users from localStorage or set demo users
  const [users, setUsers] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("users"));
      if (Array.isArray(stored)) return stored;
    } catch (err) {
      console.error("Error parsing users from localStorage:", err);
    }

    const demoUsers = [
      { email: "admin@demo.com", password: "admin123", userType: "admin" },
      { email: "user@demo.com", password: "user123", userType: "user" },
    ];
    localStorage.setItem("users", JSON.stringify(demoUsers));
    return demoUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("currentUser"));
      return stored || null;
    } catch (err) {
      console.error("Error parsing currentUser from localStorage:", err);
      return null;
    }
  });

  // ✅ Keep users in sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (err) {
      console.error("Error saving users to localStorage:", err);
    }
  }, [users]);

  // ✅ Auto-redirect if logged in (after render)
  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentUser, navigate]);

  // ✅ Signup function
  const signup = (email, password) => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      alert("User already exists!");
      return false;
    }

    const newUser = { email, password, userType: "user" };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    navigate("/dashboard");
    return true;
  };

  // ✅ Login function
  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert("Invalid credentials!");
      return false;
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/dashboard");
    return true;
  };

  // ✅ Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Safe custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
