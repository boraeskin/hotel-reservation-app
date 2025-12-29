import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Register() {
  // --- State Variables ---
  const [name, setName] = useState('');           // User full name input
  const [email, setEmail] = useState('');         // User email input
  const [password, setPassword] = useState('');   // User password input
  const [error, setError] = useState('');         // Error message display
  const [loading, setLoading] = useState(false);  // API loading status
  const navigate = useNavigate();                 // Navigation hook

  /* --- Register Handler --- */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Input validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);

    try {
      // API request to create user
      await axios.post('http://localhost:5000/users', {
        name,
        email,
        password,
        role: 'guest'
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Error creating account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-container">
        
        {/* --- Header Section --- */}
        <div className="auth-header">
          <div className="auth-icon">✨</div>
          <h2>Create Account</h2>
          <p>Join Hotel Paradise and start your journey</p>
        </div>
        
        {/* --- Error Message Display --- */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* --- Registration Form --- */}
        <form onSubmit={handleRegister} className="auth-form">
          <div className="auth-input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Minimum 4 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="auth-submit-btn"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* --- Footer / Navigation --- */}
          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login" className="auth-link">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;