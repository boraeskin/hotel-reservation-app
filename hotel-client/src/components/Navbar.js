import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  // Logs user out
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');    
    navigate('/');
  };

  // Redirects based on authorization
  const handleLogoClick = (e) => {
    if (user) {
      e.preventDefault();
      navigate('/bookings');
    }
  };

  return (
    <nav>
      {/* Left Side: Logo & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        
        <Link to={user ? "/bookings" : "/"} className="nav-logo" onClick={handleLogoClick}>
          <span className="logo-icon">🏨</span>
          <span className="logo-text">Hotel Paradise</span>
        </Link>

        {user && (
          <>
            {user.role === 'admin' && (
              <>
                <Link to="/users">Users</Link>
                <Link to="/rooms">Rooms</Link>
              </>
            )}
          </>
        )}
      </div>

      {/* Right Side: Guest Links */}
      {!user && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      )}

      {/* Right Side: User Profile & Logout */}
      {user && (
        <div>
          <span className="user-greeting">{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;