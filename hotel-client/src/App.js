import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Users from './pages/Users';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  // --- State Variables ---
  const [user, setUser] = useState(null);  // Current authenticated user object

  /* --- Route Helpers --- */
  // Redirects to dashboard if already logged in
  const HomePage = () => {
    if (user) {
      return <Navigate to="/bookings" replace />;
    }
    return <Home />;
  };

  return (
    <Router>
      {/* --- Main Layout Container --- */}
      <div className="App">
        
        <Navbar user={user} setUser={setUser} />

        {/* --- Content Wrapper (pushes footer down) --- */}
        <div className="content-wrap">
          <Routes>
            
            {/* Public Root */}
            <Route path="/" element={<HomePage />} />

            {/* --- Guest Routes (Public) --- */}
            {!user && (
              <>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
              </>
            )}

            {/* --- Protected Routes (Private) --- */}
            {user && (
              <>
                {/* Admin Only Routes */}
                {user.role === 'admin' && <Route path="/users" element={<Users />} />}
                {user.role === 'admin' && <Route path="/rooms" element={<Rooms />} />}
                
                {/* User Routes */}
                <Route path="/bookings" element={<Bookings user={user} />} />
              </>
            )}

            {/* --- Fallback Redirect --- */}
            <Route path="*" element={<Navigate to={user ? "/bookings" : "/"} replace />} />
          </Routes>
        </div>

        {/* --- Site Footer --- */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;