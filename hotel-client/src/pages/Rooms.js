import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Rooms() {
  // --- State Variables ---
  const [rooms, setRooms] = useState([]);                 // List of all rooms
  const [roomNumber, setRoomNumber] = useState('');       // Input for room number
  const [type, setType] = useState('');                   // Input for room type
  const [price, setPrice] = useState('');                 // Input for room price
  const [status, setStatus] = useState('available');      // Room availability status
  const [image, setImage] = useState('');                 // URL for room image
  const [message, setMessage] = useState('');             // Feedback message
  const [monthlyEarnings, setMonthlyEarnings] = useState(0); // Total earnings for current month

  // --- Editing State ---
  const [editingId, setEditingId] = useState(null);       // ID of room being edited
  const [editPrice, setEditPrice] = useState('');         // Input for new price during edit

  // --- Effects ---
  useEffect(() => {
    fetchRooms();
    fetchMonthlyEarnings();
  }, []);

  // --- Helper Functions ---
  const getAuthHeader = () => {
    const token = localStorage.getItem('token'); 
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // --- Data Fetching ---
  const fetchMonthlyEarnings = () => {
    axios.get('http://localhost:5000/bookings', getAuthHeader())
      .then(res => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const monthlyBookings = res.data.filter(booking => {
          const bookingDate = new Date(booking.start_date);
          return bookingDate.getMonth() === currentMonth && 
                 bookingDate.getFullYear() === currentYear;
        });
        
        const total = monthlyBookings.reduce((sum, booking) => {
          return sum + parseFloat(booking.total_price || 0);
        }, 0);
        
        setMonthlyEarnings(total);
      })
      .catch(err => {
        console.error('Error fetching earnings:', err);
      });
  };

  const fetchRooms = () => {
    axios.get('http://localhost:5000/rooms')
      .then(res => setRooms(res.data))
      .catch(err => {
        console.error(err);
        setMessage('Error fetching rooms');
      });
  };

  // --- Handlers ---
  const addRoom = (e) => {
    e.preventDefault();
    setMessage('');

    if (!roomNumber || !type || !price) {
      setMessage('Please fill in all required fields');
      return;
    }

    axios.post('http://localhost:5000/rooms', {
      room_number: parseInt(roomNumber),
      type,
      price: parseFloat(price),
      status,
      image: image || null
    })
      .then(() => {
        setRoomNumber('');
        setType('');
        setPrice('');
        setStatus('available');
        setImage('');
        setMessage('Room added successfully!');
        fetchRooms();
        fetchMonthlyEarnings();
      })
      .catch(err => {
        console.error(err);
        setMessage('Error adding room');
      });
  };

  // --- Edit Mode Handlers ---
  
  // Enable edit mode
  const startEditing = (room) => {
    setEditingId(room.id);
    setEditPrice(room.price);
  };

  // Cancel edit
  const cancelEditing = () => {
    setEditingId(null);
    setEditPrice('');
  };

  // Save updated price
  const saveRoomPrice = (id) => {
    axios.put(`http://localhost:5000/rooms/${id}`, { price: editPrice })
      .then(() => {
        setMessage('Price updated successfully! ✅');
        setEditingId(null);
        fetchRooms();
      })
      .catch(err => {
        console.error(err);
        setMessage('Error updating price');
      });
  };

  return (
    <div className="form-container" style={{ maxWidth: '1000px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Room Management</h2>

      {/* --- Monthly Earnings Section --- */}
      <div style={{
        backgroundColor: '#e8f5e9',
        border: '2px solid #4caf50',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32', fontSize: '1.1rem' }}>
          💰 Monthly Earnings ({currentMonthName})
        </h3>
        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1b5e20', margin: '10px 0' }}>
          ${monthlyEarnings.toFixed(2)}
        </div>
        <button
          onClick={fetchMonthlyEarnings}
          style={{ padding: '8px 16px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          🔄 Refresh Earnings
        </button>
      </div>

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

      {/* --- Add Room Form --- */}
      <form onSubmit={addRoom} style={{ marginBottom: '40px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Add New Room</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>Room Number *</label>
            <input type="number" placeholder="Room Number" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>Type *</label>
            <input placeholder="e.g., Deluxe, Single Room" value={type} onChange={e => setType(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>Price *</label>
            <input type="number" step="0.01" placeholder="Price per night" value={price} onChange={e => setPrice(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2c3e50' }}>Image URL (optional)</label>
          <input type="url" placeholder="https://example.com/image.jpg" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <button type="submit" style={{ width: '100%' }}>Add Room</button>
      </form>

      {/* --- Room List Section --- */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>All Rooms ({rooms.length})</h3>
          <button onClick={fetchRooms} style={{ padding: '8px 16px', backgroundColor: '#1e3c72', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            🔄 Refresh
          </button>
        </div>
        
        {rooms.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>No rooms added yet</p>
        ) : (
          <div className="room-grid">
            {rooms.map(room => (
              <div key={room.id} className="room-card" style={{ paddingBottom: '15px' }}>
                <img
                  src={room.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={room.type}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                />
                <div className="room-info">
                  <h4>{room.type} <span className="room-number">#{room.room_number}</span></h4>
                  
                  {/* --- Edit Mode UI --- */}
                  {editingId === room.id ? (
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>New Price ($):</label>
                      <input 
                        type="number" 
                        value={editPrice} 
                        onChange={(e) => setEditPrice(e.target.value)}
                        style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
                      />
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          onClick={() => saveRoomPrice(room.id)}
                          style={{ flex: 1, backgroundColor: '#28a745', color: 'white', padding: '5px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                          Save
                        </button>
                        <button 
                          onClick={cancelEditing}
                          style={{ flex: 1, backgroundColor: '#dc3545', color: 'white', padding: '5px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* View Mode UI */}
                      <div className="room-price">
                        ${parseFloat(room.price).toFixed(2)} <span>/ night</span>
                      </div>
                      <span className={`room-status ${room.status === 'available' ? 'status-available' : 'status-booked'}`}>
                        {room.status}
                      </span>
                      
                      <button 
                        onClick={() => startEditing(room)}
                        style={{
                          width: '100%',
                          marginTop: '10px',
                          padding: '8px',
                          backgroundColor: '#ffc107',
                          color: '#333',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        ✏️ Update Price
                      </button>
                    </>
                  )}
                  {/* --- End Edit Mode UI --- */}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;