const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');   // Password hashing
const jwt = require('jsonwebtoken');  // Token generation

// --- Configuration ---
const app = express();
const PORT = 5000;
const SECRET_KEY = 'otel_projesi_gizli_anahtar_123'; // JWT Secret

// --- Middleware ---
app.use(cors());        // Enable CORS
app.use(express.json());// Parse JSON bodies

// --- Database Connection ---
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',     // Database password  
  database: 'hotel_db'
});

db.connect((err) => {
  if (err) console.log('MySQL connection error:', err);
  else console.log('MySQL connected');
});

/* --- Auth Routes --- */

// Login User
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 1. Find user by email
  db.query('SELECT * FROM users WHERE email=?', [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate Token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '2h' });

    // 4. Send response
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token 
    });
  });
});

/* --- User Routes --- */

// Get All Users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Register New User
app.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert into DB
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)';
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.json({ message: 'User added' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption error' });
  }
});

/* --- Room Routes --- */

// Get All Rooms
app.get('/rooms', (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add New Room
app.post('/rooms', (req, res) => {
  const { room_number, type, price, status, image } = req.body;
  const sql = 'INSERT INTO rooms (room_number, type, price, status, image) VALUES (?,?,?,?,?)';
  db.query(sql, [room_number, type, price, status, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Room added' });
  });
});

// Update Room Price
app.put('/rooms/:id', (req, res) => {
  const { price } = req.body;
  const { id } = req.params;
  
  db.query('UPDATE rooms SET price = ? WHERE id = ?', [price, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Room price updated successfully' });
  });
});

/* --- Booking Routes --- */

// Get All Bookings
app.get('/bookings', (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add Booking (With Validation)
app.post('/bookings', (req, res) => {
  const { user_id, room_id, start_date, end_date, total_price } = req.body;

  console.log("New Booking Request:", req.body);

  if (!user_id || !room_id || !start_date || !end_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // 1. Check for Conflicts
  const checkSql = `
    SELECT * FROM bookings 
    WHERE room_id = ? 
    AND start_date < ? 
    AND end_date > ?
  `;

  db.query(checkSql, [room_id, end_date, start_date], (err, results) => {
    if (err) {
      console.error("Validation error:", err);
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'This room is already booked for the selected dates! Please choose different dates.' });
    }

    // 2. Insert if no conflict
    const insertSql = 'INSERT INTO bookings (user_id, room_id, start_date, end_date, total_price) VALUES (?,?,?,?,?)';
    
    db.query(insertSql, [user_id, room_id, start_date, end_date, total_price], (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ message: 'Error adding booking' });
        }
        res.json({ message: 'Booking added', id: result.insertId });
      }
    );
  });
});

// Delete Booking
app.delete('/bookings/:id', (req, res) => {
  const bookingId = req.params.id;

  // Check if booking exists
  db.query('SELECT * FROM bookings WHERE id = ?', [bookingId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error checking booking' });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Delete booking
    db.query('DELETE FROM bookings WHERE id = ?', [bookingId], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error deleting booking' });
      res.json({ message: 'Reservation cancelled successfully', id: bookingId });
    });
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});