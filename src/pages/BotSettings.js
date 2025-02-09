import React, { useState, useEffect } from "react";
import axios from "axios";
import './BotSettings.css';
import Footer from "../components/Footer";

const BotSettings = () => {
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");
    const [isExisting, setIsExisting] = useState(false);
    
    // Get email from cookies
    const email = document.cookie.split("; ").find(row => row.startsWith("email="))?.split("=")[1] || "";

    useEffect(() => {
        if (!email) return;
        
        // Fetch API details from the backend
        axios.post("http://localhost:5000/get-bind-details", { email })
            .then((response) => {
                if (response.data.success && response.data.data) {
                    setApiKey(response.data.data.apiKey);
                    setApiSecret(response.data.data.apiSecret);
                    setIsExisting(true); // Data exists
                } else {
                    setIsExisting(false); // No entry found
                }
            })
            .catch((error) => console.error("Error fetching API details:", error));
    }, [email]);

    const handleSave = () => {
        if (!apiKey || !apiSecret) {
            alert("API Key and Secret are required.");
            return;
        }

        const url = isExisting ? "http://localhost:5000/update-bind-details" : "http://localhost:5000/insert-bind-details";

        axios.post(url, { email, broker: "Binance", apiKey, apiSecret })
            .then((response) => {
                alert(response.data.message);
                setIsExisting(true); // Mark as existing after first save
            })
            .catch((error) => console.error("Error saving API details:", error));
    };

    return (
        <div>
            <div style={{ padding: "40px", maxWidth: "400px", margin: "auto", backgroundColor: "black", border:'1px solid white', borderRadius: "10px" }}>
                <h2 style={{color:'white', textAlign:'left'}}>Bot Settings</h2>
                
                <label>Broker:</label>
                <select disabled style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
                    <option>Binance</option>
                </select>

                <label>API Key:</label>
                <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter API Key"
                    style={{ width: "94%", padding: "10px", marginBottom: "10px" }}
                />

                <label>API Secret:</label>
                <input
                    type="text"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    placeholder="Enter API Secret"
                    style={{ width: "94%", padding: "10px", marginBottom: "10px" }}
                />

                <button onClick={handleSave} style={{ width: "100%", padding: "10px",marginTop:'15px', backgroundColor: "#FCC737", color: "white", border: "none", cursor: "pointer" }}>
                    {isExisting ? "Update" : "Add"}
                </button>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default BotSettings;
