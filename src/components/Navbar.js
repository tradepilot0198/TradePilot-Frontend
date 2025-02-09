import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the JWT token from localStorage
        localStorage.removeItem('authToken'); // Make sure to remove the token
        setIsAuthenticated(false); // Set the authentication state to false
        // Delete cookies by setting them to expire in the past
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "loggedInTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "logoutExpireAt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                {isAuthenticated ? (
                    <>  
                        
                        <a className='Logo-text' href="">TradePilot</a>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <Link to="/screener" className="nav-link">Screener</Link>
                        <Link to="/bot-settings" className="nav-link">Bot Settings</Link>
                        <Link to="/trade-history" className="nav-link">Trade History</Link>
                        <Link to="/membership" className="nav-link">Membership</Link>
                        <Link to="/message-us" className="nav-link">Message Us</Link>
                        <button onClick={handleLogout} className="logoutButton" style={{minWidth:'93px',maxWidth:'94px'}}>Logout</button>
                    </>
                ) : (
                    <>  
                        <a className='Logo-text' href="">TradePilot</a>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/pricing" className="nav-link">Pricing</Link>
                        <Link to="/faq" className="nav-link">FAQ</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                        {/* <Link to="/aboutus" className="nav-link">About Us</Link> */}
                        <Link to="/contactus" className="nav-link">Contact Us</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
