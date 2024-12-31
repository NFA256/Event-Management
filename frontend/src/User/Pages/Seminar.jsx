import React, { useState, useEffect } from "react";

const Seminar = () => {
  const [seminars, setSeminars] = useState([]);
  const [error, setError] = useState("");
  const [userTickets, setUserTickets] = useState([]); // State for user tickets
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false); // New state for ticket modal
  const [userName, setUserName] = useState(""); // New state for user's name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Fetch seminars on load
  useEffect(() => {
    fetchSeminars();
    // Get user ID from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId); // Assuming user ID is stored as 'id'
      setUserName(user.fname); // Local storage ka name field
      setUserId(user.userId); // Assuming user ID is stored as 'userId'
      setIsLoggedIn(true); // User logged in hai
      fetchUserTickets(user.userId); // Fetch tickets for this user
      console.log(user.userId);
      console.log(user.fname);
    } else {
      setError("User not found.");
    }
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await fetch("http://localhost:5000/seminars");
      const data = await response.json();

      if (response.ok) {
        setSeminars(data);
      } else {
        throw new Error(data.message || "Failed to fetch seminars.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchUserTickets = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/ticket-user-id?user_id=${userId}`
      );
      const data = await response.json();

      console.log("Tickets data:", data);

      if (Array.isArray(data.data)) {
        setUserTickets(data.data); // Assuming 'data' contains the ticket array
      } else {
        setError("Tickets data is not an array.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const handleViewTicket = (seminar) => {
    setSelectedSeminar(seminar); // Use selected seminar for the ticket modal
    setIsTicketModalOpen(true); // Open the ticket modal
  };

  const handleTicketModalClose = () => {
    setIsTicketModalOpen(false); // Close the ticket modal
    setSelectedSeminar(null); // Clear the selected seminar
  };

  const isUserEnrolled = (seminarId) => {
    return userTickets.some(
      (ticket) => ticket.seminar_id && ticket.seminar_id._id === seminarId
    );
  };

  const handleBookTicket = (seminarId) => {
    if (isUserEnrolled(seminarId)) {
      setError("You are already enrolled for this seminar!");
      return;
    }

    // Logic to book ticket (e.g., POST request to the server)
    console.log("Booking ticket for seminar:", seminarId);
  };

  const calculateTimeLeft = (seminarDate, startTime) => {
    const today = new Date();
    const seminarDateObj = new Date(seminarDate);
    const seminarStartTime = new Date(seminarDateObj);

    const [hours, minutes] = startTime.split(":");
    seminarStartTime.setHours(hours);
    seminarStartTime.setMinutes(minutes);

    const isPast = seminarStartTime < today;

    if (isPast) {
      return { days: 0, hours: 0, isPast: true }; // Seminar has already started or passed
    }

    const daysLeft = Math.floor(
      (seminarDateObj.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
        (1000 * 3600 * 24)
    );

    const hoursLeft = Math.floor((seminarStartTime - today) / (1000 * 3600));

    return {
      days: daysLeft >= 0 ? daysLeft : 0,
      hours: hoursLeft >= 0 ? hoursLeft : 0,
      isPast: false, // Seminar is in the future
    };
  };

  const handleBookClick = (seminar) => {
    if (!isLoggedIn) {
      // Redirect to login page if user is not logged in
      window.location.href = "/login"; // Change this to your actual login route
      return;
    }
    setSelectedSeminar(seminar);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeminar(null);
  };
  const handleConfirmBooking = async () => {
    if (!selectedSeminar) return;

    // Check if the user has already booked this seminar
    if (isUserEnrolled(selectedSeminar._id)) {
      setError("You have already booked this seminar.");
      return;
    }

    const ticketData = {
      seminar_id: selectedSeminar._id,
      user_id: userId,
      total_price:
        selectedSeminar.price === "Free" ? "0" : selectedSeminar.price,
    };

    try {
      const response = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Ticket booked successfully:", result);
        // Optionally, you can show a success message or update the UI
        // Update tickets locally after booking
        console.log("Ticket booked successfully:", result);
        // Update tickets locally after booking
        setUserTickets((prevTickets) => [...prevTickets, ticketData]); // Add the new ticket to the state
        setError("Seminar booked successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to book ticket:", errorData.message);
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
    } finally {
      handleCloseModal();
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
                  <h2>Seminar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <section className="home-blog-area mt-5 mb-5">
        <div className="container col-10 mt-5">
          {/* {error && <p className="text-danger">Error: {error}</p>} */}
          <div className="row">
            {seminars.map((seminar) => {
              const timeLeft = calculateTimeLeft(
                seminar.date,
                seminar.start_time
              );

              return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={seminar._id}>
                  <div className="home-blog-single mb-30">
                    <div className="blog-img-cap">
                      <div className="blog-img">
                        <img src={seminar.image} alt="" />
                        <div className="blog-date text-uppercase text-center">
                          <span>
                            {new Date(seminar.date).toLocaleDateString()}
                          </span>
                          <p>
                            {timeLeft.days} days and {timeLeft.hours} hours left
                          </p>
                        </div>
                      </div>
                      <div className="blog-cap">
                        <p>| {seminar.purpose}</p>
                        <h2 className="text-center mb-4 text-uppercase">
                          {seminar.title}
                        </h2>
                        <div className="row mb-3 ">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Speaker:{" "}
                              {seminar.speaker_id
                                ? seminar.speaker_id.name
                                : "N/A"}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              Hall:{" "}
                              {seminar.hall_id
                                ? seminar.hall_id.hall_name
                                : "N/A"}
                            </strong>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>Capacity: {seminar.capacity}</strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              Price:
                              {seminar.price === "Free"
                                ? seminar.price
                                : `${seminar.price}/=`}
                            </strong>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Start Time:{" "}
                              {new Date(
                                `1970-01-01T${seminar.start_time}Z`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              End Time:{" "}
                              {new Date(
                                `1970-01-01T${seminar.end_time}Z`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </strong>
                          </div>
                        </div>
                        <div className="text-center mt-5">
                          {timeLeft.isPast ? (
                            <p className="text-danger">
                              This seminar has already started or passed.
                            </p>
                          ) : isUserEnrolled(seminar._id) ? (
                            <>
                              <p className="text-success">Already Enrolled</p>
                              <button
                                className="btn3"
                                onClick={() => handleViewTicket(seminar)} // Open ticket modal
                              >
                                View Ticket
                              </button>
                            </>
                          ) : (
                            userRole === "attendee" && ( // Condition to hide Book button for admins
                              <button
                                className="btn3"
                                type="submit"
                                onClick={() => handleBookClick(seminar)}
                              >
                                Book
                              </button>
                            )
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
      {isModalOpen && selectedSeminar && (
        <div className="modal show" style={{ display: "block", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center w-100">
                  Title : {selectedSeminar.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p className="text-center">
                  Are you sure you want to book the seminar?{" "}
                </p>

                <div className="row">
                  <div className="col-5 mx-auto text-capitalize">
                    <p>
                      <strong>Hall:</strong>{" "}
                      {selectedSeminar.hall_id
                        ? selectedSeminar.hall_id.hall_name
                        : "N/A"}
                    </p>
                  </div>
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>Speaker:</strong>{" "}
                      {selectedSeminar.speaker_id
                        ? selectedSeminar.speaker_id.name
                        : "N/A"}{" "}
                      <br />
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedSeminar.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>Price:</strong>{" "}
                      {selectedSeminar === "Free"
                        ? selectedSeminar.price
                        : `${selectedSeminar.price}/=`}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>Start Time:</strong>{" "}
                      {new Date(
                        `1970-01-01T${selectedSeminar.start_time}Z`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>End Time:</strong>{" "}
                      {new Date(
                        `1970-01-01T${selectedSeminar.end_time}Z`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn3 "
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isTicketModalOpen && selectedSeminar && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          onClick={handleTicketModalClose}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="ticket border rounded shadow-sm mx-auto">
                  <div className="ticket__header bg-light p-4">
                    <div className="ticket__co text-center text-muted">
                      <span className="ticket__co-name fs-1 fw-semibold">
                        Event Sphere Management System
                      </span>
                    </div>
                  </div>
                  <div className="ticket__body p-4">
                    <p className="ticket__route fs-3 fw-light text-center text-capitalize">
                      Seminar Title: {selectedSeminar.title || "N/A"}
                    </p>
                    <p className="ticket__route fs-3 fw-light text-capitalize">
                      Name: {userName || "N/A"}
                    </p>

                    <div className="ticket__timing d-flex justify-content-between mx-3 border-top border-bottom py-3 text-center">
                      <p className="mb-0 pe-3 border-end">
                        <span className="ticket__small-label text-muted">
                          Speaker:
                        </span>
                        <br />
                        <span className="ticket__detail">
                          {selectedSeminar.speaker_id?.name || "N/A"}
                        </span>
                      </p>
                      <p className="mb-0 pe-3 border-end">
                        <span className="ticket__small-label text-muted">
                          Hall:
                        </span>
                        <br />
                        <span className="ticket__detail text-capitalize">
                          {selectedSeminar.hall_id?.hall_name || "N/A"}
                        </span>
                      </p>
                      <p className="mb-0">
                        <span className="ticket__small-label text-muted">
                          Price:
                        </span>
                        <br />
                        <span className="ticket__detail">
                          {selectedSeminar.price === "Free"
                            ? "Free"
                            : `${selectedSeminar.price}/=`}
                        </span>
                      </p>
                      <p className="mb-0 pe-3 border-end">
                        <span className="ticket__small-label text-muted">
                          Start Time:
                        </span>
                        <br />
                        <span className="ticket__detail">
                          {new Date(
                            `1970-01-01T${selectedSeminar.start_time}Z`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </p>
                      <p className="mb-0 pe-3 border-end">
                        <span className="ticket__small-label text-muted">
                          End Time:
                        </span>
                        <br />
                        <span className="ticket__detail text-capitalize">
                          {new Date(
                            `1970-01-01T${selectedSeminar.end_time}Z`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </p>
                    </div>

                    <p className="ticket__fine-print mt-3 text-muted text-center">
                      This ticket cannot be transferred.
                    </p>
                    <img
                      className="ticket__barcode col-11"
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/515428/barcode.png"
                      alt="Fake barcode"
                    />
                    <p className="ticket__route fs-3 fw-light text-muted text-center mt-1 text-capitalize">
                      Ticket ID: {selectedSeminar._id || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <button type="submit " className="btn3">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Seminar;
