import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [todaysRegistrations, setTodaysRegistrations] = useState(0);

  // Function to fetch today's registrations count
  const fetchTodaysRegistrations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todays-registrations");
      setTodaysRegistrations(response.data.count);
    } catch (error) {
      console.error("Error fetching today's registrations:", error);
    }
  };

  // Fetch data every 5 seconds while on the page
  useEffect(() => {
    fetchTodaysRegistrations(); // Initial fetch
    const interval = setInterval(fetchTodaysRegistrations, 10000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (

    <div>

<div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats-card">
        <h3>Today's Registrations</h3>
        <p>{todaysRegistrations}</p>
      </div>
    </div>

    <Footer></Footer>

    </div>

    
  );
};

export default AdminDashboard;
