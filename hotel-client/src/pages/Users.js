import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Users() {
  // --- State Variables ---
  const [users, setUsers] = useState([]);         // List of all registered users
  const [name, setName] = useState('');           // Input for full name
  const [email, setEmail] = useState('');         // Input for email address
  const [password, setPassword] = useState('');   // Input for password
  const [role, setRole] = useState('guest');      // Selected user role (guest/admin)
  const [message, setMessage] = useState('');     // Feedback message display

  // --- Effects ---
  useEffect(() => {
    fetchUsers();
  }, []);

  /* --- Data Fetching --- */
  const fetchUsers = () => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error(err);
        setMessage('Error fetching users');
      });
  };

  /* --- Handlers --- */
  const addUser = (e) => {
    e.preventDefault();
    setMessage('');

    // Input validation
    if (!name || !email || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    // API request to add user
    axios.post('http://localhost:5000/users', { name, email, password, role })
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('guest');
        setMessage('User added successfully!');
        fetchUsers();
      })
      .catch(err => {
        console.error(err);
        setMessage('Error adding user. Email may already be in use.');
      });
  };

  return (
    <div className="form-container" style={{ maxWidth: '1000px' }}>
      
      {/* --- Header Section --- */}
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>User Management</h2>

      {/* --- Status Message --- */}
      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
          color: message.includes('success') ? '#155724' : '#721c24',
          borderRadius: '6px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      {/* --- Add User Form --- */}
      <form onSubmit={addUser} style={{ marginBottom: '40px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Add New User</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>
              Name *
            </label>
            <input
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>
              Email *
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>
              Password *
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>
              Role
            </label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button type="submit" style={{ width: '100%' }}>Add User</button>
      </form>

      {/* --- User List Table --- */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>All Users ({users.length})</h3>
        {users.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>No users found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      backgroundColor: user.role === 'admin' ? '#e8f4f8' : '#e8f8f5',
                      color: user.role === 'admin' ? '#3498db' : '#27ae60'
                    }}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;