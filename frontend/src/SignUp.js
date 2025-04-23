import React, { useState } from 'react';
import './Auth.css';
import { getUsers, saveUser } from './utils/authUtils';

const SignUp = ({ onSignUpSuccess, onSwitchToLogin }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Read existing users
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === user.email)) {
      setError('Email already exists');
      return;
    }

    // Add new user (in a real app, you would write to the JSON file properly)
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    
    console.log('New user added (in a real app, save to JSON file):', newUser);
    saveUser(newUser);
    
    onSignUpSuccess();
  };

  return (
    <div className="auth-container">
      <h1>CC Fraud Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
        <button type="button" className="auth-button auth-button-secondary" onClick={onSwitchToLogin}>
            Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;