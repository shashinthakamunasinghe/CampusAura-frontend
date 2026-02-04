import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

/**
 * Protected route component for admin-only pages
 * Redirects to login if user is not authenticated or not an admin
 */
const AdminRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();

  // If user is not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but not an admin, redirect to home
  if (userRole !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is an admin, allow access
  return children;
};

export default AdminRoute;
