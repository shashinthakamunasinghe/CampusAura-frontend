import { useState } from 'react';
import '../Styles/Admin.css';
import { MdDashboard, MdPeople, MdEvent, MdPerson, MdShoppingCart, MdEmail } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';
import AdminDashboard from './AdminDashboard';
import ManageCoordinators from './ManageCoordinators';
import EventManagement from './EventManagement';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';

function AdminTopBar() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminDashboard />;
      case 'events':
        return <EventManagement />;
      case 'coordinators':
        return <ManageCoordinators />;
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'payments':
        return <div style={{padding: '2rem', color: '#0f172a'}}>Payments Content</div>;
      default:
        return <AdminDashboard />;
    }
  };

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
            <MdEmail style={{ color: '#0A5DB8', fontSize: '2rem', verticalAlign: 'middle' }} />
            <span className="notification-badge">3</span>
          </div>
          <button className="logout-btn">Logout</button>
        </div>
      </div>

      {/* SIDEBAR + MAIN CONTENT WRAPPER */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* SIDEBAR - Fixed */}
        <div className="admin-sidebar">
          <ul className="admin-sidebar-list" style={{listStyle: 'none', padding: 0, margin: 0}}>
            <li
              className={activeSection === "overview" ? "active" : ""}
              onClick={() => setActiveSection("overview")}
              style={{display: 'flex', alignItems: 'center', gap: '14px'}}
            >
              <MdDashboard className="sidebar-icon" />
              <span>Overview</span>
            </li>
            <li
              className={activeSection === "coordinators" ? "active" : ""}
              onClick={() => setActiveSection("coordinators")}
              style={{display: 'flex', alignItems: 'center', gap: '14px'}}
            >
              <MdPeople className="sidebar-icon" />
              <span>Manage Coordinators</span>
            </li>
            <li
              className={activeSection === "events" ? "active" : ""}
              onClick={() => setActiveSection("events")}
              style={{display: 'flex', alignItems: 'center', gap: '14px'}}
            >
              <MdEvent className="sidebar-icon" />
              <span>Event Management</span>
            </li>
            <li
              className={activeSection === "users" ? "active" : ""}
              onClick={() => setActiveSection("users")}
              style={{display: 'flex', alignItems: 'center', gap: '14px'}}
            >
              <MdPerson className="sidebar-icon" />
              <span>User Management</span>
            </li>
            <li
              className={activeSection === "products" ? "active" : ""}
              onClick={() => setActiveSection("products")}
              style={{display: 'flex', alignItems: 'center', gap: '14px'}}
            >
              <MdShoppingCart className="sidebar-icon" />
              <span>Product Management</span>
            </li>
            <li
              className={activeSection === "payments" ? "active" : ""}
              onClick={() => setActiveSection("payments")}
              style={{display: 'flex', alignItems: 'center', gap: '14px'}}
            >
              <FaDollarSign className="sidebar-icon" />
              <span>Payment Monitoring</span>
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT - Scrollable */}
        <div className="admin-main-content" style={{ flex: 1 }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default AdminTopBar;