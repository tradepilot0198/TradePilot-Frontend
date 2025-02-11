import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';
import Footer from '../components/Footer'; // Import Footer component


const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    // State variables
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpTimer, setOtpTimer] = useState(60);
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        if (!email) {
            alert("Please enter your email to receive OTP");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/send-login-otp", { email });
    
            // Check if the response status is 400 (user not registered)
            if (response.status === 400) {
                alert("Please Register Before Login");
            } else {
                // If OTP is successfully sent, update the state
                setOtpSent(true);
                setOtpTimer(60);
                startOtpTimer();
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Please Register Before Login.");
            setLoading(false);
        }
    };

    // Countdown Timer
    const startOtpTimer = () => {
        const timer = setInterval(() => {
            setOtpTimer((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setOtpSent(false);
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Verify OTP
    const verifyOtp = async () => {
        if (!otp) {
            alert("Please enter OTP");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/verify-login-otp", { email, otpEntered: otp });

            if (response.data.message === "OTP verified successfully!") {
                setOtpVerified(true);
                alert("OTP verified. Please enter your password.");
            } else {
                alert("Invalid OTP! Try again.");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Error verifying OTP! Try again.");
            setLoading(false);
        }
    };

    const loginUser = async () => {
        if (!password) {
            alert("Please enter your password.");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/login", { email, password });
    
            if (response.status === 200) {
                const { user, token } = response.data;
    
                // Store JWT token in localStorage
                localStorage.setItem("authToken", token); // Store JWT token
    
                // Store user details in cookies
                document.cookie = `id=${user.id}; path=/`;
                document.cookie = `email=${user.email}; path=/`;
                document.cookie = `user=${user.name}; path=/`;
                document.cookie = `loggedInTime=${Date.now()}; path=/`;
                document.cookie = `logoutExpireAt=${Date.now() + 30 * 60 * 1000}; path=/`;
    
                // Update the authentication state
                setIsAuthenticated(true);  // <-- Set the authentication state to true
    
                // Check if the user is admin, and redirect accordingly
                if (user.email === 'admin@tradepilot.in') {
                    navigate("/admindashboard");
                } else {
                    navigate("/dashboard");
                }
            }
            setLoading(false);
        } catch (error) {
            console.error("Login error:", error);
            alert("Invalid credentials. Try again.");
            setLoading(false);
        }
    };
    

    return (
        <div style={{ textAlign: "center", marginTop: "50px" , backgroundColor:'black'}}>
            <h2 style={{color:'white'}}>LOGIN</h2>
            
            {/* Email Input */}
            <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "8px", margin: "5px" }}
                disabled={otpSent}
            />
            <br />

            {/* OTP Input */}
            {otpSent && (
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ padding: "8px", margin: "5px" }}
                    disabled={otpVerified}
                />
            )}
<br />
            {/* OTP Button */}
            {!otpVerified && (
                <button
                    onClick={sendOtp}
                    disabled={otpSent && otpTimer > 0 || loading}
                    style={{ padding: "8px", margin: "5px" }}
                >
                    {otpSent ? `Resend in ${otpTimer}s` : "Get OTP"}
                </button>
            )}

            {/* Verify OTP Button */}
            {otpSent && !otpVerified && (
                <button
                    onClick={verifyOtp}
                    disabled={loading}
                    style={{ padding: "10px", margin: "10px" }}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            )}

            {/* Password Input & Login Button */}
            {otpVerified && (
                <>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: "8px", margin: "5px" }}
                    />
                    <br />
                    <button onClick={loginUser} disabled={loading} style={{ padding: "10px", margin: "10px" }}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </>
            )}
<br />
<a href="/forgot-password" style={{textDecoration:'none',color:'white'}}>Forgot Password</a>

            {/* Footer */}
                  <Footer />
        </div>
    );
};

export default Login;
