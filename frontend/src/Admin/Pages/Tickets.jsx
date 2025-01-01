import React, { useEffect, useState, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const Tickets = () => {
    const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    cnic: "",
    role: {},
  });
  const [tickets, setTickets] = useState([]); // Initialize tickets as an empty array
  const ticketRefs = useRef([]); // This will store references for each ticket

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if(user){
          console.log("user",user.userId)
      fetchUserData(user.userId);
      fetchUserTickets(user.userId); // Fetch tickets for the user
      }
    
    }
    else {
      navigate('/login');  // Redirect to login page if not logged in
    }
  }, []);

  // Function to fetch user data
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`https://eventsphere-project.vercel.app/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.data); // Assuming the data is in data.data
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      setError("An error occurred while fetching user data.");
    }
  };

  // Function to fetch user tickets
  const fetchUserTickets = async (userId) => {
    try {
      const response = await fetch(`https://eventsphere-project.vercel.app/ticket-user-id?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.data)
        setTickets(data.data || []); // If data.tickets is undefined, use an empty array
      } else {
        setError("Failed to fetch tickets.");
      }
    } catch (error) {
      setError("An error occurred while fetching tickets.");
    }
  };

  // Function to add a reference for each ticket dynamically
  const setTicketRef = (index, ref) => {
    ticketRefs.current[index] = ref;
  };

  const downloadTicketPDF = (ticket, index) => {
    // Hide the download button for the specific ticket (if any)
    const downloadButton = document.getElementById(`download-button-${ticket._id}`);
    if (downloadButton) {
      downloadButton.style.display = "none";
    }

    // Use html2canvas to capture the ticket element and generate the PDF
    html2canvas(ticketRefs.current[index]).then((canvas) => {
      // Create PDF from the canvas
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate image size and scale to fit the PDF
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF with scaling
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Save the PDF


     let ticketFileName = "ticket";
    
    if (ticket.seminar_id) {
      // If the ticket has a seminar_id, use the seminar ID
      ticketFileName = `seminar-${ticket.seminar_id._id}`;
    } else if (ticket.workshop_id) {
      // If the ticket has a workshop_id, use the workshop ID
      ticketFileName = `workshop-${ticket.workshop_id._id}`;
    }

    // Save the PDF with the generated file name
    pdf.save(`${ticketFileName}-ticket.pdf`);

      // Show the download button back after generating PDF
      if (downloadButton) {
        downloadButton.style.display = "block";
      }
    });
  };
  return (
    <section className="container py-5">
          <div className="row">
            <div className="col-lg-12">
                <h4>Your Tickets</h4>
                <div className="row">
                            {tickets.length > 0 ? (
                              tickets.map((ticket, index) => (
                                <div key={index} className="col-md-4">
                                  <div
                                    ref={(ref) => setTicketRef(index, ref)}
                                    className="card"
                                    style={{ width: "100%" }}
                                  >
                                    <div className="card-header">
                                      <h5 className="ticket__co-name fs-4">
                                        Event Sphere Management System
                                      </h5>
                                    </div>
                                    <div className="ticket__body card-body">
                                      {/* Conditional rendering based on Seminar or Workshop */}
                                      <p className="ticket__route fs-3 fw-light text-center text-capitalize">
                                        {ticket.seminar_id?.title
                                          ? "Seminar Title:"
                                          : "Workshop Title:"}
                                        {ticket.seminar_id?.title || ticket.workshop_id?.title || "N/A"}
                                      </p>
                                      <p className="ticket__route fs-3 fw-light text-capitalize">
                                        Name: {ticket.user_id.name || "N/A"} 
                                        {user.role.RoleName === "exhibitor"
                                        ? (" (Exhibitor)")
                                        :(" (Attendee)") 
                                        }
                                        
                                      </p>

                                      {/* For Seminar Ticket */}
                                      {ticket.seminar_id && (
                                        <div className="ticket__timing d-flex justify-content-between mx-3 border-top border-bottom py-3 text-center">
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">Speaker:</span>
                                            <br />
                                            <span className="ticket__detail">
                                              {ticket.seminar_id.speaker_id?.name || "N/A"}
                                            </span>
                                          </p>
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">Hall:</span>
                                            <br />
                                            <span className="ticket__detail text-capitalize">
                                              {ticket.seminar_id.hall_id?.hall_name || "N/A"}
                                            </span>
                                          </p>
                                          <p className="mb-0">
                                            <span className="ticket__small-label text-muted">Price:</span>
                                            <br />
                                            <span className="ticket__detail">
                                              {ticket.seminar_id.price === "Free"
                                                ? "Free"
                                                : `${ticket.seminar_id.price}/=`}
                                            </span>
                                          </p>
                                        </div>
                                      )}

                                      {/* For Workshop Ticket */}
                                      {ticket.workshop_id && (
                                        <div className="ticket__timing d-flex justify-content-between mx-3 border-top border-bottom py-3 text-center">
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">Speaker:</span>
                                            <br />
                                            <span className="ticket__detail">
                                              {ticket.workshop_id.speaker_id?.name || "N/A"}
                                            </span>
                                          </p>
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">
                                              Total Sessions
                                            </span>
                                            <br />
                                            <span className="ticket__detail">
                                              {ticket.workshop_id.total_sessions || "N/A"}
                                            </span>
                                          </p>
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">Hall:</span>
                                            <br />
                                            <span className="ticket__detail text-capitalize">
                                              {ticket.workshop_id.hall_id?.hall_name || "N/A"}
                                            </span>
                                          </p>
                                        </div>
                                      )}

                                      {/* Dates and Times (Seminar or Workshop) */}
                                      {/* If it's a Seminar Ticket */}
                                      {ticket.seminar_id && (
                                        <div className="ticket__timing d-flex justify-content-between mx-3 border-bottom py-3 text-center">
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">Date:</span>
                                            <br />
                                            <span className="ticket__detail">
                                              {new Date(ticket.seminar_id.date).toLocaleDateString()}
                                            </span>
                                          </p>
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">
                                              Start Time:
                                            </span>
                                            <br />
                                            <span className="ticket__detail">
                                              {new Date(
                                                `1970-01-01T${ticket.seminar_id.start_time}Z`
                                              ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </span>
                                          </p>
                                          <p className="mb-0">
                                            <span className="ticket__small-label text-muted">
                                              End Time:
                                            </span>
                                            <br />
                                            <span className="ticket__detail">
                                              {new Date(
                                                `1970-01-01T${ticket.seminar_id.end_time}Z`
                                              ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </span>
                                          </p>
                                        </div>
                                      )}

                                      {/* If it's a Workshop Ticket */}
                                      {ticket.workshop_id && (
                                        <div className="ticket__timing d-flex justify-content-between mx-3 border-bottom py-3 text-center">
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">Start Date:</span>
                                            <br />
                                            <span className="ticket__detail">
                                              {new Date(ticket.workshop_id.start_date).toLocaleDateString()}
                                            </span>
                                          </p>
                                          <p className="mb-0 pe-3 border-end">
                                            <span className="ticket__small-label text-muted">End Date:</span>
                                            <br />
                                            <span className="ticket__detail">
                                              {new Date(ticket.workshop_id.end_date).toLocaleDateString()}
                                            </span>
                                          </p>
                                          <p className="mb-0">
                                            <span className="ticket__small-label text-muted">
                                              Total Price:
                                            </span>
                                            <br />
                                            <span className="ticket__detail">

                                            {ticket.workshop_id.price === "Free"
                                                ? "Free"
                                                : `${ticket.workshop_id.price}/=`}
                                            </span>
                                          </p>
                                        </div>
                                      )}

                                      <p className="ticket__fine-print mt-3 text-muted text-center">
                                        This ticket cannot be transferred.
                                      </p>
                                      <img
                                        className="ticket__barcode col-11"
                                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/515428/barcode.png"
                                        alt="Fake barcode"
                                      />
                                      <p className="ticket__route fs-3 fw-light text-muted text-center mt-1 text-capitalize">
                                        Ticket ID: {ticket._id || "N/A"}
                                      </p>
                                      <hr />
                                      <p className="ticket__route fs-3 fw-light text-muted text-center mt-1 text-capitalize">
                                        Valid Till:{" "}
                                        {new Date(ticket.seminar_id?.date).toLocaleDateString() ||
                                          new Date(ticket.workshop_id?.end_date).toLocaleDateString() ||
                                          "N/A"}
                                      </p>
                                      <p className="ticket__fine-print mt-3 text-muted text-center">
                                        This ticket cannot be transferred.
                                      </p>
                                      <button
                                        id={`download-button-${ticket._id}`}
                                        className="btn btn-primary mt-3"
                                        onClick={() => downloadTicketPDF(ticket, index)}
                                      >
                                        Download
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>You haven't Purchased any tickets yet.</p>
                            )}
                </div>
            </div>
          </div>
        </section>
  )
}

export default Tickets