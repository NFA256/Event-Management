import React, { useEffect, useState } from "react";
import { AboutContent, AboutPricing } from "../Components/About";
import { ScheduleContent } from "../Components/Schedule";
import Testimonial from "../Components/Testimonial";
import Faq from "./Faq";
import { Link } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [latestScheduleDate, setLatestScheduleDate] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Local storage se user ka data fetch karna
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.fname); // Local storage ka name field
      setIsLoggedIn(true); // User logged in hai
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch("https://eventsphere-project.vercel.app/latestSchedule");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched schedule data:", data); // Log fetched data
          setLatestScheduleDate(data.start_date);  // Set the latest schedule date
        } else {
          console.error("Failed to fetch events");
          setError("Failed to fetch events from the server.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("An error occurred while fetching events.");
      }
    };

    fetchEvents();
  }, []);

  //--timer
  const calculateTimeLeft = () => {
    if (!latestScheduleDate) return {};  // Return empty object if no date

    const eventDate = new Date(latestScheduleDate);
    if (isNaN(eventDate)) {
      console.error("Invalid date:", latestScheduleDate);
      return {}; // Return an empty object if the date is invalid
    }

    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };


  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (latestScheduleDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 100);

      // Clean up the interval on component unmount or when date changes
      return () => clearInterval(timer);
    }
  }, []);

  //speaker work
  const [speakers, setSpeakers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch("https://eventsphere-project.vercel.app/speakers");
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
  //Company work
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchcompanies = async () => {
      try {
        const response = await fetch("https://eventsphere-project.vercel.app/company");
        if (response.ok) {
          const company = await response.json();
          console.log(company); // Log the API response to check the structure
          if (Array.isArray(company)) {
            setCompanies(company);
          } else {
            console.error("API response is not an array:", company);
            setCompanies([]);
          }
        } else {
          console.error("Failed to fetch company");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setError("Failed to fetch company.");
      }
    };
    fetchcompanies();
  }, []);

  // Get only the last 6 speakers
  const lastSixSpeakers = speakers.slice(-6);
  const lastSixcompanies = companies.slice(-6);
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
                      <Link
                        data-animation="fadeInLeft"
                        data-delay="1.0s"
                        to='/event'
                        className="btn3 hero-btn"

                      >
                        Get Your Ticket
                      </Link>
                      <a
                        data-animation="fadeInRight"
                        data-delay="1.0s"
                        className="popup-video video-btn"
                        href="https://youtu.be/p7utGYPgbPw?si=adNS5cI1Cnpr125T"
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
      <section className="team-area slider-area3 pt-180 pb-100 section-bg bg-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-6">
              {/* Section Title */}
              <div className="section-tittle section-tittle2 mb-50">
                <h2>The Most Important Speakers.</h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form.
                </p>
               
              </div>
            </div>

            {/* Speaker Cards */}
            {lastSixSpeakers.length > 0 ? (
              lastSixSpeakers.map((speaker) => (
                <div key={speaker._id} className="col-lg-2 col-md-4 col-sm-6">
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
        className="work-company slider-area3 
 section-padding30"
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
                  {lastSixcompanies.length > 0 ? (
                    lastSixcompanies.map((company) => (
                      <div
                        key={company._id}
                        className="col-lg-4 col-md-4 col-sm-6"
                      >
                        <div className="single-logo mb-30">
                          <img
                            src={
                              company.image || "assets/img/default-avatar.png"
                            }
                            alt={company.name}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p>No Companies available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <Faq />
      </section>
     
    </>
  );
};

export default Home;
