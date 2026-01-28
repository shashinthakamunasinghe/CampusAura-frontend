import React from "react";

import { Route,Routes } from "react-router-dom"
import Login from "./AuthenticationUI/login";
import EventDetails from "./Components/EventPageUI/EventDetail.jsx";

import Navbar from "./Components/Navbar.jsx";
import HeroSlider from "./Components/LandingPage/HeroSlider.jsx";
import IntroSection from "./Components/LandingPage/IntroSection.jsx";
import LatestEvents from "./Components/LandingPage/LatestEvents.jsx";
import AboutSection from "./Components/LandingPage/AboutSection.jsx";
import Marketplace from "./Components/LandingPage/MarketPlace.jsx";
import Features from "./Components/LandingPage/Features.jsx";
import ContactUs from "./Components/LandingPage/ContactUs.jsx";
import Footer from "./Components/LandingPage/Footer.jsx";

import UnifiedSignUp from "./AuthenticationUI/UnifiedSignUp";
import FullEventPage from "./Components/EventPageUI/FullEventPage.jsx";

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
    <Navbar />
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<UnifiedSignUp />} />
      <Route path="/events" element={<FullEventPage />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
