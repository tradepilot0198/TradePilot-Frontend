import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For redirection
import "./Membership.css";

const Membership = () => {
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentId, setPaymentId] = useState(null); // ✅ Store paymentId
    const navigate = useNavigate(); // ✅ Use navigate for redirection

    const handleCheckout = async (memType, amount) => {
        setLoading(true);
        setSelectedPlan(memType); // Store selected plan for UI updates

        try {
            const response = await fetch("http://localhost:5000/api/generate-qr", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memType, amount }),
                credentials: "include", // ✅ Send cookies for authentication
            });

            if (!response.ok) {
                throw new Error("Failed to generate QR code");
            }

            const data = await response.json(); // ✅ Parse response as JSON
            setQrCode(data.qrCode); // ✅ Set QR Code Image URL
            setPaymentId(data.paymentId); // ✅ Store payment ID
        } catch (error) {
            console.error("Checkout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePaidClick = () => {
        if (paymentId) {
            navigate(`/payment/${paymentId}`); // ✅ Redirect to Payment.js
        } else {
            alert("Payment ID not found. Try again.");
        }
    };

    return (
        <div className="membership-container">
            <h1 style={{ color: "#FF9D23" }}>Choose Your Plan</h1>
            <div className="membership-plans">
                <div className="plan">
                    <h2>Starter Trial</h2>
                    <p>Price: ₹100 / Week</p>
                    <ul>
                        <li>✅ Weekly Renewals</li>
                        <li>❌ No Screener Access</li>
                        <li>✅ Customer Support</li>
                    </ul>
                    <button onClick={() => handleCheckout("Weekly", 100)} disabled={loading}>
                        {loading && selectedPlan === "Weekly" ? "Processing..." : "Checkout"}
                    </button>
                </div>

                <div className="plan">
                    <h2>Elite</h2>
                    <p>Price: ₹500 / Month</p>
                    <ul>
                        <li>✅ Monthly Renewals</li>
                        <li>✅ Premium Screener Access</li>
                        <li>✅ Customer Support</li>
                    </ul>
                    <button onClick={() => handleCheckout("Monthly", 500)} disabled={loading}>
                        {loading && selectedPlan === "Monthly" ? "Processing..." : "Checkout"}
                    </button>
                </div>
            </div>

            {qrCode && (
                <div className="qr-section">
                    <h3>Scan the QR Code to Pay</h3>
                    <img src={qrCode} alt="UPI QR Code" />
                    <p>After payment, click the button below.</p>
                    <button onClick={handlePaidClick}>Paid</button> {/* ✅ Redirects to Payment.js */}
                </div>
            )}
        </div>
    );
};

export default Membership;
