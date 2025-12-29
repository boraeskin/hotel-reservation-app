import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- Root Initialization ---
const root = ReactDOM.createRoot(document.getElementById('root')); // Create React root

// --- Render Application ---
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);