import React, { useState } from "react";
import email_icon from "../assets/email.png";
import "../styles/design.css";

const EnterEmail = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const ErrorMessage = ({ message }) => (
    <div className="error-message">{message}</div>
  );

  const verifyEmail = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/forgotpassword/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {

        window.location.href = '/ceck_email';
       
      } else {
        setErrorMessage("Email not valid");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Enter Email</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <button className="submit-new-password-button" onClick={verifyEmail}>
        <text>Next</text>
      </button>
    </div>
  );
};

export default EnterEmail;
