import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

/* Auth */
import Login from "./AuthenticationUI/login.jsx";
import Register from "./AuthenticationUI/studentRegister.jsx";
import NormalUserSignUp from "./AuthenticationUI/externalRegister.jsx";
import UnifiedSignUp from "./AuthenticationUI/UniFiedSignUp";

/* Layout */
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/LandingPage/Footer.jsx";

/* Protected Routes */
import { AdminRoute, ClientRoute, PublicRoute } from "./Components/ProtectedRoute.jsx";
import RoleDebugger from "./Components/RoleDebugger.jsx";

/* Admin */
import AdminTopBar from "./Components/Admin.jsx";
import EventManagement from "./Components/EventManagement";
import AdminRoute from "./Components/AdminRoute.jsx";
import CoordinatorDashboard from "./Components/CoordinatorDashboard/CoordinatorDashboard.jsx";

/* Landing Page */
import HeroSlider from "./Components/LandingPage/HeroSlider.jsx";
import IntroSection from "./Components/LandingPage/IntroSection.jsx";
import LatestEvents from "./Components/LandingPage/LatestEvents.jsx";
import AboutSection from "./Components/LandingPage/AboutSection.jsx";
import Marketplace from "./Components/LandingPage/MarketPlace.jsx";
import MarketplaceFull from "./Components/LandingPage/MarketplaceFull.jsx";
import Features from "./Components/LandingPage/Features.jsx";
import ContactUs from "./Components/LandingPage/ContactUs.jsx";

/* Events */
import FullEventPage from "./Components/EventPageUI/FullEventPage.jsx";
import EventDetails from "./Components/EventPageUI/EventDetail.jsx";

/* Auth Context */
import { useAuth } from "./Context/AuthContext";
/* Profile */
import Profile from "./Profile";
import Cart from "./Components/Cart";

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
  const { currentUser, userRole, isAdmin } = useAuth();

  console.log('🚀 App render:', { 
    authenticated: !!currentUser, 
    userRole, 
    isAdmin 
  });

  return (
    <>
      
      <Routes>
        {/* Home page - Admins are redirected to admin dashboard */}
        <Route
          path="/"
          element={
            isAdmin ? (
              <Navigate to="/admin" replace />
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
              isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Admin pages (no Navbar/Footer) */}
        <Route path="/admin" element={<AdminTopBar />} />
        <Route path="/coordinator" element={<CoordinatorDashboard />} />
        <Route path="/test-events" element={<EventManagement />} />
      </Routes>
    </>
  );
}

export default App;
