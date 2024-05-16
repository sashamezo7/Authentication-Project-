import React, { useState } from 'react';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import '../styles/design.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const ErrorMessage = ({ message }) => (
      <div className="error-message">{message}</div>
  );

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login/ceckCredentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password})
            });

            if (response.status === 200) {

              window.location.href = '/home';
            } else {

                const errorData = await response.json();
                setErrorMessage('Username or Password incorect! Plese Sign Up!');
            }
        } catch (error) {

          console.error('Eroare de rețea:', error);
          setErrorMessage('Username or Password incorect! Plese Sign Up!'); 
        }
    };

    const handleClick = () => {
        window.location.href = '/signup';
    };

    const handleLostPassword = () => {
        window.location.href = '/enterEmail'
    }

    return (
        <div className='container'>
            <div className="header">
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="forgot-password" onClick={handleLostPassword}>Lost Password? <span>Click Here!</span></div>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <div className="submit-container">
                <div className="submit" onClick={handleClick}>Sign Up</div>
                <div className="submit" onClick={handleLogin}>Login</div>
            </div>
        </div>
    );
};

export default Login;
