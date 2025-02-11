import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard"; // Example protected page
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute to manage auth-based routes
import Logout from "./pages/Logout";
import BotSettings from './pages/BotSettings';
import Profile from './pages/Profile';
import MessageUs from './pages/MessageUs';
import ForgotPassword from './pages/ForgotPassword';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if there's a valid auth token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} // Pass setIsAuthenticated prop
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass setIsAuthenticated to Logout component */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/bot-settings"
          element={<PrivateRoute isAuthenticated={isAuthenticated}><BotSettings /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute isAuthenticated={isAuthenticated}><Profile /></PrivateRoute>}
        />
        <Route
          path="/message-us"
          element={<PrivateRoute isAuthenticated={isAuthenticated}><MessageUs /></PrivateRoute>}
        />        
<Route
          path="/screener"
          element={<PrivateRoute isAuthenticated={isAuthenticated}><Screener /></PrivateRoute>}
        />

      </Routes>
    </Router>
  );
};

export default App;
