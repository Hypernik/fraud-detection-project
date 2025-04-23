import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import FraudForm from './FraudForm';
import './Auth.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignUpSuccess = () => {
    alert('Sign up successful! Please login with your new credentials.');
    setShowSignUp(false);
  };

  if (isAuthenticated) {
    return <FraudForm />;
  }

  return (
    <div className="app">
      {showSignUp ? (
        <SignUp 
          onSignUpSuccess={handleSignUpSuccess} 
          onSwitchToLogin={() => setShowSignUp(false)}
        />
      ) : (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onSwitchToSignUp={() => setShowSignUp(true)}
        />
      )}
    </div>
  );
};

export default App;