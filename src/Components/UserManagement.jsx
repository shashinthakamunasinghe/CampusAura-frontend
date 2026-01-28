import React from "react";
import { MdCheckCircle } from "react-icons/md";
import "../Styles/UserManagement.css";

const stats = [
  { label: "Students", value: 385, sub: "Verified accounts" },
  { label: "Postgraduates", value: 135, sub: "Verified accounts" },
  { label: "Pending Verification", value: 12, sub: "ID uploads to review", highlight: true }
];

const users = [
  { name: "Alice Brown", email: "alice@university.edu", type: "Student", verified: true },
  { name: "Bob Smith", email: "bob@university.edu", type: "Postgraduate", verified: false },
  { name: "Carol White", email: "carol@university.edu", type: "Student", verified: true },
  { name: "David Lee", email: "david@university.edu", type: "Student", verified: false }
];

function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default function UserManagement() {
  return (
    <div className="user-mgmt-page">
      <h1 className="user-mgmt-title">User Management</h1>
      <div className="user-mgmt-stats">
        {stats.map((stat) => (
          <div className={`user-mgmt-stat-card${stat.highlight ? " highlight" : ""}`} key={stat.label}>
            <div className={`user-mgmt-stat-value${stat.highlight ? " highlight" : ""}`}>{stat.value}</div>
            <div className="user-mgmt-stat-label">{stat.label}</div>
            <div className={`user-mgmt-stat-sub${stat.highlight ? " highlight" : ""}`}>{stat.sub}</div>
          </div>
        ))}
      </div>
      <div className="user-mgmt-users-card">
        <div className="user-mgmt-users-title">Recent User Registrations</div>
        {users.map((user) => (
          <div className="user-mgmt-user-row" key={user.email}>
            <div className="user-mgmt-avatar">{getInitials(user.name)}</div>
            <div className="user-mgmt-user-info">
              <div className="user-mgmt-user-name">{user.name}</div>
              <div className="user-mgmt-user-meta">{user.email} &bull; {user.type}</div>
            </div>
            <div className="user-mgmt-user-action">
              {user.verified ? (
                <span className="user-mgmt-verified">
                  <MdCheckCircle style={{marginRight: 4}}/> Verified
                </span>
              ) : (
                <button className="user-mgmt-verify-btn">Verify ID</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
