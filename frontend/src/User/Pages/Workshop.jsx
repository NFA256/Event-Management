import React, { useState, useEffect } from "react";

const Workshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const [currentSessions, setCurrentSessions] = useState([]); // New state for current sessions
  const [sessionsModalOpen, setSessionsModalOpen] = useState(false); // State for modal
  const [currentWorkshop, setCurrentWorkshop] = useState(null); // State for current workshop

  useEffect(() => {
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
          {error && <p className="text-danger">Error: {error}</p>}
          <div className="row">
            {combinedData.map((workshop) => {
              const timeLeft = calculateTimeLeft(workshop.start_date);

              return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={workshop._id}>
                  <div className="home-blog-single mb-30">
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
                              Capacity: {workshop.no_of_attendees}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>Price: {workshop.price}/=</strong>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Start Date:{" "}
                              {new Date(
                                workshop.start_date
                              ).toLocaleDateString()}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              End Date:{" "}
                              {new Date(workshop.end_date).toLocaleDateString()}
                            </strong>
                          </div>
                        </div>
                        <div className="text-center mt-5">
                          <button
                            className="btn3"
                            type="button"
                            onClick={() => handleSessionModalOpen(workshop)}
                          >
                            View Sessions
                          </button>
                          <button type="submit" className="btn3 mx-2 mt-2">
                            {" "}
                            Book
                          </button>
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
      </section>
    </>
  );
};

export default Workshop;
