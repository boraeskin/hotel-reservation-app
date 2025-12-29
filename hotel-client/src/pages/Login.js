import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Login({ setUser }) {
  // --- State Variables ---
  const [email, setEmail] = useState('');         // User email input
  const [password, setPassword] = useState('');   // User password input
  const [error, setError] = useState('');         // Error message display
  const [loading, setLoading] = useState(false);  // API loading status
  const navigate = useNavigate();                 // Navigation hook

  /* --- Login Handler --- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Input validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // API request
      const res = await axios.post('http://localhost:5000/login', { email, password });
      setUser(res.data);
      navigate('/bookings');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-container">
        
        {/* --- Header Section --- */}
        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue to Hotel Paradise</p>
        </div>
        
        {/* --- Error Message Display --- */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* --- Login Form --- */}
        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="auth-submit-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* --- Footer / Navigation --- */}
          <div className="auth-footer">
            <span>Don't have an account?</span>
            <Link to="/register" className="auth-link">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;