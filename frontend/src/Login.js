import React, { useState } from 'react';
import './Auth.css';
import { findUser } from './utils/authUtils';

const Login = ({ onLoginSuccess, onSwitchToSignUp }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = findUser(credentials.email, credentials.password);

    if (user) {
      onLoginSuccess();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <h1>CC Fraud Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
        <button type="button" className="auth-button auth-button-secondary" onClick={onSwitchToSignUp}>
            Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;