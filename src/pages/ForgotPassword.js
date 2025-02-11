import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import Footer from "../components/Footer";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/send-forgot-password-otp", { email });
            alert('Forgot Password OTP sent to your Email');
            setOtpSent(true);
        } catch (error) {
            alert(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/verify-forgot-password-otp", { email, otp });
            alert(response.data.message);
            setOtpVerified(true);
        } catch (error) {
            alert(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/reset-password", { email, newPassword });
            alert(response.data.message);
            window.location.href = "/login";
        } catch (error) {
            alert(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

        
<div className="forgot-password-container">
            <h2>Forgot Password</h2>

            {!otpSent && (
                <>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={sendOtp} disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
                </>
            )}

            {otpSent && !otpVerified && (
                <>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={verifyOtp} disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
                </>
            )}

            {otpVerified && (
                <>
                    <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button onClick={resetPassword} disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
                </>
            )}
        </div>
            <Footer></Footer>

        </div>
    );
};

export default ForgotPassword;
