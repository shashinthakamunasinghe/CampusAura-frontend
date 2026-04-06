import React, { useState } from "react";
import "../Styles/theme.css";

export default function Profile() {
  const [tab, setTab] = useState("Profile");
  const [fullName, setFullName] = useState("Shamm");
  const [email, setEmail] = useState("sha@gmail.com");
  const [phone, setPhone] = useState("119119");
  const [profilePic, setProfilePic] = useState(null);

  return (
    <>
      <div
        style={{
          background: "var(--secondary)",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
          color: "var(--dark)",
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
          {["Profile", "Security"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: tab === t ? "var(--light)" : "transparent",
                border: "none",
                borderBottom:
                  tab === t ? "3px solid var(--primary)" : "none",
                fontWeight: 500,
                fontSize: "1.2rem",
                padding: "0.75rem 2.5rem",
                cursor: "pointer",
                color: tab === t ? "var(--primary-dark)" : "var(--gray)",
                outline: "none",
                borderRadius: "8px 8px 0 0",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Profile Card */}
        {tab === "Profile" && (
          <div style={{
            background: "var(--light)",
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            maxWidth: 500,
            margin: "2rem auto 0 auto",
            padding: "2.5rem 2rem 2rem 2rem",
            fontFamily: "inherit"
          }}>
            {/* Profile Picture Upload */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
              <div style={{ position: "relative", width: 96, height: 96, marginBottom: 12 }}>
                <div style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "2px solid var(--primary)"
                }}>
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : null}
                </div>
                <label htmlFor="profile-pic-input" style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "var(--primary)",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.10)"
                }}>
                  <span role="img" aria-label="camera" style={{ color: "#fff", fontSize: 20 }}>📷</span>
                  <input
                    id="profile-pic-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setProfilePic(ev.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              <div style={{ fontWeight: 600, fontSize: "2rem", color: "var(--dark)", marginBottom: 4 }}>{fullName}</div>
              <div style={{ color: "var(--gray)", fontSize: "1.1rem" }}>{email}</div>
            </div>
            <form style={{ marginBottom: 24 }} onSubmit={e => e.preventDefault()}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, marginBottom: 6, display: "block", color: "var(--dark)" }}>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: "1rem",
                    marginBottom: 10,
                    fontFamily: "inherit",
                    color: "var(--dark)",
                    background: "var(--secondary)",
                  }}
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, marginBottom: 6, display: "block", color: "var(--dark)" }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: "1rem",
                    marginBottom: 10,
                    fontFamily: "inherit",
                    color: "var(--dark)",
                    background: "var(--secondary)",
                  }}
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, marginBottom: 6, display: "block", color: "var(--dark)" }}>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: "1rem",
                    marginBottom: 10,
                    fontFamily: "inherit",
                    color: "var(--dark)",
                    background: "var(--secondary)",
                  }}
                />
              </div>
              <button
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.75rem 2.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "inherit",
                  boxShadow: "0 1px 4px rgba(10,93,184,0.08)",
                  marginTop: 10
                }}
              >
               Save Changes
              </button>
            </form>
          </div>
        )}
        {/* Security Card */}
        {tab === "Security" && (
          <div
            style={{
              background: "var(--light)",
              borderRadius: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              padding: "2rem",
              maxWidth: 900,
              margin: "0 auto",
              fontFamily: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
              <span style={{ fontSize: "2rem", marginRight: "0.75rem" }}>🛡️</span>
              <span style={{ fontWeight: 600, fontSize: "2rem", color: "var(--primary-dark)" }}>
                Security Settings
              </span>
            </div>
            <form style={{ marginBottom: "2rem" }} onSubmit={e => e.preventDefault()}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontWeight: 500, marginBottom: 6, display: "block", color: "var(--dark)" }}>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter your current password"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: "1rem",
                    marginBottom: 10,
                    fontFamily: "inherit",
                    color: "var(--dark)",
                    background: "var(--secondary)",
                  }}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontWeight: 500, marginBottom: 6, display: "block", color: "var(--dark)" }}>New Password</label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: "1rem",
                    marginBottom: 10,
                    fontFamily: "inherit",
                    color: "var(--dark)",
                    background: "var(--secondary)",
                  }}
                />
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ fontWeight: 500, marginBottom: 6, display: "block", color: "var(--dark)" }}>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: "1rem",
                    marginBottom: 10,
                    fontFamily: "inherit",
                    color: "var(--dark)",
                    background: "var(--secondary)",
                  }}
                />
              </div>
              <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px solid #e5e7eb" }} />
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontWeight: 500, marginBottom: 6, display: "block", color: "var(--dark)" }}>Account Actions</label>
                <button
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    border: "none",
                    borderRadius: 8,
                    padding: "0.75rem 2.5rem",
                    cursor: "pointer",
                    marginTop: 10,
                    width: "100%",
                    fontFamily: "inherit",
                  }}
                >
                  Delete Account
                </button>
              </div>
              <button
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.75rem 2.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "inherit",
                  marginTop: 10,
                }}
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
