import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    // Check if the token is available in localStorage or cookies
    const token = localStorage.getItem("authToken");  // Or use cookies if you prefer

    if (!token) {
        // If no token is found, redirect to the login page
        return <Navigate to="/Login" />;
    }

    // If token is available, allow access to the children components
    return children;
};

export default PrivateRoute;
