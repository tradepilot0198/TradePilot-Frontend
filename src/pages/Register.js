import React, { useState } from 'react';
import './Register.css'; // Import CSS for styling
import axios from 'axios';
import Footer from '../components/Footer';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [country, setCountry] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeLiability, setAgreeLiability] = useState(false);
    

    // Send OTP to the email
    const sendOtp = async () => {
        try {
            await axios.post('http://localhost:5000/send-otp', { email });
            setOtpSent(true);
            let timeLeft = 30;
            setOtpTimer(timeLeft);
            const timer = setInterval(() => {
                timeLeft -= 1;
                setOtpTimer(timeLeft);
                if (timeLeft === 0) clearInterval(timer);
            }, 1000);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { email, otpEntered: otp });
            alert(response.data.message);  // Show success message
            setOtpVerified(true);
        } catch (error) {
            console.error('Error verifying OTP:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'OTP verification failed');
        }
    };
    

    const handleRegister = async () => {
        if (!agreeTerms || !agreeLiability) {
            alert('Please agree to the terms and conditions.');
            return;
        }
    
        if (!otpVerified) {
            alert('Please verify the OTP first.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/register', {
                name,
                username,
                email,
                password,
                mobileno,
                country
            });
    
            alert(response.data.message);
            window.location.href = "/login";
        } catch (error) {
            console.error('Error during registration:', error);
            alert('User Already Exist');
        }
    };
    

    return (
        <div>

<div className="register-container">
            <h2 style={{color:'white', textAlign:'left'}}>REGISTER</h2>
            <div className="form-container">
                <div className="input-field">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-field">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-field">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-field">
                    <label>Mobile Number</label>
                    <input type="text" value={mobileno} onChange={(e) => setMobileno(e.target.value)} />
                </div>
                <div className="input-field">
                    <label>Country</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>

                {/* OTP Section */}
                <div className="input-field">
                    <button
                        className="otp-btn"
                        onClick={sendOtp}
                        disabled={otpSent && otpTimer > 0}
                        style={{ width: '120px' }}
                    >
                        {otpSent ? `Resend in ${otpTimer}s` : 'Get OTP'}
                    </button>
                </div>
                {otpSent && (
                    <div className="input-field">
                        <label>Enter Email OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            disabled={otpVerified}
                        />
                        <button onClick={verifyOtp} disabled={otpVerified}>
                            Verify OTP
                        </button>
                    </div>
                )}

                {/* Checkbox Section */}
                <div className="checkbox-group">
                    <div>
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            style={{minWidth:'20px', marginTop: '21px'}}
                        />
                        <label style={{fontSize:'12px'}}>Agree to Terms & Conditions</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={agreeLiability}
                            onChange={(e) => setAgreeLiability(e.target.checked)}
                            style={{minWidth:'20px', marginTop: '21px'}}
                        />
                        <label style={{fontSize:'12px'}}>You are Liable for your Loss in crisis</label>
                    </div>
                </div>

                {/* Register Button */}
                <div className="input-field">
                    <button onClick={handleRegister} disabled={!agreeTerms || !agreeLiability || !otpVerified}>
                        Register
                    </button>
                </div>
            </div>
        </div>


                <Footer></Footer>

        </div>
        
    );
};

export default Register;
