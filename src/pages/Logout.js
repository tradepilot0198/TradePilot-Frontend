import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    // Function to delete a cookie by name
    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    useEffect(() => {
        // Delete all relevant cookies on logout
        deleteCookie("id");
        deleteCookie("email");
        deleteCookie("user");
        deleteCookie("loggedInTime");
        deleteCookie("logoutExpireAt");

        // Redirect to login page after logging out
        navigate("/login");
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Logging you out...</h2>
            <p>You will be redirected to the login page shortly.</p>
        </div>
    );
};

export default Logout;
