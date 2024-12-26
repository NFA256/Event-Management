import React, { useEffect, useState } from "react";
import { AboutContent, AboutPricing } from "../Components/About";
import { ScheduleContent } from "../Components/Schedule";
import Testimonial from "../Components/Testimonial";

const Home = () => {
  const [userName, setUserName] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Local storage se user ka data fetch karna
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.name); // Local storage ka name field
      setIsLoggedIn(true); // User logged in hai
    }
  }, []);

  //--timer
  const calculateTimeLeft = () => {
    const eventDate = new Date("2024-12-31T00:00:00"); // Set your target date here
    const now = new Date();
    const difference = eventDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  //speaker work
   const [speakers, setSpeakers] = useState([]);
   const [error, setError] = useState("");

   useEffect(() => {
     const fetchSpeakers = async () => {
       try {
         const response = await fetch("http://localhost:5000/speakers");
         if (response.ok) {
           const data = await response.json();
           if (Array.isArray(data)) {
             setSpeakers(data);
           } else {
             console.error("API response is not an array:", data);
             setSpeakers([]);
           }
         } else {
           console.error("Failed to fetch speakers");
         }
       } catch (error) {
         console.error("Error fetching speakers:", error);
         setError("Failed to fetch speakers.");
       }
     };
     fetchSpeakers();
   }, []);

   // Get only the last 6 speakers
   const lastSixSpeakers = speakers.slice(-6);
  return (
    <>
      {/* <!--? slider Area Start--> */}
      <div className="slider-area position-relative">
        <div className="slider-active">
          {/* <!-- Single Slider --> */}
          <div className="single-slider slider-height d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-9 col-sm-10">
                  <div className="hero__caption">
                    <span data-animation="fadeInLeft" data-delay=".1s">
                      Discover. Learn. Enjoy !!!
                    </span>
                    <h1
                      className="text-capitalize mx-5"
                      data-animation="fadeInLeft"
                      data-delay=".5s"
                    >
                      Hey, {userName ? userName : "Guest"}!
                      <span className="text-white  mx-4"></span>
                    </h1>

                    {/* <!-- Hero-btn --> */}
                    <div className="slider-btns mx-5">
                      <a
                        data-animation="fadeInLeft"
                        data-delay="1.0s"
                        href="industries.html"
                        className="btn3 hero-btn"
                      >
                        Get Your Ticket
                      </a>
                      <a
                        data-animation="fadeInRight"
                        data-delay="1.0s"
                        className="popup-video video-btn"
                        href="https://www.youtube.com/watch?v=I7D2fJBjRsI"
                      >
                        <i className="fas fa-play"></i>
                      </a>
                      <p
                        className="video-cap d-none d-sm-blcok"
                        data-animation="fadeInRight"
                        data-delay="1.0s"
                      >
                        Story Video
                        <br />
                        Watch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Single Slider --> */}
        </div>
        {/* <!-- Counter Section Begin --> */}
        <div className="counter-section d-none d-sm-block">
          <div className="cd-timer" id="countdown">
            <div className="cd-item">
              <span>{timeLeft.days}</span>
              <p>Days</p>
            </div>
            <div className="cd-item">
              <span>{timeLeft.hours}</span>
              <p>Hrs</p>
            </div>
            <div className="cd-item">
              <span>{timeLeft.minutes}</span>
              <p>Min</p>
            </div>
            <div className="cd-item">
              <span>{timeLeft.seconds}</span>
              <p>Sec</p>
            </div>
          </div>
        </div>
        {/* <!-- Counter Section End --> */}
      </div>

      {/* <!-- slider Area End--> */}
      <AboutContent />
      {/* ///-------------------- */}
      <section className="team-area pt-180 pb-100 section-bg bg-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-9">
              {/* Section Title */}
              <div className="section-tittle section-tittle2 mb-50">
                <h2>The Most Important Speakers.</h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form.
                </p>
                <a href="#" className="btn3 white-btn mt-30">
                  View Speakers
                </a>
              </div>
            </div>

            {/* Speaker Cards */}
            {lastSixSpeakers.length > 0 ? (
              lastSixSpeakers.map((speaker) => (
                <div key={speaker._id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="single-team mb-30">
                    <div className="team-img">
                      <img
                        src={speaker.image || "assets/img/default-avatar.png"}
                        alt={speaker.name}
                      />
                      {/* Social Icons */}
                      <ul className="team-social">
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-globe"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="team-caption">
                      <h3>
                        <a href="#">{speaker.name}</a>
                      </h3>
                      <p>{speaker.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No speakers available.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <ScheduleContent />
      <Testimonial />
      <AboutPricing />
      {/* <!--? Brand Area Start--> */}
      <section
        className="work-company section-padding30"
        style={{ background: "#218fb1ee" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-8">
              {/* <!-- Section Tittle --> */}
              <div className="section-tittle section-tittle2 mb-50">
                <h2>Our Top Genaral Sponsors.</h2>
                <p>
                  There arge many variations ohf passages of sorem gp ilable,
                  but the majority have ssorem gp iluffe.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="logo-area">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand.png" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand2.png" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand3.png" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand4.png" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand5.png" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand6.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Brand Area End-->
      <!--? Blog Area Start --> */}
      <section className="home-blog-area section-padding30">
        <div className="container">
          {/* <!-- Section Tittle --> */}
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="section-tittle text-center mb-50">
                <h2>News From Blog</h2>
                <p>
                  There arge many variations ohf passages of sorem gp ilable,
                  but the majority have ssorem gp iluffe.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="assets/img/gallery/home-blog1.png" alt="" />
                    {/* <!-- Blog date --> */}
                    <div className="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div className="blog-cap">
                    <p>| Physics</p>
                    <h3>
                      <a href="blog_details.html">
                        Footprints in Time is perfect House in Kurashiki
                      </a>
                    </h3>
                    <a href="blog_details.html" className="more-btn">
                      Read more »
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="assets/img/gallery/home-blog2.png" alt="" />
                    {/* <!-- Blog date --> */}
                    <div className="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div className="blog-cap">
                    <p>| Physics</p>
                    <h3>
                      <a href="blog_details.html">
                        Footprints in Time is perfect House in Kurashiki
                      </a>
                    </h3>
                    <a href="blog_details.html" className="more-btn">
                      Read more »
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Blog Area End --> */}
    </>
  );
};

export default Home;
