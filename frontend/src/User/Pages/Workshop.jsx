import React, { useState, useEffect , useRef } from "react";
import { Navigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const Workshop = () => {
  const [userId, setUserId] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const [currentSessions, setCurrentSessions] = useState([]); // New state for current sessions
  const [sessionsModalOpen, setSessionsModalOpen] = useState(false); // State for modal
  const [currentWorkshop, setCurrentWorkshop] = useState(null); // State for current workshop
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [userTickets, setUserTickets] = useState([]); // State for user tickets
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false); // New state for ticket modal
  const [userName, setUserName] = useState(""); // New state for user's name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId);
      setUserName(user.fname); // Local storage ka name field
      fetchUserTickets(user.userId);
      setUserRole(user.role || "guest");
      setIsLoggedIn(true); // User logged in hai
    } else {
      setError("User not found.");
    }
    const fetchWorkshops = async () => {
      try {
        const response = await fetch("http://localhost:5000/workshops");
        const data = await response.json();
        if (Array.isArray(data)) {
          setWorkshops(data);
        } else {
          console.error("Workshops data is not an array:", data);
        }
      } catch (error) {
        console.error("There was an error fetching the workshops:", error);
        setError(error.message);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:5000/sessions");
        const data = await response.json();
        if (Array.isArray(data)) {
          setSessions(data);
        } else {
          console.error("Sessions data is not an array:", data);
        }
      } catch (error) {
        console.error("There was an error fetching the sessions:", error);
        setError(error.message);
      }
    };

    fetchWorkshops();
    fetchSessions();
  }, []);

  const fetchUserTickets = async (user_Id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/ticket-user-id?user_id=${user_Id}`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setUserTickets(data.data);
      } else {
        setError("Tickets data is not an array.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewTicket = (workshop) => {
    setCurrentWorkshop(workshop); // Set the current workshop for the ticket modal
    setIsTicketModalOpen(true); // Open the ticket modal
  };

  const handleTicketModalClose = () => {
    setIsTicketModalOpen(false); // Close the ticket modal
    setCurrentWorkshop(null); // Clear the current workshop data
  };

  const isUserEnrolled = (workshopId) => {
    return userTickets.some(
      (ticket) => ticket.workshop_id && ticket.workshop_id._id === workshopId
    );
  };

  const handleBookTicket = (workshopId) => {
    if (isUserEnrolled(workshopId)) {
      setError("You are already enrolled for this seminar!");
      return;
    }

    // Logic to book ticket (e.g., POST request to the server)
    console.log("Booking ticket for seminar:", workshopId);
  };
  useEffect(() => {
    const combined = workshops.map((workshop) => {
      if (!workshop) return { ...workshop, sessions: [] };

      const workshopSessions = sessions.filter(
        (session) =>
          session.workshop_id && session.workshop_id._id === workshop._id
      );

      return { ...workshop, sessions: workshopSessions };
    });

    setCombinedData(combined);
  }, [workshops, sessions]);

  const calculateTimeLeft = (startTime) => {
    const today = new Date();
    const seminarStartTime = new Date(startTime);
    const timeDiff = seminarStartTime - today;

    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hoursLeft = Math.floor(
      (timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)
    );

    return {
      days: daysLeft >= 0 ? daysLeft : 0,
      hours: hoursLeft >= 0 ? hoursLeft : 0,
    };
  };

  const handleSessionModalOpen = (workshop) => {
    setCurrentSessions(workshop.sessions); // Set sessions for the selected workshop
    setCurrentWorkshop(workshop); // Set the current workshop
    setSessionsModalOpen(true); // Open the sessions modal
  };

  const handleSessionModalClose = () => {
    setSessionsModalOpen(false);
    setCurrentSessions([]);
    setCurrentWorkshop(null); // Clear the current workshop
  };
  const handleBookingModalOpen = (workshop) => {
     if (!isLoggedIn) {
       // Redirect to login page if user is not logged in
       window.location.href = "/login"; // Change this to your actual login route
       return;
     }
    setCurrentWorkshop(workshop);
    setIsBookingModalOpen(true);
  };

  const handleBookingModalClose = () => {
   
    setCurrentWorkshop(false);
    setIsBookingModalOpen(true);
  };
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const durationInMinutes = (end - start) / (1000 * 60); // Convert milliseconds to minutes

    if (durationInMinutes < 0) {
      return "Invalid Duration"; // Handle case where end time is before start time
    }

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}h ${minutes}m`; // Return duration in hours and minutes
  };

  const handleBookWorkshop = async () => {
    if (!currentWorkshop) return;

    // Check if the user has already booked this seminar
    if (isUserEnrolled(currentWorkshop._id)) {
      setError("You have already booked this seminar.");
      return;
    }

    const ticketData = {
      workshop_id: currentWorkshop._id,
      user_id: userId,
      total_price:
        currentWorkshop.price === "Free" ? "0" : currentWorkshop.price,
    };
    try {
      const response = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Ticket booked successfully:", result);
        // Update tickets locally after booking
        fetchUserTickets(userId)
        setError("Booking successful!");
      } else {
        setError("Failed to book the workshop.");
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
    handleBookingModalClose();
  };

  const ticketRef = useRef(null);

  const downloadSeminarTicketPDF = (workshop) => {
    const downloadButton = document.getElementById(`download-button-${workshop._id}`);
    if (downloadButton) {
      downloadButton.style.display = "none"; // Hide the button while generating PDF
    }
  
    html2canvas(ticketRef.current).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("https://s3-us-west-2.amazonaws.com/s.cdpn.io/515428/barcode.png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`workshop-${workshop._id}-ticket.pdf`);
  
      if (downloadButton) {
        downloadButton.style.display = "block"; // Show the download button again
      }
    });
  };
  return (
    <>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Workshops</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <section className="home-blog-area mt-5 mb-5">
        <div className="container col-10  mt-5">
          <div className="row">
            {combinedData.map((workshop) => {
              const timeLeft = calculateTimeLeft(workshop.start_date);

              return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={workshop._id}>
                  <div className="home-blog-single mb-30" >
                    <div className="blog-img-cap">
                      <div className="blog-img">
                        <img src={workshop.image} alt={workshop.title} />
                        <div className="blog-date text-uppercase text-center">
                          <span>
                            {new Date(workshop.start_date).toLocaleDateString()}
                          </span>
                          <p>
                            {timeLeft.days} days and {timeLeft.hours} hours left
                          </p>
                        </div>
                      </div>
                      <div className="blog-cap">
                        <p>| Total Sessions: {workshop.sessions.length}</p>
                        <h2 className="text-center mb-4 text-uppercase">
                          {workshop.title}
                        </h2>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Speaker:{" "}
                              {workshop.speaker_id
                                ? workshop.speaker_id.name
                                : "N/A"}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              Hall:{" "}
                              {workshop.hall_id
                                ? workshop.hall_id.hall_name
                                : "N/A"}
                            </strong>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Capacity: { workshop.capacity - workshop.no_of_attendees}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>Price:
                            {workshop.price === ""
                                ? "Free"
                                : `${workshop.price}/=`}</strong>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Start Date:
                              {new Date(
                                workshop.start_date
                              ).toLocaleDateString()}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              End Date:
                              {new Date(workshop.end_date).toLocaleDateString()}
                            </strong>
                          </div>
                        </div>
                        {
                             (workshop.no_of_attendees === workshop.capacity) ? (
                              <div className="text-center">
                              <p className="text-success ">
                                Tickets SoldOut
                              </p></div>
                            )
                            :null
                          }
                        <div className="text-center mt-3">
                          <button
                            className="btn3"
                            type="button"
                            onClick={() => handleSessionModalOpen(workshop)}
                          >
                            View Sessions
                          </button>

                          {timeLeft.isPast ? (
                            <p className="text-danger">
                              This workshop has already started or passed.
                            </p>
                          ) : isUserEnrolled(workshop._id) ? (
                            <>
                              <p className="text-success mt-3">
                                Already Enrolled
                              </p>
                              <button
                                className="btn3"
                                onClick={() => handleViewTicket(workshop)} // Open ticket modal
                              >
                                View Ticket
                              </button>
                            </>
                          ) :
                          (userRole !== "admin" && workshop.no_of_attendees < workshop.capacity) && (
                            <button
                              className="btn3 mx-1"
                              type="submit"
                              onClick={() => handleBookingModalOpen(workshop)}
                            >
                              Book
                            </button>
                          )
                          }
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {sessionsModalOpen && (
              <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex="-1"
                role="dialog"
                onClick={handleSessionModalClose}
              >
                <div
                  className="modal-dialog modal-lg"
                  role="document"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-content">
                    <div className="modal-header justify-content-center">
                      <h5 className="modal-title text-center w-100">
                        {currentWorkshop?.title}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        onClick={handleSessionModalClose}
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div
                      className="modal-body"
                      style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                      <table className="table table-bordered mt-2">
                        <thead>
                          <tr className="table-info">
                            <th>#</th>
                            <th>Session Title</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentSessions.map((session, index) => (
                            <tr key={session._id}>
                              <td>{index + 1}</td>
                              <td>{session.title}</td>
                              <td>
                                {new Date(session.date).toLocaleDateString()}
                              </td>
                              <td>{session.start_time}</td>
                              <td>{session.end_time}</td>
                              <td>
                                {calculateDuration(
                                  session.start_time,
                                  session.end_time
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-center">
                        <button
                          className="btn3"
                          onClick={handleSessionModalClose}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isBookingModalOpen  && currentWorkshop&&  (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            onClick={handleBookingModalClose}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center w-100">
                    Title : {currentWorkshop?.title}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={handleBookingModalClose}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="text-center">
                    Are you sure you want to book the workshop?{" "}
                  </p>
                </div>
                <div className="row">
                  <div className="col-5 mx-auto text-capitalize">
                    <p>
                      <strong>Hall:</strong>{" "}
                      {currentWorkshop.hall_id
                        ? currentWorkshop.hall_id.hall_name
                        : "N/A"}
                    </p>
                  </div>
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>Speaker:</strong>{" "}
                      {currentWorkshop.speaker_id
                        ? currentWorkshop.speaker_id.name
                        : "N/A"}{" "}
                      <br />
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(
                        currentWorkshop.start_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>End Date:</strong>{" "}
                      {new Date(currentWorkshop.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5 mx-auto">
                    <p>
                      <strong>Price:</strong>{" "}
                      {currentWorkshop === "Free"
                        ? currentWorkshop.price
                        : `${currentWorkshop.price}/=`}
                    </p>
                  </div>
                  <div className="col-5 mx-auto">
                    <p>
                      {" "}
                      <strong>Total Sessions: </strong>
                      {currentWorkshop.total_sessions}
                    </p>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={handleBookingModalClose}
                  >
                    Cancel
                  </button>
                  <button className="btn3" onClick={handleBookWorkshop}>
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isTicketModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            onClick={handleTicketModalClose}
          >
            <div
              className="modal-dialog "
              role="document"
              // onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className=" justify-content-center"></div>
                <div
                  className="modal-body"
                  style={{ maxHeight: "650px", overflowY: "auto" }}
                >
                    <button
            type="button"
            className=""
            onClick={handleTicketModalClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "24px",
              color: "#000",
              cursor: "pointer",
            }}
          > &times;
          </button>
                  <div class="">
                    <div ref={ticketRef}   style={{ width: "100%" }} class="ticket border   mb-0 ">
                      <div class="ticket__header bg-light p-4">
                        <div class="ticket__co text-center text-muted">
                        <h5 className="ticket__co-name fs-4">
                                Event Sphere Management System
                              </h5>
                        </div>
                      </div>

                      <div class="ticket__body p-4">
                        <p class="ticket__route fs-3 fw-light text-center text-capitalize">
                          Workshop Title :{" "}
                          {currentWorkshop?.title || "Workshop Title"}
                        </p>
                        <p class="ticket__route fs-3 fw-light  text-capitalize">
                        Name: {userName || "N/A"} {/* Display user's name */}
                        </p>
                        <div class="ticket__timing d-flex justify-content-between mx-3 border-top border-bottom py-3 text-center">
                          <p class="mb-0 pe-3 border-end">
                            <span class="ticket__small-label text-muted text-capitalize">
                              Speaker :{" "}
                            </span>
                            <br />
                            <span class="ticket__detail">
                              {" "}
                              {currentWorkshop.speaker_id
                                ? currentWorkshop.speaker_id.name
                                : "N/A"}{" "}
                            </span>
                          </p>
                          <p class="mb-0 pe-3 border-end">
                            <span class="ticket__small-label text-muted">
                              Total Sessions
                            </span>
                            <br />

                            <span class="ticket__detail">
                              {currentWorkshop?.sessions.length}
                            </span>
                          </p>
                          <p class="mb-0 pe-3 border-end">
                            <span class="ticket__small-label text-muted  ">
                              Hall :
                            </span>
                            <br />
                            <span class="ticket__detail text-capitalize">
                              {currentWorkshop.hall_id
                                ? currentWorkshop.hall_id.hall_name
                                : "N/A"}
                            </span>
                          </p>
                        </div>

                        <div class="ticket__timing d-flex justify-content-between  mx-3 border-bottom py-3 text-center">
                          <p class="mb-0 pe-3 border-end">
                            <span class="ticket__small-label text-muted">
                              Start Date :
                            </span>
                            <br />
                            <span class="ticket__detail">
                              {" "}
                              {new Date(
                                currentWorkshop.start_date
                              ).toLocaleDateString()}
                            </span>
                          </p>
                          <p class="mb-0 pe-3 border-end">
                            <span class="ticket__small-label text-muted">
                              End Date :
                            </span>
                            <br />
                            <span class="ticket__detail">
                              {" "}
                              {new Date(
                                currentWorkshop.end_date
                              ).toLocaleDateString()}
                            </span>
                          </p>

                          <p class="mb-0">
                            <span class="ticket__small-label text-muted">
                              Total Price
                            </span>
                            <br />

                            <span class="ticket__detail">
                              {currentWorkshop?.price}/=
                            </span>
                          </p>
                        </div>

                       

                        <img
                          class="ticket__barcode  col-11"
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/515428/barcode.png"
                          alt="Fake barcode"
                        />
                        <p className="ticket__route fs-3 fw-light text-muted text-center mt-1 text-capitalize">
                          Ticket ID: {currentWorkshop._id || "N/A"}
                        </p>
                        <hr />
                              <p className="ticket__route fs-3 fw-light text-muted text-center mt-1 text-capitalize">
                               Valid Till: {
                               new Date(currentWorkshop.end_date).toLocaleDateString() || "N/A"}
                              </p>
                              <p class="ticket__fine-print mt-3 text-muted text-center">
                          This ticket cannot be transfered
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit "onClick={() => downloadSeminarTicketPDF(currentWorkshop)} className="btn3">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Workshop;
