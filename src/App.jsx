import React from "react";
import { Route, Routes } from "react-router-dom";

/* Auth */
import Login from "./AuthenticationUI/login.jsx";
import Register from "./AuthenticationUI/studentRegister.jsx";
import NormalUserSignUp from "./AuthenticationUI/externalRegister.jsx";
import UnifiedSignUp from "./AuthenticationUI/UniFiedSignUp";

/* Layout */
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/LandingPage/Footer.jsx";

/* Admin */
import AdminTopBar from "./Components/Admin.jsx";
import EventManagement from "./Components/EventManagement";

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
  return (
    <>
      <Routes>
        {/* Public pages */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        {/* Auth pages */}
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <UnifiedSignUp />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup/user"
          element={
            <>
              <Navbar />
              <NormalUserSignUp />
              <Footer />
            </>
          }
        />

        {/* Event pages */}
        <Route
          path="/events"
          element={
            <>
              <Navbar />
              <FullEventPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/events/:id"
          element={
            <>
              <Navbar />
              <EventDetails />
              <Footer />
            </>
          }
        />

        {/* Marketplace full page */}
        <Route
          path="/marketplace"
          element={
            <>
              <Navbar />
              <MarketplaceFull />
              <Footer />
            </>
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

        {/* Admin pages (no Navbar/Footer) */}
        <Route path="/admin" element={<AdminTopBar />} />
        <Route path="/test-events" element={<EventManagement />} />
      </Routes>
    </>
  );
}

export default App;
