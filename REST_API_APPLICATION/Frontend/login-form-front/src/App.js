import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import SignUp from "./components/LoginSignUp/SignUp.jsx";
import Login from "./components/LoginSignUp/Login.jsx";
import Home from "./components/Home/Home.jsx";
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import EnterEmail from './components/ForgotPassword/EnterEmail.jsx';
import VerifyEmail from './components/LoginSignUp/VerifyEmail.jsx';
import CeckEmail from './components/ForgotPassword/CeckEmail.jsx';

const App = () => {
  const currentPath = window.location.pathname;
  const { token } = useParams(); 
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (currentPath === '/reset-password') {
      generateToken();
    }
  }, []);

  const generateToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/forgotpassword/get-token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        setShowForgotPassword(token !== null && token !== undefined);
      } else {
        console.error("Failed to generate token");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (currentPath === '/signup') {
    return (
      <div>
        <SignUp/>
      </div>
    );
  } else if (currentPath === '/login') {
    return <Login />;
  } else if (currentPath === '/home') {
    return <Home />;
  } else if (currentPath === '/enterEmail') {
    return <EnterEmail />;
  } else if (currentPath === '/verify_email_page') {
    return <VerifyEmail />;
  } else if (currentPath === '/ceck_email') {
    return <CeckEmail />;
  } else if (currentPath === '/reset-password' && showForgotPassword) {
    return <ForgotPassword />;
  } else {
    return null;
  }
}

export default App;
