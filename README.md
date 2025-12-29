# 🏨 Hotel Paradise - Hotel Management System

This project is a full-stack **Hotel Management System** designed to manage room availability, reservations, and administrative tasks for a hotel. It features a real-time booking system, admin dashboard, and secure authentication.

## 🚀 Features

### User Features (Guest)
- **User Registration & Login:** Secure account creation.
- **Room Browsing:** View available rooms with images and prices.
- **Booking System:** Make reservations with real-time availability checks (prevents double booking).
- **My Reservations:** View personal booking history.

### Admin Features
- **Dashboard:** View total monthly earnings.
- **Room Management:** Add new rooms, update room prices, and view status.
- **Reservation Management:** View and cancel reservations.
- **User Management:** View registered users.

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Axios, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Security:** JSON Web Token (JWT) for authentication, Bcrypt for password hashing.

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally.

### 1. Database Setup
1. Open **MySQL Workbench or XAMPP **.
2. Create a new query tab.
3. Copy and paste the content of `database_setup.sql` (or the SQL script provided in the project).
4. Execute the script to create the `hotel_db` database and tables.

### 2. Backend Setup (Server)
The backend runs on port 5000. Open a terminal and run:
# Go to the server directory
cd hotel-server

# Install dependencies
npm install

# Start the server
node index.js
# Output: Server running on port 5000
# Output: MySQL connected


### 3. Frontend Setup (Client)
The frontend runs on port 3000. Open a new terminal window and run:
# Navigate to the client directory
cd hotel-client

# Install dependencies
npm install

# Start the React app
npm start



Project Structure

hotel-management-system/
├── hotel-client/           # React Frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer
│   │   ├── pages/          # Home, Login, Register, Rooms, Bookings, Users
│   │   ├── App.js          # Main Routing & Layout
│   │   ├── App.css         # Global Styling
│   │   └── index.js        # Root Entry
│   └── package.json
│
├── hotel-server/           # Node.js Backend
│   ├── index.js            # Express Server, API Routes & DB Connection
│   └── package.json
│
└── README.md               # Project Documentation