import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Botinfo.css';

const Botinfo = () => {
  const [isOn, setIsOn] = useState(false);

  // Get email from cookies
  const email = document.cookie.split("; ").find(row => row.startsWith("email="))?.split("=")[1] || "";

  useEffect(() => {
    if (!email) return;

    // Fetch botStatus from backend
    axios.post("http://localhost:5000/get-bot-status", { email })
      .then((response) => {
        if (response.data.success) {
          setIsOn(response.data.botStatus === "true"); // Convert string to boolean
        }
      })
      .catch((error) => console.error("Error fetching bot status:", error));
  }, [email]);

  const toggleSwitch = () => {
    // Confirmation alert before toggling
    const confirmationMessage = isOn ? "Do you want to stop the bot?" : "Do you want to start the bot?";
    if (window.confirm(confirmationMessage)) {
      const newStatus = !isOn; // Toggle status

      // Update botStatus in the database
      axios.post("http://localhost:5000/update-bot-status", { email, botStatus: newStatus })
        .then((response) => {
          if (response.data.success) {
            setIsOn(newStatus);
          } else {
            alert("Failed to update bot status");
          }
        })
        .catch((error) => console.error("Error updating bot status:", error));
    }
  };

  return (
    <div>
      <div className="botinfo-container">
        <div className="left-div" style={{ width: '100%' }}>
          <img src="/assets/img/robot.jpg" alt="Robot" width="100px" />

          {/* Toggle Button */}
          <div className={`toggle ${isOn ? 'toggle-on' : ''}`} onClick={toggleSwitch}>
            <div className="toggle-text-off">OFF</div>
            <div className="glow-comp"></div>
            <div className="toggle-button"></div>
            <div className="toggle-text-on">ON</div>
          </div>
          <p><b>Toggle the Button to Turn Bot on / off.</b></p>
        </div>

        <div className="right-div" style={{ width: '100%' }}>
          <h3># Today's Profit:</h3><b style={{ color: 'green' }}>+5.64$</b>
          <h3># Current Trade Count:</h3><b>2</b>
          <h3># Current Trade Status:</h3> <b> BTCUSDT 5x <span style={{ color: 'green' }}>+1.2%</span> </b>
        </div>
      </div>

      <div className="left-div" style={{ width: '50%', display: 'inline-block' }}>
        <h3># Membership Status:</h3><b style={{ color: 'green' }}>ACTIVE</b>
        <h3># Server Time:</h3><b style={{ color: 'black' }}>2 Feb 2025 , 9:55:10PM</b>
      </div>

      <div className="right-div" style={{ width: '50%', display: 'inline-block' }}>
        <h3># Cooldown Timer:</h3><b>2 hour 45 min 15 sec </b>
        <h3># System Status:</h3> <b style={{ color: 'forestgreen' }}> RUNNING </b>
      </div>
    </div>
  );
};

export default Botinfo;
