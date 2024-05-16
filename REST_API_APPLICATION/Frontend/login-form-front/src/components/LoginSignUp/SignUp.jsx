import React, { useState } from 'react';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import email_icon from '../assets/email.png'
import '../styles/design.css'

const SignUp = () => {

  const handleClick = () => {
    window.location.href='/login';
  }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const ErrorMessage = ({ message }) => (
      <div className="error-message">{message}</div>
  );

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup/signUpCredentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
      });
  
      if (response.status === 200) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('username', username);
  
        const mailResponse = await fetch('http://localhost:8080/mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email)
        });
  
        if (mailResponse.ok) {
          window.location.href = '/verify_email_page';
        } else {
          if (mailResponse.headers.get('content-length') === '0') {
            // Empty response, handle accordingly
            setErrorMessage("Error sending email: Empty response from server");
          } else {
            // Non-empty response, parse JSON
            const errorData = await mailResponse.json();
            setErrorMessage("Error sending email: " + JSON.stringify(errorData));
          }
        }
      } else {
        const errorData = await response.json();
        setErrorMessage("Username, password, or email already exists!");
      }
    } catch (error) {
      console.error('Network Error:', error);
      setErrorMessage('Network error occurred');
    }
  };
  
  return (
    <div className='container'>
      <div className="header">
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt="" />
          <input 
          type="text" 
          placeholder='Username'
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt="" />
            <input 
              type="text" 
              placeholder='Email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={password_icon} alt="" />
          <input 
          type="password" 
          placeholder='Password'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className="submit-container">
        <div className="submit" onClick={handleSignUp}>Sign Up</div>
        <div className="submit" onClick={handleClick}>Login</div>

      </div>
    </div>
  );
};

export default SignUp;
