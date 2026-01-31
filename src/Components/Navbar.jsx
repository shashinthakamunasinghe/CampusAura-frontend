import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

import { useAuth } from "../Context/AuthContext";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
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
          <div className="nav-profile">
            <MdAccountCircle className="profile-icon" size={28} />
            <span className="profile-email">{currentUser.email?.split('@')[0]}</span>
            <button className="btn-primary" onClick={logout} style={{ marginLeft: '1rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Sign Out</button>
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
