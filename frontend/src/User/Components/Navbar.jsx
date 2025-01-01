import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext"; 

const Navbar = () => {
  // Get user data and logout function from the UserContext
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    logout() // Call the logout function from context to clear user data
    navigate("/login"); // Redirect to the login page after logout
  };

  // Render the navigation menu based on user role
  const renderMenu = () => {
    if (user.role === "admin") {
      // Menu items for admin
      return (
        <>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/seminar" className="nav-link">Seminar</Link>
          </li>
          <li className="nav-item">
            <Link to="/workshop" className="nav-link">Workshop</Link>
          </li>
          <li className="nav-item">
            <Link to="/event" className="nav-link">Event</Link>
          </li>
        </>
      );
    } else if (user.role === "exhibitor") {
      // Menu items for exhibitor
      return (
        <>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/seminar" className="nav-link">Seminar</Link>
          </li>
          <li className="nav-item">
            <Link to="/workshop" className="nav-link">Workshop</Link>
          </li>
          <li className="nav-item">
            <Link to="/event" className="nav-link">Event</Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link">Schedule</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </>
      );
    } else {
      // Menu items for guest or non-logged-in users
      return (
        <>
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/seminar" className="nav-link">Seminar</Link>
          </li>
          <li className="nav-item">
            <Link to="/workshop" className="nav-link">Workshop</Link>
          </li>
          <li className="nav-item">
            <Link to="/event" className="nav-link">Event</Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link">Schedule</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          {user.isLogin && (
            <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
          )}
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid mx-5">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src="assets/img/logo/logo.png" alt="Logo" style={{ height: "50px" }} />
        </Link>

        {/* Hamburger for mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">{renderMenu()}</ul>

          {/* Right-side buttons (Login/Logout/Register) */}
          <div className="d-flex">
            {user.isLogin ? (
              <button className="btn3 me-2" style={{ fontSize: "14px" }} onClick={handleLogout}>
                Log Out
              </button>
            ) : (
              <>
                <Link to="/login" className="btn3 mx-2" style={{ fontSize: "14px" }}>Log In</Link>
                <Link to="/register" className="btn3" style={{ fontSize: "14px" }}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
