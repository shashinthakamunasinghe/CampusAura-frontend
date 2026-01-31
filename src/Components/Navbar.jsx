import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

import { useAuth } from "../Context/AuthContext";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">CH</div>
        <span className="brand">Campus Aura</span>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>Events</NavLink></li>
        <li><NavLink to="/Marketplace" className={({ isActive }) => (isActive ? "active" : "")}>Marketplace</NavLink></li>
      </ul>

      <div className="nav-actions">
        {currentUser ? (
          <div className="nav-profile" style={{ position: 'relative' }}>
            <div
              className="profile-trigger"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MdAccountCircle className="profile-icon" size={32} />
            </div>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <span className="user-name">{currentUser.email?.split('@')[0]}</span>
                  <span className="user-email">{currentUser.email}</span>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                  Profile
                </Link>
                <div className="dropdown-item logout" onClick={() => { logout(); setIsProfileOpen(false); }}>
                  Sign Out
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-primary">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="btn-primary">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
