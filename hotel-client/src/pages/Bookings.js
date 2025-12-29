import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Bookings({ user }) {
  // --- Data State ---
  const [bookings, setBookings] = useState([]);       // List of user bookings
  const [allBookings, setAllBookings] = useState([]); // List of all bookings (for checks)
  const [rooms, setRooms] = useState([]);             // List of available rooms
  
  // --- Form State ---
  const [userId, setUserId] = useState(user.id);      // Current user ID
  const [roomId, setRoomId] = useState('');           // Selected room ID
  const [checkIn, setCheckIn] = useState('');         // Check-in date input
  const [checkOut, setCheckOut] = useState('');       // Check-out date input
  const [message, setMessage] = useState('');         // Success/Error message

  // --- UI State ---
  const [conflictData, setConflictData] = useState(null); // Data for conflict modal
  const [activeTab, setActiveTab] = useState('book');     // Active tab (book/reservations)

  // --- Initial Load ---
  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  // --- Helpers ---
  const today = new Date().toISOString().split('T')[0];

  const getAuthHeader = () => {
    const token = localStorage.getItem('token'); 
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  // --- API Functions ---
  
  // Get all rooms
  const fetchRooms = () => {
    axios.get('http://localhost:5000/rooms', getAuthHeader())
      .then(res => setRooms(res.data))
      .catch(err => {
        console.error(err);
        setMessage('Error fetching rooms');
      });
  };

  // Get all bookings
  const fetchBookings = () => {
    axios.get('http://localhost:5000/bookings', getAuthHeader())
      .then(res => {
        setAllBookings(res.data);
        if (user.role === 'guest') {
          setBookings(res.data.filter(b => b.user_id === user.id));
        } else {
          setBookings(res.data);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage('Error fetching bookings');
      });
  };

  // --- Logic Functions ---

  // Calculate total price based on date range
  const calculatePrice = (roomId, start, end) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return 0;
    const diffDays = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    return room.price * diffDays;
  };

  // Delete/Cancel a reservation
  const deleteBooking = (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }
    axios.delete(`http://localhost:5000/bookings/${bookingId}`, getAuthHeader())
      .then(() => {
        setMessage('Reservation cancelled successfully!');
        fetchBookings();
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        console.error('Delete error', err);
        setMessage('Error cancelling reservation');
      });
  };

  // Check if room is free for selected dates
  const isRoomAvailable = (roomId, checkIn, checkOut) => {
    const roomBookings = allBookings.filter(b => b.room_id === roomId);
    const requestedStart = new Date(checkIn);
    const requestedEnd = new Date(checkOut);
    return !roomBookings.some(booking => {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);
      return (requestedStart < bookingEnd && requestedEnd > bookingStart);
    });
  };

  // Find alternative rooms
  const findAvailableRooms = (checkIn, checkOut) => {
    return rooms.filter(room => {
      return room.status === 'available' && isRoomAvailable(room.id, checkIn, checkOut);
    });
  };

  // Handle alternative room selection
  const selectAlternative = (newRoomId) => {
    setRoomId(newRoomId);
    setConflictData(null);
    setMessage('Alternative room selected. Please confirm.');
  };

  // Submit new booking
  const addBooking = () => {
    setMessage('');
    setConflictData(null);

    if (!roomId || !checkIn || !checkOut) {
      setMessage('Please fill all fields');
      return;
    }

    if (checkOut <= checkIn) {
      setMessage('Check-out date must be after check-in date');
      return;
    }

    const totalPrice = calculatePrice(roomId, checkIn, checkOut);

    const payload = {
      user_id: userId,
      room_id: roomId,
      start_date: checkIn,
      end_date: checkOut,
      total_price: totalPrice
    };

    axios.post('http://localhost:5000/bookings', payload, getAuthHeader())
      .then(res => {
        setRoomId('');
        setCheckIn('');
        setCheckOut('');
        setMessage('Booking added successfully!');
        fetchBookings();
      })
      .catch(err => {
        console.error("Error adding booking:", err);
        if (err.response && err.response.data && err.response.data.message) {
          const errorMessage = err.response.data.message;

          // Handle booking conflict
          if (errorMessage.includes('already booked') || errorMessage.includes('booked')) {
            const roomBookings = allBookings.filter(b => b.room_id === parseInt(roomId));
            const conflictingBookings = roomBookings.filter(booking => {
              const bookingStart = new Date(booking.start_date);
              const bookingEnd = new Date(booking.end_date);
              const requestedStart = new Date(checkIn);
              const requestedEnd = new Date(checkOut);
              return (requestedStart < bookingEnd && requestedEnd > bookingStart);
            });

            const availableRooms = findAvailableRooms(checkIn, checkOut);

            setConflictData({
              dates: conflictingBookings,
              suggestions: availableRooms
            });
            
          } else {
            setMessage(errorMessage);
          }
        } else {
          setMessage('Error adding booking');
        }
      });
  };

  return (
    <div className="bookings-page">
      
      {/* --- Tab Navigation --- */}
      <div className="bookings-tabs">
        <button className={`tab-button ${activeTab === 'book' ? 'active' : ''}`} onClick={() => setActiveTab('book')}>
          <span>📅</span> Make Reservation
        </button>
        <button className={`tab-button ${activeTab === 'reservations' ? 'active' : ''}`} onClick={() => setActiveTab('reservations')}>
          <span>📋</span> My Reservations ({bookings.length})
        </button>
      </div>

      {/* --- Booking Form Section --- */}
      {activeTab === 'book' && (
        <div className="bookings-content">
          
          {/* Room Selection Grid */}
          <div className="bookings-left-panel">
            <h2 className="bookings-section-title">Select Your Room</h2>
            {message && (
              <div className={`message-alert ${message.includes('success') ? 'success' : 'error'}`} style={message.includes('success') ? {} : { color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb' }}>
                {message}
              </div>
            )}
            
            {user.role === 'admin' && (
              <div className="admin-user-select">
                <label>User ID</label>
                <input type="number" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
              </div>
            )}

            <div className="rooms-grid-full">
              {rooms.length === 0 ? <div className="loading-state">Loading rooms...</div> : rooms.map(room => (
                <div key={room.id} onClick={() => setRoomId(room.id)} className={`room-card-full ${roomId === room.id ? 'selected' : ''} ${room.status !== 'available' ? 'unavailable' : ''}`}>
                  <div className="room-card-image">
                    <img src={room.image || 'https://via.placeholder.com/400x250?text=Room'} alt={room.type} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Room'; }} />
                    {room.status === 'available' && roomId === room.id && <div className="selected-badge">✓ Selected</div>}
                    {room.status !== 'available' && <div className="unavailable-badge">Unavailable</div>}
                  </div>
                  <div className="room-card-content">
                    <div className="room-card-header">
                      <h3>{room.type}</h3>
                      <span className="room-number-badge">#{room.room_number}</span>
                    </div>
                    <div className="room-card-price">
                      <span className="price-amount">${parseFloat(room.price).toFixed(2)}</span>
                      <span className="price-unit">/ night</span>
                    </div>
                    <div className={`room-status-badge ${room.status === 'available' ? 'available' : 'booked'}`}>{room.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary Panel */}
          <div className="bookings-right-panel">
            <div className="booking-summary-card">
              <h2 className="bookings-section-title">Booking Details</h2>
              
              {roomId && (
                <div className="selected-room-preview">
                  {(() => {
                    const selectedRoom = rooms.find(r => r.id === roomId);
                    return selectedRoom ? (
                      <>
                        <img src={selectedRoom.image || 'https://via.placeholder.com/300x200?text=Room'} alt={selectedRoom.type} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Room'; }} />
                        <div className="preview-info">
                          <h4>{selectedRoom.type} #{selectedRoom.room_number}</h4>
                          <p>${parseFloat(selectedRoom.price).toFixed(2)} per night</p>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              )}

              <div className="date-inputs">
                <div className="date-input-group">
                  <label>Check-In Date</label>
                  <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} />
                </div>
                <div className="date-input-group">
                  <label>Check-Out Date</label>
                  <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)} />
                </div>
              </div>

              {checkIn && checkOut && roomId && (
                <div className="price-calculation">
                  <div className="price-row"><span>Room Price</span><span>${parseFloat(rooms.find(r => r.id === roomId)?.price || 0).toFixed(2)}/night</span></div>
                  <div className="price-row"><span>Nights</span><span>{Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))}</span></div>
                  <div className="price-row total"><span>Total Price</span><span>${calculatePrice(roomId, checkIn, checkOut).toFixed(2)}</span></div>
                </div>
              )}

              <button className="confirm-booking-btn" onClick={addBooking} disabled={!roomId || !checkIn || !checkOut}>Confirm Reservation</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Reservation History Section --- */}
      {activeTab === 'reservations' && (
        <div className="reservations-content">
          <h2 className="bookings-section-title">{user.role === 'admin' ? 'All Reservations' : 'My Reservations'}</h2>
          
          {message && <div className={`message-alert ${message.includes('success') ? 'success' : 'error'}`} style={message.includes('success') ? {} : { color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb' }}>{message}</div>}
          
          {bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No Reservations Yet</h3>
              <p>Start by making your first reservation!</p>
              <button className="empty-action-btn" onClick={() => setActiveTab('book')}>Make a Reservation</button>
            </div>
          ) : (
            <div className="reservations-grid">
              {bookings.map(b => {
                const room = rooms.find(r => r.id === b.room_id);
                return (
                  <div key={b.id} className="reservation-card">
                    <div className="reservation-image">
                      <img src={room?.image || 'https://via.placeholder.com/300x200?text=Room'} alt={room?.type} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Room'; }} />
                    </div>
                    <div className="reservation-details">
                      <h3>{room?.type || 'Room'} #{room?.room_number || b.room_id}</h3>
                      <div className="reservation-dates">
                        <span className="date-item"><strong>Check-In:</strong> {new Date(b.start_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <span className="date-separator">→</span>
                        <span className="date-item"><strong>Check-Out:</strong> {new Date(b.end_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="reservation-price">
                        <span className="price-label">Total:</span>
                        <span className="price-value">${parseFloat(b.total_price).toFixed(2)}</span>
                      </div>
                      <button className="delete-reservation-btn" onClick={() => deleteBooking(b.id)} title="Cancel Reservation">🗑️ Cancel Reservation</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* --- Conflict Resolution Modal --- */}
      {conflictData && (
        <div className="modal-overlay" onClick={() => setConflictData(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setConflictData(null)}>×</button>
            
            <div className="modal-header">
              <span className="modal-icon">⚠️</span>
              <h3>Room Unavailable</h3>
              <p style={{color:'#666', marginTop:'5px'}}>The selected room is fully booked for these dates:</p>
            </div>

            <div className="conflict-dates-list">
              {conflictData.dates.map((booking, idx) => (
                <div key={idx} className="conflict-item">
                  📅 {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                </div>
              ))}
            </div>

            <div className="suggestion-section">
              <h4>✨ Available Alternatives for Your Dates</h4>
              {conflictData.suggestions.length > 0 ? (
                <div className="suggestion-grid">
                  {conflictData.suggestions.slice(0, 4).map(room => (
                    <div key={room.id} className="suggestion-card" onClick={() => selectAlternative(room.id)}>
                      <h5>{room.type} #{room.room_number}</h5>
                      <div className="suggestion-price">${room.price} <small>/night</small></div>
                      <div style={{fontSize:'0.8rem', color:'#3498db', marginTop:'5px'}}>Click to Select</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{color:'#777', fontStyle:'italic'}}>Sorry, no other rooms are available for these dates.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Bookings;