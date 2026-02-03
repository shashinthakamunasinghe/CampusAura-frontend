import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

/**
 * ProtectedRoute - Protects routes based on authentication
 * Redirects unauthenticated users to login
 */
export function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * AdminRoute - STRICTLY for ADMIN role ONLY
 * - Not logged in → /login
 * - Logged in but NOT admin → /
 * - Admin → Allow access
 */
export function AdminRoute({ children }) {
  const { currentUser, userRole, isAdmin } = useAuth();

  console.log('🔐 AdminRoute Check:', { 
    currentUser: !!currentUser, 
    userRole, 
    isAdmin 
  });

  // Not authenticated at all
  if (!currentUser) {
    console.log('❌ AdminRoute: Not logged in → /login');
    return <Navigate to="/login" replace />;
  }

  // Logged in but NOT admin - kick them out
  if (!isAdmin) {
    console.log('❌ AdminRoute: Not admin (role:', userRole, ') → /');
    return <Navigate to="/" replace />;
  }

  // Admin user - grant access
  console.log('✅ AdminRoute: Admin access granted');
  return children;
}

/**
 * ClientRoute - ONLY for normal users (STUDENT, COORDINATOR, EXTERNAL_USER)
 * 🔥 CRITICAL: Admins are KICKED OUT to /admin
 * - Not logged in → /login
 * - Admin → /admin (FORCED REDIRECT)
 * - Normal user → Allow access
 */
export function ClientRoute({ children }) {
  const { currentUser, userRole, isAdmin } = useAuth();

  console.log('🔐 ClientRoute Check:', { 
    currentUser: !!currentUser, 
    userRole, 
    isAdmin 
  });

  // Not authenticated at all
  if (!currentUser) {
    console.log('❌ ClientRoute: Not logged in → /login');
    return <Navigate to="/login" replace />;
  }

  // 🔥 ADMIN TRYING TO ACCESS CLIENT PAGES - FORCE TO ADMIN DASHBOARD
  if (isAdmin) {
    console.log('🚫 ClientRoute: Admin detected → FORCING to /admin');
    return <Navigate to="/admin" replace />;
  }

  // Normal user - grant access
  console.log('✅ ClientRoute: Normal user access granted');
  return children;
}

/**
 * PublicRoute - Accessible to all, but redirects if already logged in
 * Used for /login, /register, /signup pages
 * - Admin logged in → /admin
 * - Normal user logged in → /
 * - Guest → Allow access
 */
export function PublicRoute({ children, redirectAuthenticated = false }) {
  const { currentUser, userRole, isAdmin } = useAuth();

  console.log('🔐 PublicRoute Check:', { 
    currentUser: !!currentUser, 
    userRole, 
    isAdmin,
    redirectAuthenticated 
  });

  // If redirectAuthenticated flag is set and user is logged in
  if (redirectAuthenticated && currentUser) {
    // Admin trying to access login/signup → send to admin dashboard
    if (isAdmin) {
      console.log('🚫 PublicRoute: Admin trying to access auth page → /admin');
      return <Navigate to="/admin" replace />;
    }
    // Normal user trying to access login/signup → send to home
    console.log('✅ PublicRoute: Normal user already logged in → /');
    return <Navigate to="/" replace />;
  }

  // Guest or no redirect needed - allow access
  console.log('✅ PublicRoute: Access granted');
  return children;
}

/**
 * CoordinatorRoute - Only allows COORDINATOR and ADMIN roles
 */
export function CoordinatorRoute({ children }) {
  const { currentUser, isAdmin, isCoordinator } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin && !isCoordinator) {
    return <Navigate to="/" replace />;
  }

  return children;
}
