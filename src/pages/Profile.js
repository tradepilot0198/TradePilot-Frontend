import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Add your CSS styles for the profile page
import Footer from '../components/Footer'; // Import Footer component


const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    mobileno: '',
    country: ''
  });

  const email = document.cookie.split("; ").find(row => row.startsWith("email="))?.split("=")[1] || "";

  useEffect(() => {
    if (!email) return;

    // Fetch user details from backend
    axios.post("http://localhost:5000/get-user-details", { email })
      .then((response) => {
        if (response.data.success) {
          setUserDetails(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/update-user-details", userDetails)
      .then((response) => {
        if (response.data.success) {
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile.");
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div>
<div className="profile-container" style={{ padding: '40px', maxWidth: '600px', margin: 'auto', backgroundColor: 'black', border:'1px solid white', borderRadius: '10px' }}>
      <h2 style={{color:'white' , textAlign:'left'}}>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            disabled
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileno"
            value={userDetails.mobileno}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={userDetails.country}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', marginTop:'15px', backgroundColor: "#FCC737", color: 'black', border: 'none', cursor: 'pointer' }}>
          Update Profile
        </button>
      </form>

    </div>
    {/* Footer */}
    <Footer />
    </div>
    

    
  );
};

export default Profile;
