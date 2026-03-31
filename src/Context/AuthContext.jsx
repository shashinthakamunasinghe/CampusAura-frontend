import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from backend
  const fetchUserData = async (user) => {
    if (!user) {
      setUserData(null);
      setUserRole(null);
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_BASE_URL}/api/user/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Γ£à User data fetched:', data);
        console.log('Γ£à User role:', data.role);
        setUserData(data);
        setUserRole(data.role); // ADMIN, STUDENT, COORDINATOR, EXTERNAL_USER
      } else {
        console.error('Γ¥î Failed to fetch user data:', response.status);
        setUserData(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
      setUserRole(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await fetchUserData(user);
      } else {
        setUserData(null);
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    setUserData(null);
    setUserRole(null);
    return signOut(auth);
  };

  const refreshUserData = async () => {
    if (currentUser) {
      await fetchUserData(currentUser);
    }
  };

  const value = {
    currentUser,
    userRole,
    userData,
    logout,
    refreshUserData,
    isAdmin: userRole === 'ADMIN',
    isCoordinator: userRole === 'COORDINATOR',
    isStudent: userRole === 'STUDENT',
    isExternalUser: userRole === 'EXTERNAL_USER',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
