import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">CH</div>
        <span className="brand">Campus Aura</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/Marketplace">Marketplace</Link></li>
        <li>Community</li>
      </ul>

      <div className="nav-actions">
        <Link to="/login">
          <button className="btn-primary">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="btn-primary">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}
