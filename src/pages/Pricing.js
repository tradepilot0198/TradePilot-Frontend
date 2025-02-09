import React from "react";
import "./Pricing.css"; // Import the CSS file
import Footer from "../components/Footer";

const Pricing = () => {
  return (
    <div>

<div className="pricing-container">
      <h2 className="pricing-title">Choose Your Plan</h2>

      <div className="pricing-cards">
        {/* Weekly Plan */}
        <div className="pricing-card">
          <h3>Weekly Plan</h3>
          <p className="price">$4.99 / week</p>
          <ul className="features">
            <li>✔ Full Access to Features</li>
            <li>✔ 24/7 Support</li>
            <li>✔ Cancel Anytime</li>
          </ul>
          <button className="subscribe-button">Subscribe</button>
        </div>

        {/* Monthly Plan */}
        <div className="pricing-card">
          <h3>Monthly Plan</h3>
          <p className="price">$19.99 / month</p>
          <ul className="features">
            <li>✔ Full Access to Features</li>
            <li>✔ 24/7 Support</li>
            <li>✔ Priority Assistance</li>
          </ul>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>

<Footer></Footer>
    </div>
    
  );
};

export default Pricing;
