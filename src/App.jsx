import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

/* Auth */
import Login from "./Components/auth/login.jsx";
import Register from "./Components/auth/StudentRegister.jsx";
import NormalUserSignUp from "./Components/auth/ExternalRegister.jsx";
import UnifiedSignUp from "./Components/auth/UniFiedSignUp";

/* Layout */
import Navbar from "./Components/shared/Navbar.jsx";
import Footer from "./Components/landing/Footer.jsx";

/* Protected Routes */
import { AdminRoute, ClientRoute, PublicRoute, CoordinatorRoute } from "./Components/shared/ProtectedRoute.jsx";

/* Admin */
import AdminTopBar from "./Components/admin/Admin.jsx";
import Coordinator from "./Components/coordinator/Coordinator.jsx";
import EventManagement from "./Components/events/EventManagement";
import CoordinatorDashboard from "./Components/coordinator/CoordinatorDashboard.jsx";

/* Landing Page */
import HeroSlider from "./Components/landing/HeroSlider.jsx";
import IntroSection from "./Components/landing/IntroSection.jsx";
import LatestEvents from "./Components/landing/LatestEvents.jsx";
import AboutSection from "./Components/landing/AboutSection.jsx";
import Marketplace from "./Components/landing/MarketPlace.jsx";
import MarketplaceFull from "./Components/landing/MarketplaceFull.jsx";
import Features from "./Components/landing/Features.jsx";
import ContactUs from "./Components/landing/ContactUs.jsx";

/* Events */
import FullEventPage from "./Components/events/FullEventPage.jsx";
import EventDetails from "./Components/events/EventDetail.jsx";

/* Auth Context */
import { useAuth } from "./Context/AuthContext";
/* Profile */
import Profile from "./pages/Profile";
import Cart from "./Components/marketplace/Cart";

function Home() {
  return (
    <>
      <HeroSlider />
      <IntroSection />
      <LatestEvents />
      <AboutSection />
      <Marketplace />
      <Features />
      <ContactUs />
    </>
  );
}

function App() {
  const { currentUser, userRole, isAdmin, isCoordinator } = useAuth();

  console.log('🚀 App render:', { 
    authenticated: !!currentUser, 
    userRole, 
    isAdmin,
    isCoordinator
  });

  return (
    <>
      
      <Routes>
        {/* Home page - Admins and Coordinators are redirected to their respective dashboards */}
        <Route
          path="/"
          element={
            isAdmin ? (
              <Navigate to="/admin" replace />
            ) : isCoordinator ? (
              <Navigate to="/coordinator" replace />
            ) : (
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            )
          }
        />

        {/* Auth pages - redirect if already logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute redirectAuthenticated={true}>
              <Navbar />
              <Login />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute redirectAuthenticated={true}>
              <Navbar />
              <Register />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute redirectAuthenticated={true}>
              <Navbar />
              <UnifiedSignUp />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/signup/user"
          element={
            <PublicRoute redirectAuthenticated={true}>
              <Navbar />
              <NormalUserSignUp />
              <Footer />
            </PublicRoute>
          }
        />

        {/* Event pages - Only for non-admin users (STUDENT, COORDINATOR, EXTERNAL_USER) */}
        <Route
          path="/events"
          element={
            <ClientRoute>
              <Navbar />
              <FullEventPage />
              <Footer />
            </ClientRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ClientRoute>
              <Navbar />
              <EventDetails />
              <Footer />
            </ClientRoute>
          }
        />

        {/* Marketplace full page - Only for non-admin users */}
        <Route
          path="/marketplace"
          element={
            <ClientRoute>
              <Navbar />
              <MarketplaceFull />
              <Footer />
            </ClientRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
              <Footer />
            </>
          }
        />

        {/* Admin pages - Only for ADMIN role (no Navbar/Footer) */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminTopBar />
            </AdminRoute>
          } 
        />

        {/* Coordinator pages - Only for COORDINATOR role (no Navbar/Footer) */}
        <Route 
          path="/coordinator" 
          element={
            <CoordinatorRoute>
              <Coordinator />
            </CoordinatorRoute>
          } 
        />

        <Route 
          path="/test-events" 
          element={
            <AdminRoute>
              <EventManagement />
            </AdminRoute>
          } 
        />

        {/* Catch all - redirect based on authentication */}
        <Route
          path="*"
          element={
            currentUser ? (
              isAdmin ? (
                <Navigate to="/admin" replace />
              ) : isCoordinator ? (
                <Navigate to="/coordinator" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
