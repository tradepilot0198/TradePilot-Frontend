// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";
// import "./ContactUs.css";

// const SITE_KEY = "6LeM_M8qAAAAAAU4_8kps_7mpMPZskuk83cJKXwu"; // Replace with your actual reCAPTCHA site key

// const ContactUs = () => {
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [captchaToken, setCaptchaToken] = useState(null);
//   const [cooldownTime, setCooldownTime] = useState(0);

//   // Check if the user has submitted in the last 15 minutes
//   useEffect(() => {
//     const lastSentTime = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("lastContactUs="))
//       ?.split("=")[1];

//     if (lastSentTime) {
//       const timeElapsed = (Date.now() - parseInt(lastSentTime, 10)) / 1000;
//       if (timeElapsed < 900) {
//         setCooldownTime(900 - timeElapsed);
//       }
//     }
//   }, []);

//   // Countdown timer for cooldown
//   useEffect(() => {
//     if (cooldownTime > 0) {
//       const timer = setInterval(() => {
//         setCooldownTime((prev) => (prev > 1 ? prev - 1 : 0));
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [cooldownTime]);

//   // Handle reCAPTCHA response
//   const handleCaptchaChange = (token) => {
//     setCaptchaToken(token);
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (cooldownTime > 0) {
//       alert(`Please wait ${Math.ceil(cooldownTime / 60)} minutes before sending another request.`);
//       return;
//     }

//     if (!subject || !message) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     if (!captchaToken) {
//       alert("Please verify the reCAPTCHA.");
//     //   return;
    
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/contact-us", {
//         subject,
//         message,
//         captchaToken, // Send captchaToken to backend for verification
//       });

//       if (response.data.success) {
//         alert("Message sent successfully!");
//         setSubject("");
//         setMessage("");
//         setCaptchaToken(null);

//         // Set cooldown time and store timestamp in cookies
//         setCooldownTime(900);
//         document.cookie = `lastContactUs=${Date.now()}; path=/; max-age=900`;
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error sending message.");
//     }
//   };

//   return (
//     <div className="contact-container">
//       <h2>Contact Us</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         />
//         <textarea
//           placeholder="Your Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
        
//         {/* Google reCAPTCHA */}
//         <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />

//         <button type="submit" disabled={cooldownTime > 0 || !captchaToken}>
//           {cooldownTime > 0 ? `Wait ${Math.ceil(cooldownTime / 60)} min` : "Send Message"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactUs;






import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./ContactUs.css";
import Footer from "../components/Footer";


const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const isLocalhost = "true"; // Check env variable

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isLocalhost && !recaptchaToken) {
      alert("Please verify the reCAPTCHA.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/send-contact", {
        subject,
        message,
        recaptchaToken, // Send reCAPTCHA token only if needed
      });

      if (response.data.success) {
        alert("Message sent successfully!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message.");
    }
  };

  return (
    <div>
      <h2 style={{marginTop:'50px',marginBottom:'30px'}}>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {!isLocalhost && (
          <ReCAPTCHA
            sitekey="6LeM_M8qAAAAAAU4_8kps_7mpMPZskuk83cJKXwu" // Replace with your actual reCAPTCHA site key
            onChange={(token) => setRecaptchaToken(token)}
          />
        )}

        <button type="submit">Send Message</button>
      </form>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
