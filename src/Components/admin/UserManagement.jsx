import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdClose, MdDelete } from "react-icons/md";
import "./UserManagement.css";
import { fetchUsers as apiFetchUsers, fetchUserStats, verifyStudentId, deleteUser } from "../../services/api";

// Stats will be populated from the real API
const DEFAULT_STATS = [
  { label: "Students", value: 0, sub: "Verified accounts" },
  { label: "External Users", value: 0, sub: "Verified accounts" },
  { label: "Pending Verification", value: 0, sub: "ID uploads to review", highlight: true }
];

/**
 * Map a UserResponseDTO from the backend to the shape expected by the UI.
 * Backend: { uid, name, email, role, verified, degreeProgram, studentIdUrl, createdAt }
 * UI:      { _id, name, email, type, verified, idImage, studentId }
 */
function mapUser(dto) {
  return {
    _id:       dto.uid,
    name:      dto.name || "Unknown User",
    email:     dto.email || "",
    type:      dto.role === "STUDENT" ? "Student"
             : dto.role === "EXTERNAL_USER" ? "Postgraduate"
             : dto.role || "User",
    verified:  dto.verified || false,
    idImage:   dto.studentIdUrl || null,
    studentId: dto.degreeProgram || null,
  };
}

function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch users and stats in parallel
      const [usersData, statsData] = await Promise.all([
        apiFetchUsers(),
        fetchUserStats(),
      ]);

      setUsers(usersData.map(mapUser));

      setStats([
        { label: "Students",            value: statsData.totalUniversityStudents || 0, sub: "University students" },
        { label: "External Users",      value: statsData.totalExternalUsers       || 0, sub: "External accounts" },
        { label: "Pending Verification",value: statsData.totalPendingVerification  || 0, sub: "ID uploads to review", highlight: true },
      ]);
    } catch (err) {
      console.error("Error loading user management data:", err);
      setError("Failed to load users. Please try again.");
    } finally {
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
    await verifyStudentId(selectedUser._id, "VERIFIED");
    // Optimistically update the local state
    setUsers(prev =>
      prev.map(u => u._id === selectedUser._id ? { ...u, verified: true } : u)
    );
  } catch (err) {
    console.error("Error verifying user:", err);
  }
  setShowModal(false);
  setSelectedUser(null);
};

const handleRejectUser = async () => {
  try {
    if (selectedUser) {
      await verifyStudentId(selectedUser._id, "REJECTED");
      // Remove from the pending list (mark no idImage so it no longer appears as pending)
      setUsers(prev =>
        prev.map(u => u._id === selectedUser._id ? { ...u, idImage: null } : u)
      );
    }
  } catch (err) {
    console.error("Error rejecting user:", err);
  }
  setShowModal(false);
  setSelectedUser(null);
};

const handleDeleteUser = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
    return;
  }
  try {
    await deleteUser(userId);
    setUsers(users.filter(u => u._id !== userId));
    alert("User deleted successfully!");
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("Failed to delete user. Please try again.");
  }
};

 

  const pendingStudents = users.filter(user => 
    user.type === "Student" && !user.verified && user.idImage
  );

  if (loading) {
    return <div className="user-mgmt-page">Loading...</div>;
  }

  if (error) {
    return (
      <div className="user-mgmt-page">
        <h1 className="user-mgmt-title">User Management</h1>
        <div className="error-message" style={{ color: '#ef4444', padding: '1rem', background: '#fef2f2', borderRadius: '8px', margin: '1rem 0' }}>
          {error}
        </div>
      </div>
    );
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
              <button 
                className="user-mgmt-delete-btn"
                onClick={() => handleDeleteUser(user._id)}
                title="Delete user"
              >
                <MdDelete style={{marginRight: 4}}/> Delete
              </button>
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
