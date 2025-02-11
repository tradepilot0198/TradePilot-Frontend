import React, { useState } from 'react';
import axios from 'axios';
import './MessageUs.css'; // Add your CSS styles for the form
import Footer from '../components/Footer'; // Import Footer component


const MessageUs = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate if fields are filled
    if (!subject || !message) {
      alert("Please fill in both subject and message.");
      return;
    }

    // Retrieve email from cookies
    const userEmail = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];

    // Sending the message to the backend
    axios.post("http://localhost:5000/send-message", { subject, message, email: userEmail })
      .then((response) => {
        if (response.data.success) {
          alert("We have received your request and will answer you shortly.");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("There was an error sending your message. Please try again later.");
      });
  };

  return (
    <div>
 <div className="messageus-container" style={{border:'1px solid white'}}>
      <h2 style={{color:'white',textAlign:'left'}}>Feel free to ask anything</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </div>
        <div className="input-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
     {/* Footer */}
     <Footer />
    </div>
   

   
  );
};

export default MessageUs;
