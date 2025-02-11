import React, { useState } from "react";
import "./FAQ.css"; // Import the CSS file
import Footer from "../components/Footer";

const FAQ = () => {
  const faqs = [
    {
      question: "What is TradePilot?",
      answer: "TradePilot is an automated trading platform that helps users make informed trading decisions using AI-driven analytics."
    },
    {
      question: "How does the subscription work?",
      answer: "You can subscribe to a weekly or monthly plan, which gives you access to premium trading features and support."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes! You can cancel your subscription anytime, and you won’t be charged for the next billing cycle."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely! We use secure payment gateways to ensure all transactions are safe and encrypted."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! We provide 24/7 customer support to assist you with any issues or questions."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
        <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{openIndex === index ? "▲" : "▼"}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </div>
    
  );
};

export default FAQ;
