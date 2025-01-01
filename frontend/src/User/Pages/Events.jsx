import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [getBooth, setBooth] = useState([]);
  const [Exhibitor, setExhibitor] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [exhibitorId, setExhibitorId] = useState("");
  const [boothbook, setboothbook] = useState([]); // State for exhibitor booking

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.fname);
      setIsLoggedIn(true);
      setUserRole(storedUser.role || "guest");

      if (storedUser.role === "exhibitor") {
        if (storedUser.exhibitorId) {
          setExhibitorId(storedUser.exhibitorId);
        } else {
          setError("Exhibitor ID is missing.");
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setError("");
      try {
        const response = await fetch("https://eventsphere-project.vercel.app/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(Array.isArray(data) ? data : []);
        } else {
          setError("Failed to fetch events from the server.");
        }
      } catch (error) {
        setError("An error occurred while fetching events.");
      }
    };

    const getBoothData = async () => {
      setError("");
      try {
        const response = await fetch("https://eventsphere-project.vercel.app/booths");
        if (response.ok) {
          const data = await response.json();
          setBooth(Array.isArray(data) ? data : []);
        } else {
          setError("Failed to fetch booth data.");
        }
      } catch (error) {
        setError("Error fetching booth data.");
      }
    };

    const getExhibitorData = async () => {
      setError("");
      try {
        const response = await fetch(
          `https://eventsphere-project.vercel.app/exhibitors/${exhibitorId}`
        );
        if (response.ok) {
          const data = await response.json();
          setExhibitor(data);
          console.log("Fetched Exhibitor Data:", data);
        } else {
          setError("Failed to fetch exhibitor data.");
        }
      } catch (error) {
        setError("Error fetching exhibitor data.");
      }
    };

    fetchEvents();
    getBoothData();
    if (exhibitorId) {
      getExhibitorData();
      fetchexhibitorbook(exhibitorId);
    }
  }, [exhibitorId]); // Rerun effect if exhibitorId changes

  const fetchexhibitorbook = async (exhibitorId) => {
    try {
      const response = await fetch(
        `https://eventsphere-project.vercel.app/bookings-exhibitor-id?exhibitor_id=${exhibitorId}`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setboothbook(data.data);
      } else {
        setError("Failed to fetch booking data.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const isExhibitorEnrolled = (eventId) => {
    return boothbook.some(
      (booking) => booking.event_id._id === eventId // Check if the event ID matches
    );
  };

  const getBookingStatus = (eventId) => {
    const booking = boothbook.find((booking) => booking.event_id._id === eventId);
    if (!booking) return null; // No booking found

    if (booking.status === "approved") {
      return "You have booked a booth!";
    } else if (booking.status === "pending") {
      return "Waiting for admin's approval.";
    } else if (booking.status === "rejected") {
      return "rejected";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isExhibitorEnrolled(selectedEventId)) {
      setError("You are already enrolled in this event for the selected booth.");
      return;
    }
    if (!selectedBooth) {
      setError("Please select a booth before confirming your booking.");
      return;
    }
    const date = new Date();
    const total_cost = 100; // Example value; replace with a proper calculation

    try {
      const response = await fetch("https://eventsphere-project.vercel.app/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exhibitor_id: exhibitorId,
          event_id: selectedEventId,
          booth_id: selectedBooth,
          date,
          total_cost,
          status: "pending", // Set the status to "pending"
        }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchexhibitorbook(exhibitorId);
        setSuccess("Booking successful!");
        setShowModal(false);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError(`Error during booking: ${error.message}`);
    }
  };

  const calculateTimeLeft = (eventDate) => {
    const currentDate = new Date(); // Today's date
    const eventDateOnly = new Date(eventDate); // Event date

    // Set time to midnight for accurate day difference
    currentDate.setHours(0, 0, 0, 0);
    eventDateOnly.setHours(0, 0, 0, 0);

    const difference = eventDateOnly - currentDate;

    if (difference > 0) {
      // Event is in the future
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24)); // Milliseconds to days
      return { days, isPast: false, isToday: false };
    } else if (difference === 0) {
      // Event is today
      return { days: 0, isPast: false, isToday: true };
    } else {
      // Event date has passed
      const daysAgo = Math.ceil(-difference / (1000 * 60 * 60 * 24)); // Milliseconds to days
      return { days: daysAgo, isPast: true, isToday: false };
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
          {error && <p className="text-danger">Error: {error}</p>}
          {isLoggedIn && userRole === "exhibitor" && Exhibitor && (
            <div className="mb-4">
              <h4>Welcome, {Exhibitor.name || userName}</h4>
              <p>Exhibitor ID: {exhibitorId}</p>
            </div>
          )}
          <div className="row">
            {events.map((event) => {
              const timeLeft = calculateTimeLeft(event.date);
              const bookingStatus = getBookingStatus(event._id);

              return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={event._id}>
                  <div className="home-blog-single mb-30">
                    <div className="blog-img-cap">
                      <div className="blog-img">
                        <img src={event.image} alt="" className="img-fluid" />
                        <div className="blog-date text-uppercase text-center">
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <p>
                            {timeLeft.isToday
                              ? "Today"
                              : timeLeft.isPast
                              ? `${timeLeft.days} days ago`
                              : `${timeLeft.days} days left`}
                          </p>
                        </div>
                      </div>
                      <div className="blog-cap">
                        <p>| {event.status} </p>
                       
                        <h2 className="text-center mb-4 text-uppercase">
                          {event.title}
                        </h2>
                        <div className="text-center">
                          <strong>{event.description}</strong>
                        </div>
                        <div className="text-center mt-3">
                          {bookingStatus && bookingStatus != "rejected" ?  (
                            <p className="text-success">{bookingStatus}</p>
                          ) : (
                            <button
                              className="btn3"
                              onClick={() => {
                                setSelectedEventId(event._id);
                                setShowModal(true);
                              }}
                            >
                              Book a Booth
                            </button>
                          )}
                           {
                           bookingStatus == "rejected"
                           ?<p className="text-danger mt-3 text-center">Your booking was rejected. <br /> You can try booking again</p>
                           :null
                        }
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
      {showModal && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-center">Book a Booth</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Select Booth</label>
                    <select
                      className="form-control"
                      value={selectedBooth}
                      onChange={(e) => setSelectedBooth(e.target.value)}
                    >
                      <option value="">Select a booth</option>
                      {getBooth.map((booth) => (
                        booth.reserved_bool === true
                        ?null
                        :
                        <option key={booth._id} value={booth._id}>
                          {booth.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mt-4">
                    <button type="submit" className="btn3">
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
