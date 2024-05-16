import React, { useState } from "react";
import password_icon from "../assets/password.png";
import "../styles/design.css";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(""); 
  const email = localStorage.getItem('email')


  const forgotpassword = async () => {
    try {
      if (password === password2) {
        const response = await fetch(
          "http://localhost:8080/forgotpassword/savenewpassword",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
          }
        );
  
        if (response.ok) {
          window.location.href = "/home";
        } else {
          const errorData = await response.json();
        }
      } else {
        setError("Passwords do not match"); 
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  

  return (
    <div className="container">
      <div className="header">
        <div className="text">New Password</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Confirm new password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>} 

      <button className="submit-new-password-button" onClick={forgotpassword}>
        <text>Save</text>
      </button>
    </div>
  );
};

export default ForgotPassword;
