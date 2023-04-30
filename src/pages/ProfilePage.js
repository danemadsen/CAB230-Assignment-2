import React, { useState, useEffect } from 'react';
import { POST_Login, POST_Register, POST_Logout } from '../API';
import '../App.css'

const ProfilePage = () => {
  const [authStatus, setAuthStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    // For example, check if the access token is stored in localStorage
    const isLoggedIn = localStorage.getItem('accessToken') ? true : false;
    setAuthStatus(isLoggedIn);
  }, []);

  const handleLogin = async () => {
    const result = await POST_Login(email, password);
    if (result.success) {
      // Store the access tokens in localStorage or another secure place
      localStorage.setItem('accessToken', result.bearerToken.token);
      localStorage.setItem('refreshToken', result.refreshToken.token);
      setAuthStatus(true);
    } else {
      alert(result.message);
    }
  };

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
    const result = await POST_Register(email, password);
    if (result.success) {
      setIsRegister(false);
      alert('Registration successful, please log in');
    } else {
      alert(result.message);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const result = await POST_Logout(refreshToken);
    if (result.success) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAuthStatus(false);
    } else {
      alert(result.message);
    }
  };

  if (authStatus) {
    return (
      <div className="profile-page">
        <h2>Welcome, {email}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div className="profile-page">
        {isRegister ? (
          <>
            <h2>Register</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setIsRegister(false)}>Back to Login</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => setIsRegister(true)}>Register Now</button>
          </>
        )}
      </div>
    );
  }
};

export default ProfilePage;