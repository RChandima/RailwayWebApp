import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import AuthRoute from './AuthRoute.tsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdeatSTnogRohC6w-BO0TmXWMVgxCx4rg",
  authDomain: "authentication-3529c.firebaseapp.com",
  projectId: "authentication-3529c",
  storageBucket: "authentication-3529c.appspot.com",
  messagingSenderId: "486876223242",
  appId: "1:486876223242:web:82030a8c88b05a5b09ccf3"
};

// Initialize Firebase (No unused variable)
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Wrap the App component in AuthRoute for authenticated users */}
        <Route path="/" element={<AuthRoute><App /></AuthRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
