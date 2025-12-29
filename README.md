# Hotel Paradise - Hotel Management System

## Description

The Hotel Paradise Management System is a web-based application designed to simplify room reservations, manage availability, and streamline administrative oversight for a modern hotel. This project allows different types of Admins and Guests (Users) — to interact with the system based on their roles.

Admins can manage rooms, view all reservations, and oversee the overall workflow including monthly earnings. Guests can search for available rooms, view details, and make real-time bookings without conflicts. This system ensures a smooth and efficient booking experience for all users using a modern Full-Stack architecture.

## Features
- **Admin Dashboard**: 
  - Manage rooms (create, edit prices, change status).
  - View and manage all guest reservations.
  - View total monthly earnings.
  - Oversee registered users.
  
- **Guest Dashboard**:
  - Browse available rooms with images and prices.
  - Make reservations with real-time conflict detection.
  - View upcoming and past reservations.
  - Receive alternative room suggestions if a room is full.

- **Secure Authentication**:
  - Role-based login system for Admins and Guests.
  - Passwords are securely hashed and stored.
  - Sessions are managed via JSON Web Tokens (JWT).

- **Responsive Design**:
  - Clean, user-friendly interface designed to work on all devices.

## How to Use the Project

### Prerequisites
  Before running the project, ensure you have the following installed:
  - Node.js (v14 or later)
  - MySQL (Server and Workbench)
  - A web browser (for accessing the application)
  - Git

### Setting Up the Project

1. **Clone or Download the Project**:
   - Clone this repository or download it as a ZIP file.

   ```bash
   [https://github.com/boraeskin/hotel-reservation-app.git](https://github.com/boraeskin/hotel-reservation-app.git)


2. **Import the Database**:
- Open your database management tool (MySQL Workbench).
- Create a new schema named hotel_db (or just use the import function).
- Import the SQL file included in the project (database.sql) into the database.


  3. **Configure Backend (Server)**:
- Open a terminal and navigate to the server directory.
- Install dependencies and start the server:
  ```bash
cd hotel-server
npm install
node index.js
```



4. **Run the Frontend (Client):**:
- Open a new terminal window and navigate to the client directory.
- Install dependencies and start the React application:
```bash
cd hotel-client
npm install
npm start
```

Authors
Bora Eskin
