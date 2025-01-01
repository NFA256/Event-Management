import React from "react";
import { Link } from "react-router-dom";
import Faq from "../Pages/Faq";
const HeroSection = () => (
  <div className="slider-area2">
    <div className="slider-height2 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap text-center">
              <h2>About Us</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// About Section Content
export const AboutContent = () => (
  <section className="about-low-area section-padding2">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="about-caption mb-50">
            <div className="section-tittle mb-35">
              <h2>The Biggest Digital Conference.</h2>
            </div>
            <p>
              Event Sphere Management specializes in organizing and managing
              dynamic expo events that bring industries, businesses, and
              communities together under one roof. With years of experience in
              creating successful expos, we focus on providing a platform where
              exhibitors and attendees can connect and exchange ideas in a
              seamless and professional environment.
            </p>
            <p>
              <strong>Our Mission</strong> To empower businesses and industries
              by creating a collaborative environment where innovation thrives,
              opportunities are unlocked, and lasting impressions are made.
            </p>
          </div>

          <div className="text-left ">
            <Link to="/becomaexhibitor" className="btn3  ">
              Become An Exhibitor
            </Link>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="about-img ">
            <div className="about-font-img d-none d-lg-block">
              <img src="assets/img/gallery/about2.png" alt="" />
            </div>
            <div className="about-back-img ">
              <img src="assets/img/gallery/about1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const AboutPricing = () => (
  <>
  <section className="pricing-card-area section-padding2">
    <div className="container">
      {/* <!-- Section Tittle --> */}
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-8">
          <div className="section-tittle text-center mb-100">
            <h2>Our Services</h2>
            <p>
              Explore our range of services designed to help you achieve your goals and take your experience to the next level.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Seminars Card */}
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10">
          <div className="single-card text-center mb-30">
            <div className="card-top">
              <h4>Seminars</h4>
            </div>
            <div className="card-bottom">
              <ul>
                <li>Engaging Presentations from Industry Leaders</li>
                <li>Inspirational and Motivational Topics</li>
                <li>Interactive Q&A Sessions</li>
                <li>Networking Opportunities</li>
              </ul>
              <Link to="/seminar" className="btn3">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Workshops Card */}
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10">
          <div className="single-card active text-center mb-30">
            <div className="card-top">
              <h4>Workshops</h4>
            </div>
            <div className="card-bottom">
              <ul>
                <li>Expert-Led, Hands-On Sessions</li>
                <li>Skill Development and Practical Learning</li>
                <li>Personalized Guidance and Support</li>
                <li>Small Group Interactions</li>
                <li>Access to Learning Resources</li>
              </ul>
              <Link to="/workshop" className="btn3">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Event Management Card */}
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10">
          <div className="single-card text-center mb-30">
            <div className="card-top">
              <h4>Event Management</h4>
            </div>
            <div className="card-bottom">
              <ul>
                <li>Comprehensive Planning and Execution</li>
                <li>Custom Themes and Event Styling</li>
                <li>Seamless Technology Integration</li>
                <li>Logistics and Vendor Coordination</li>
                <li>Post-Event Feedback and Reporting</li>
              </ul>
              <Link to="/event" className="btn3">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

);

// Main About Component
const About = () => (
  <>
    <main>
      <HeroSection />
      <AboutContent />
      <AboutPricing />
        <Faq />
      
    </main>
  </>
);

export default About;
