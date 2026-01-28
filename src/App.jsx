import React from "react";

import { Route,Routes } from "react-router-dom"
import Login from "./AuthenticationUI/login";
import Register from "./AuthenticationUI/register";
import NormalUserSignUp from "./AuthenticationUI/SignUp";
import AdminTopBar from "./Components/Admin.jsx";
import EventManagement from "./Components/EventManagement";

import Navbar from "./Components/Navbar.jsx";
import HeroSlider from "./Components/LandingPage/HeroSlider.jsx";
import IntroSection from "./Components/LandingPage/IntroSection.jsx";
import LatestEvents from "./Components/LandingPage/LatestEvents.jsx";
import AboutSection from "./Components/LandingPage/AboutSection.jsx";
import Marketplace from "./Components/LandingPage/MarketPlace.jsx";
import Features from "./Components/LandingPage/Features.jsx";
import ContactUs from "./Components/LandingPage/ContactUs.jsx";
import Footer from "./Components/LandingPage/Footer.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <IntroSection />
      <LatestEvents />
      <AboutSection />
      <Marketplace />
      <Features />
      <ContactUs />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<NormalUserSignUp />} />
      
      {/* Admin page */}
      <Route path="/admin" element={<AdminTopBar />} />
      
      {/* Add this test route */}
      <Route path="/test-events" element={<EventManagement />} />
    </Routes>
  );
}

export default App;
