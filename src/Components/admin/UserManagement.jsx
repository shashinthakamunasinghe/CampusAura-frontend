import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdClose } from "react-icons/md";
import "./UserManagement.css";

const stats = [
  { label: "Students", value: 385, sub: "Verified accounts" },
  { label: "Postgraduates", value: 135, sub: "Verified accounts" },
  { label: "Pending Verification", value: 12, sub: "ID uploads to review", highlight: true }
];

// Mock data - replace with API call
const mockUsers = [
  { _id: "1", name: "Alice Brown", email: "alice@university.edu", type: "Student", verified: true, idImage: null },
  { _id: "2", name: "Bob Smith", email: "bob@university.edu", type: "Postgraduate", verified: false, idImage: "https://via.placeholder.com/400x250?text=Postgraduate+ID" },
  { _id: "3", name: "Carol White", email: "carol@university.edu", type: "Student", verified: true, idImage: null },
  { _id: "4", name: "David Lee", email: "david@university.edu", type: "Student", verified: false, idImage: "https://via.placeholder.com/400x250?text=Student+ID+Card", studentId: "STU12345" },
  { _id: "5", name: "Emma Wilson", email: "emma@university.edu", type: "Student", verified: false, idImage: "https://via.placeholder.com/400x250?text=Student+ID+Verification", studentId: "STU67890" }
];

function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchUsers(); // Uncomment when backend is ready
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

const handleVerifyClick = (user) => {
  if (user.type === "Student" && user.idImage) {
    setSelectedUser(user);
    setShowModal(true);
  }
};

const handleVerifyUser = async () => {
  try {
    console.log("User verified successfully");

    setUsers(users.map(u =>
      u._id === selectedUser._id ? { ...u, verified: true } : u
    ));
  } catch (error) {
    console.error("Error verifying user:", error);
  }

  setShowModal(false);
  setSelectedUser(null);
};

const handleRejectUser = async () => {
  try {
    console.log("User rejected successfully");
    // Optional: remove user or mark as rejected
  } catch (error) {
    console.error("Error rejecting user:", error);
  }

  setShowModal(false);
  setSelectedUser(null);
};

 

  const pendingStudents = users.filter(user => 
    user.type === "Student" && !user.verified && user.idImage
  );

  if (loading) {
    return <div className="user-mgmt-page">Loading...</div>;
  }

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

      {pendingStudents.length > 0 && (
        <div className="user-mgmt-pending-section">
          <h2 className="user-mgmt-section-title">Pending ID Verifications</h2>
          <div className="user-mgmt-pending-grid">
            {pendingStudents.map((user) => (
              <div className="user-mgmt-id-card" key={user.email}>
                <div className="user-mgmt-id-image-container">
                  <img 
                    src={user.idImage} 
                    alt={`${user.name} Student ID`}
                    className="user-mgmt-id-thumbnail"
                    onClick={() => handleVerifyClick(user)}
                  />
                  <div className="user-mgmt-id-overlay" onClick={() => handleVerifyClick(user)}>
                    Click to review
                  </div>
                </div>
                <div className="user-mgmt-id-card-info">
                  <div className="user-mgmt-id-card-name">{user.name}</div>
                  <div className="user-mgmt-id-card-email">{user.email}</div>
                  {user.studentId && (
                    <div className="user-mgmt-id-card-student-id">ID: {user.studentId}</div>
                  )}
                </div>
                <div className="user-mgmt-id-card-actions">
                  <button 
                    className="user-mgmt-id-reject-btn"
                    onClick={() => {
                      setSelectedUser(user);
                      handleRejectUser();
                    }}
                  >
                    Reject
                  </button>
                  <button 
                    className="user-mgmt-id-verify-btn"
                    onClick={() => handleVerifyClick(user)}
                  >
                    Review & Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              ) : user.type === "Student" ? (
                <>
                  <span className="user-mgmt-external">
                    {user.idImage ? 'Pending Verification' : 'No ID Uploaded'}
                  </span>
                  <button 
                    className="user-mgmt-verify-btn"
                    onClick={() => handleVerifyClick(user)}
                    disabled={!user.idImage}
                  >
                    {user.idImage ? 'Verify ID' : 'No ID Uploaded'}
                  </button>
                </>
              ) : (
                <span className="user-mgmt-external">External User</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedUser && (
        <div className="user-mgmt-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="user-mgmt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="user-mgmt-modal-header">
              <h2>Verify Student ID</h2>
              <button 
                className="user-mgmt-modal-close"
                onClick={() => setShowModal(false)}
              >
                <MdClose size={24} />
              </button>
            </div>
            <div className="user-mgmt-modal-body">
              <div className="user-mgmt-modal-user-info">
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Type:</strong> {selectedUser.type}</p>
                {selectedUser.studentId && <p><strong>Student ID:</strong> {selectedUser.studentId}</p>}
              </div>
              <div className="user-mgmt-modal-id-image">
                <img 
                  src={selectedUser.idImage} 
                  alt={`${selectedUser.name} Student ID`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found';
                  }}
                />
              </div>
            </div>
            <div className="user-mgmt-modal-actions">
              <button 
                className="user-mgmt-reject-btn"
                onClick={handleRejectUser}
              >
                Reject
              </button>
              <button 
                className="user-mgmt-approve-btn"
                onClick={handleVerifyUser}
              >
                Verify & Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
