import React, { useState, useEffect } from "react";

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
 useEffect(() => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
   if (storedUser) {
     setUserName(storedUser.name);
     setIsLoggedIn(true);
     setUserRole(storedUser.role || "guest");

     // If the role is "exhibitor", set the exhibitorId based on the user
     if (storedUser.role === "exhibitor") {
       // Check if exhibitorId is directly available in localStorage
       if (storedUser.exhibitorId) {
         setExhibitorId(storedUser.exhibitorId); // Use stored exhibitorId
       } else {
         // Alternatively, fetch exhibitorId from API based on other data (e.g., company_id)
         setError("Exhibitor ID is missing.");
       }
     }
   }
 }, []);
// This runs only once on component mount

  useEffect(() => {
    const fetchEvents = async () => {
      setError(""); // Clear any previous errors
      try {
        const response = await fetch("http://localhost:5000/events");
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
      setError(""); // Clear any previous errors
      try {
        const response = await fetch("http://localhost:5000/booths");
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
    setError(""); // Clear previous errors
    try {
      const response = await fetch(
        `http://localhost:5000/exhibitors/${exhibitorId}`
      );
      if (response.ok) {
        const data = await response.json();
        setExhibitor(data); // Store exhibitor data
        console.log("Fetched Exhibitor Data:", data); // Debugging log for fetched data
      } else {
        setError("Failed to fetch exhibitor data.");
      }
    } catch (error) {
      setError("Error fetching exhibitor data.");
    }
  };

    fetchEvents();
    getBoothData();
    getExhibitorData(); // Fetch exhibitor data when exhibitorId is set
  }, [exhibitorId]); // Rerun effect if exhibitorId changes

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!selectedBooth) {
      setError("Please select a booth before confirming your booking.");
      return; // Stop the form submission if no booth is selected
    }

    const date = new Date(); // Current date as booking date
    const total_cost = 100; // Example value; replace with a proper calculation

    try {
      const response = await fetch("http://localhost:5000/bookings", {
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
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON
      setSuccess("Booking successful!");
      console.log("Booking successful:", data);
    } catch (error) {
      setError(`Error during booking: ${error.message}`);
      console.error("Error during booking:", error.message);
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
              {/* Add any additional exhibitor details */}
            </div>
          )}
          <div className="row">
            {events.map((event) => {
              const timeLeft = calculateTimeLeft(event.date);

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
                        <p>| {event.time}</p>
                        <h2 className="text-center mb-4 text-uppercase">
                          {event.title}
                        </h2>
                        <div className="text-center">
                          <strong>{event.description}</strong>
                        </div>
                        <div className="text-center mt-5">
                          {isLoggedIn && userRole === "exhibitor" ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setSelectedEventId(event._id); // Set the selected event ID
                                setShowModal(true);
                              }}
                            >
                              Book a Booth
                            </button>
                          ) : (
                            <p className="text-danger">
                              You must be an exhibitor to book a booth.
                            </p>
                          )}
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
      {/* Modal for Booking a Booth */}
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
                {error && (
                  <div className="alert alert-danger fs-6" role="alert">
                    <p>{error}</p>
                  </div>
                )}
                {success && (
                  <div className="alert alert-success fs-6" role="alert">
                    <p>{success}</p>
                  </div>
                )}

                <form
                  className="form-contact contact_form"
                  id="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="form-outline mb-4">
                    <select
                      className="form-select"
                      value={selectedBooth}
                      onChange={(e) => setSelectedBooth(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select a Booth
                      </option>
                      {getBooth.map((booth) => (
                        <option key={booth._id} value={booth._id}>
                          {booth.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Confirm Booking
                  </button>
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
