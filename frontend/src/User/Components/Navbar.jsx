import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to toggle login/logout state
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      {/* Header Start */}
      <div className="header-area">
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-2 col-lg-2 col-md-1">
  <div className="logo mb-5">
    <Link to="/">
      <img
        src="assets/img/logo/logo.png"
        alt="Logo"
        style={{
          maxWidth: "400px", // Adjust size as needed
          height: "60px",
          color:'black'
        }}
      />
  
    </Link>
  </div>
</div>

              <div className="col-xl-10 col-lg-10 col-md-10">
                <div className="menu-main d-flex align-items-center justify-content-end">
                  {/* Main-menu */}
                  <div className="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/speaker">Speakers</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>

                  {/* Login/Logout Button */}
                  <div className="header-right-btn f-right d-none d-lg-block ml-30">
                    <Link
                      to="#"
                      className="btn header-btn"
                      onClick={toggleLogin}
                    >
                      {isLoggedIn ? "Log Out" : "Log In"}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}
    </>
  );
}

export default Navbar;
