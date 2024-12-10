import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      {/* <!--? Header Start --> */}
      <div class="header-area">
        <div class="main-header header-sticky">
          <div class="container-fluid">
            <div class="row align-items-center">
              {/* <!-- Logo --> */}
              <div class="col-xl-2 col-lg-2 col-md-1">
                <div class="logo">
                  <Link to="index.html">
                    <img src="assets/img/logo/logo.png" alt="" />
                  </Link>
                </div>
              </div>
              <div class="col-xl-10 col-lg-10 col-md-10">
                <div class="menu-main d-flex align-items-center justify-content-end">
                  {/* <!-- Main-menu --> */}
                  <div class="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/about">About</Link>
                        </li>
                        <li>
                          <Link to="/speaker">Spakers</Link>
                        </li>
                        <li>
                          <Link to="/schedule">Schedule</Link>
                        </li>
                        {/* <li>
                          <Link to="#">Blog</Link>
                          <ul class="submenu">
                            <li>
                              <Link to="#">Blog</Link>
                            </li>
                            <li>
                              <Link to="#">Blog Details</Link>
                            </li>
                            <li>
                              <Link to="#">Element</Link>
                            </li>
                          </ul>
                        </li> */}
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div class="header-right-btn f-right d-none d-lg-block ml-30">
                    <Link to="#" class="btn header-btn">
                      Get Your Ticket
                    </Link>
                  </div>
                </div>
              </div>
              {/* <!-- Mobile Menu --> */}
              <div class="col-12">
                <div class="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}
    </>
  );
}

export default Navbar