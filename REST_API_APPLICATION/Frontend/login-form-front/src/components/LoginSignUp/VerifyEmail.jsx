import React, { useState } from "react";
import "../styles/design.css";



const VerifyEmail = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [code, setCode] = useState('')
    const email = localStorage.getItem('email')
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    const ErrorMessage = ({ message }) => (
        <div className="error-message">{message}</div>
      );

    const verifyCode = async () => {
        try {
          const response = await fetch(
            "http://localhost:8080/signup/ceckCode",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(code),
            }
          );
    
          if (response.ok) {
            
            const response = await fetch(
                "http://localhost:8080/signup/save",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username, password, email }),
                }
              );

              window.location.href = '/home'

        } else {
            setErrorMessage("Incorrect code");
          }
        } catch (error) {
          console.error("Eroare de rețea:", error);
        }
      };
      const resendEmail = async () =>{

        const mailResponse = await fetch('http://localhost:8080/mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email)
        });
        
      }
      
  return (
    <div className="container">
      <div className="header">
        <div className="text">Verify Email</div>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div className="underline"></div>
      </div>
      <text className="email-message"> Plese check your email for a code...</text>
      <div className="inputs">
        <div className="input">
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </div>
      <button className="submit-new-password-button" onClick={resendEmail}>
        <text>Resend</text>
      </button>
      <button className="submit-new-password-button" onClick={verifyCode}>
        <text>Next</text>
      </button>
    </div>
  );
};

export default VerifyEmail;
