import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Get current route

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // ✅ Remove token
        setIsAuthenticated(false); // ✅ Set authentication state to false
        
        // ✅ Clear cookies
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "loggedInTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "logoutExpireAt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        navigate("/login"); // ✅ Redirect to login
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                {location.pathname === "/admindashboard" 
                || location.pathname === "/users-info" || location.pathname === "/membership-info" ? ( 
                    // ✅ Admin Navbar
                    <>
                        <a className='Logo-text' href="">TradePilot Admin</a>
                        <Link to="/admindashboard" className="nav-link">Dashboard</Link>
                        <Link to="/users-info" className="nav-link">Users Info</Link>
                        <Link to="/membership-info" className="nav-link">Membership Info</Link>
                        <Link to="/ranking-info" className="nav-link">Ranking Info</Link>
                        <button onClick={handleLogout} className="logoutButton" style={{minWidth:'93px',maxWidth:'94px'}}>Logout</button>
                    </>
                ) : isAuthenticated ? (
                    // ✅ User Navbar
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
                    // ✅ Guest Navbar
                    <>  
                        <a className='Logo-text' href="">TradePilot</a>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/pricing" className="nav-link">Pricing</Link>
                        <Link to="/faq" className="nav-link">FAQ</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/contactus" className="nav-link">Contact Us</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
