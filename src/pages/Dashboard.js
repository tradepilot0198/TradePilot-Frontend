import React, { useEffect, useState } from "react";
import Botinfo from "../components/Botinfo";
import Footer from '../components/Footer'; // Import Footer component



const Dashboard = () => {
    const [userName, setUserName] = useState("");

    // Function to get cookie value
    const getCookie = (name) => {
        const cookieArr = document.cookie.split("; ");
        for (const cookie of cookieArr) {
            const [key, value] = cookie.split("=");
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    };

    useEffect(() => {
        const storedUser = getCookie("user");
        if (storedUser) {
            setUserName(storedUser);
        }
    }, []);

    // const handleLogout = () => {
    //     // Delete cookies by setting them to expire in the past
    //     document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     document.cookie = "loggedInTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     document.cookie = "logoutExpireAt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //     // Redirect to login page
    //     window.location.href = "/login";
    // };

    return (
        <div style={{ textAlign: "center", backgroundColor:'white'}}>
            <h2 style={{paddingTop:'50px',color:'black'}}>Welcome, {userName || "User"}!</h2>
            
            <Botinfo/>
            <Footer />            
        </div>
    );
};

export default Dashboard;
