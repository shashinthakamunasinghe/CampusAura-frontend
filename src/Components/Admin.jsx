import { useState } from 'react';
import '../Styles/Admin.css';
import { MdDashboard, MdPeople, MdEvent, MdPerson, MdShoppingCart, MdPayment, MdAnalytics } from 'react-icons/md';
import AdminDashboard from './AdminDashboard';
import ManageCoordinators from './ManageCoordinators';

function AdminTopBar() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <>
      {/* TOPBAR - Fixed */}
      <div className="admin-topbar">
        <div className="topbar-left">
          <img src="/logo.png" alt="Project Logo" className="topbar-logo" />
          <span className="project-name">CampusAura</span>
        </div>

        <div className="topbar-center">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="topbar-right">
          <div className="notification-icon">
            🔔
            <span className="notification-badge">3</span>
          </div>
          <button className="logout-btn">Logout</button>
        </div>
      </div>

      {/* SIDEBAR - Fixed */}
      <div className="admin-sidebar">
        <ul className="sidebar-menu">
          <li 
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            <MdDashboard className="sidebar-icon" />
            <span>Dashboard</span>
          </li>
          <li 
            className={activePage === "coordinators" ? "active" : ""}
            onClick={() => setActivePage("coordinators")}
          >
            <MdPeople className="sidebar-icon" />
            <span>Manage Coordinators</span>
          </li>
          <li 
            className={activePage === "events" ? "active" : ""}
            onClick={() => setActivePage("events")}
          >
            <MdEvent className="sidebar-icon" />
            <span>Event Management</span>
          </li>
          <li 
            className={activePage === "users" ? "active" : ""}
            onClick={() => setActivePage("users")}
          >
            <MdPerson className="sidebar-icon" />
            <span>User Management</span>
          </li>
          <li 
            className={activePage === "products" ? "active" : ""}
            onClick={() => setActivePage("products")}
          >
            <MdShoppingCart className="sidebar-icon" />
            <span>Product Management</span>
          </li>
          <li 
            className={activePage === "payments" ? "active" : ""}
            onClick={() => setActivePage("payments")}
          >
            <MdPayment className="sidebar-icon" />
            <span>Payments</span>
          </li>
          <li 
            className={activePage === "analytics" ? "active" : ""}
            onClick={() => setActivePage("analytics")}
          >
            <MdAnalytics className="sidebar-icon" />
            <span>Analytics</span>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT - Scrollable */}
      <div className="admin-main-content">
        {activePage === "dashboard" && <AdminDashboard />}
        {activePage === "coordinators" && <ManageCoordinators />}
        {activePage === "events" && <div style={{padding: '2rem', color: '#0f172a'}}>Event Management Content</div>}
        {activePage === "users" && <div style={{padding: '2rem', color: '#0f172a'}}>User Management Content</div>}
        {activePage === "products" && <div style={{padding: '2rem', color: '#0f172a'}}>Product Management Content</div>}
        {activePage === "payments" && <div style={{padding: '2rem', color: '#0f172a'}}>Payments Content</div>}
        {activePage === "analytics" && <div style={{padding: '2rem', color: '#0f172a'}}>Analytics Content</div>}
      </div>
    </>
  );
}

export default AdminTopBar;
