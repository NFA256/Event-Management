import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setEvents(data);
          } else {
            console.error("API response is not an array:", data);
            setError("Invalid data format received from the server.");
            setEvents([]);
          }
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
  const calculateTimeLeft = (eventDate) => {
    const currentDate = new Date(); // Aaj ki date
    const eventDateOnly = new Date(eventDate); // Sirf event ki date

    // Set time to midnight for accurate day difference
    currentDate.setHours(0, 0, 0, 0);
    eventDateOnly.setHours(0, 0, 0, 0);

    const difference = eventDateOnly - currentDate;

    if (difference > 0) {
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24)); // Milliseconds se days
      return { days };
    } else {
      // Agar event ki date aaj ya guzri hui hai
      return { days: 0 };
    }
  };

  return (
    <>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Events</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <section className="home-blog-area mt-5 mb-5">
        <div className="container col-10 mt-5">
          {error && <p className="text-danger">Error: {error}</p>}{" "}
          {/* Display error message */}
          <div className="row">
            {events.map((event) => {
              const timeLeft = calculateTimeLeft(event.date, event.start_time);

              return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={event._id}>
                  <div className="home-blog-single mb-30">
                    <div className="blog-img-cap">
                      <div className="blog-img">
                        <img src={event.image} alt="" />
                        <div className="blog-date text-uppercase text-center">
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <p>{timeLeft.days} days left</p>
                        </div>
                      </div>
                      <div className="blog-cap">
                        <p>| {event.status} </p>
                        <p>| {event.time}</p>
                        <h2 className="text-center mb-4 text-uppercase">
                          {event.title}
                        </h2>
                        {/* <div className="row mb-3 ">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Speaker:{" "}
                              {event.speaker_id ? event.speaker_id.name : "N/A"}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              Hall:{" "}
                              {event.hall_id ? event.hall_id.hall_name : "N/A"}
                            </strong>
                          </div>
                        </div> */}
                        <div className="text-center">
                          <strong>{event.description}</strong>
                        </div>
                        <div className="text-center mt-5">
                          <button className="btn3" type="submit">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
