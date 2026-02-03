import React, { useState } from "react";
import StudentRegister from "./studentRegister";           
import ExternalRegister from "./externalRegister";     
import "./AuthenticationPages.css"; 

function UnifiedSignUp() {
  const [userType, setUserType] = useState("student");

  return (
     <div className="auth-container">
      <div className="auth-card">

        <h1>CampusAura</h1>
        <h2>Create Account</h2>
        <p>Select your user type to continue</p>

        {/* Toggle */}
        <div className="user-toggle">
          <button
            type="button"
            className={userType === "student" ? "active" : ""}
            onClick={() => setUserType("student")}
          >
            Student
          </button>

          <button
            type="button"
            className={userType === "external" ? "active" : ""}
            onClick={() => setUserType("external")}
          >
            External User
          </button>
        </div>

        {/* Render forms */}
        {userType === "student" ? (
          <StudentRegister />
        ) : (
          <ExternalRegister />
        )}

      </div>
    </div>
  );
  
}

export default UnifiedSignUp
