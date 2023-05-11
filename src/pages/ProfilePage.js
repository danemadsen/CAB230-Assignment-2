import React, { useState, useEffect } from 'react';
import { postLogin, postRegister, postLogout } from '../components/API';
import '../styles/ProfilePage.css'

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
    const result = await postLogin(email, password);
    if (result.success) setAuthStatus(true);
    else alert(result.message);
  };

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
    const result = await postRegister(email, password);
    if (result.success) {
      setIsRegister(false);
      handleLogin();
    } 
    else {
      alert(result.message);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const result = await postLogout(refreshToken);
    if (result.success) setAuthStatus(false);
    else alert(result.message);
  };

  if (authStatus) {
    return (
      <div className="profile-page">
        <h2>You are Logged In</h2>
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