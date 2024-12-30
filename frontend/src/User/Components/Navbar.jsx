import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // To track the user's role
  const navigate = useNavigate();

  useEffect(() => {
    // Check login state on component mount
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setRole(user.role?.RoleName || "guest"); // Default to "guest" if role is undefined
    } else {
      setRole("guest");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user info
    setIsLoggedIn(false);
    setRole("guest");
    navigate("/login"); // Redirect to login page
  };

  const renderMenu = () => {
    if (role === "admin") {
      return (
        <>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/manage-users" className="nav-link">
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link">
              Reports
            </Link>
          </li>
        </>
      );
    } else if (role === "exhibitor") {
      return (
        <>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/event" className="nav-link">
              Event
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link">
              Schedule
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/seminar" className="nav-link">
              Seminar
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/workshop" className="nav-link">
              Workshop
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/event" className="nav-link">
              Event
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/schedule" className="nav-link">
              Schedule
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid mx-5">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="assets/img/logo/logo.png"
            alt="Logo"
            style={{
              height: "50px",
            }}
          />
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">{renderMenu()}</ul>

          {/* Buttons on the Right */}
          <div className="d-flex">
            {isLoggedIn ? (
              <button
                className="btn3  me-2"
                style={{ fontSize: "14px" }}
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn3  mx-2"
                  style={{ fontSize: "14px" }}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn3 "
                  style={{ fontSize: "14px" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
