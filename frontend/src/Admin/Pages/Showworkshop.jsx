import React, { useEffect, useState } from "react";

const Showworkshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [halls, setHalls] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [currentSessions, setCurrentSessions] = useState([]); // New state for current sessions
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionsModalOpen, setSessionsModalOpen] = useState(false); // State for sessions modal
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);
  const [attendeeError, setAttendeeError] = useState("");
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    // Fetching workshops data from the API using fetch
    fetch("http://localhost:5000/workshops")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkshops(data);
        } else {
          console.error("Workshops data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the workshops:", error);
      });

    // Fetching sessions data from the API using fetch
    fetch("http://localhost:5000/sessions")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSessions(data);
        } else {
          console.error("Sessions data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the sessions:", error);
      });

    // Fetching halls data from the API
    fetch("http://localhost:5000/halls")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHalls(data);
        } else {
          console.error("Halls data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the halls:", error);
      });

    // Fetching speakers data from the API
    fetch("http://localhost:5000/speakers")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSpeakers(data);
        } else {
          console.error("Speakers data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the speakers:", error);
      });
  }, []);

  useEffect(() => {
    // Combining the workshops and sessions data
    const combined = workshops.map((workshop) => {
      console.log("Current workshop:", workshop); // Log the current workshop
      if (!workshop) return { ...workshop, sessions: [] };

      const workshopSessions = sessions
        .filter((session) => {
          console.log("Current session's workshop_id:", session.workshop_id); // Log the workshop_id
          return (
            session.workshop_id && session.workshop_id._id === workshop._id
          );
        })
        .sort((a, b) => a.day_no - b.day_no);

      return { ...workshop, sessions: workshopSessions };
    });

    setCombinedData(combined);
  }, [workshops, sessions]);

  const getHallName = (hallId) => {
    const hall = halls.find((hall) => hall._id === hallId);
    return hall ? hall.hall_name : "Unknown Hall";
  };

  const getSpeakerName = (speakerId) => {
    const speaker = speakers.find((speaker) => speaker._id === speakerId);
    return speaker ? speaker.name : "Unknown Speaker";
  };

  const handleEdit = (workshop) => {
    setCurrentWorkshop(workshop);
    setCurrentSessions(workshop.sessions); // Set current sessions for the workshop
    setPreviewImage(workshop.image);
    // Calculate start and end dates based on sessions
    if (workshop.sessions.length > 0) {
      const sessionDates = workshop.sessions.map(
        (session) => new Date(session.date)
      );
      const startDate = new Date(Math.min(...sessionDates));
      const endDate = new Date(Math.max(...sessionDates));

      // Set the start and end dates in the current workshop
      workshop.start_date = startDate.toISOString();
      workshop.end_date = endDate.toISOString();
    } else {
      // If there are no sessions, set dates to empty strings or handle accordingly
      workshop.start_date = "";
      workshop.end_date = "";
    }
    setModalOpen(true);
  };
  const handleDelete = async (workshopId, schedule_id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      try {
        const deleteSchedule = await fetch(
          `http://localhost:5000/schedules/${schedule_id}`,
          {
            method: "DELETE",
          }
        );
        const response = await fetch(
          `http://localhost:5000/workshops/${workshopId}`,
          {
            method: "DELETE",
          }
        );
        const deleteSessions = await fetch(
          `http://localhost:5000/sessions-by-workshop-id/${workshopId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok && deleteSchedule.ok && deleteSessions.ok) {
          // Update the workshops state to remove the deleted workshop
          setWorkshops((prevWorkshops) =>
            prevWorkshops.filter((workshop) => workshop._id !== workshopId)
          );
        } else {
          const sessionresult = await deleteSchedule.json();
          const scheduleresult = await deleteSessions.json();
          const result = await response.json();
          console.error("Error response:", result);
          setError(
            sessionresult.message ||
              scheduleresult.message ||
              result.message ||
              "An error occurred while deleting the workshop."
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to connect to the server. Please try again.");
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentWorkshop(null);
    setCurrentSessions([]);
    setImage(null);
    setPreviewImage("");
  };

  const handleSessionModalOpen = (workshop) => {
    setCurrentSessions(workshop.sessions); // Set sessions for the selected workshop
    setSessionsModalOpen(true); // Open the sessions modal
  };

  const handleSessionModalClose = () => {
    setSessionsModalOpen(false);
    setCurrentSessions([]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the input is for the price
    if (name === "price") {
      const numValue = parseFloat(value);
      if (numValue <= 1000) {
        setPriceError("Price must be greater than 1000.");
      } else {
        setPriceError(""); // Clear error if valid
      }
    }

    // Check if the input is for the number of attendees
    if (name === "no_of_attendees") {
      const numValue = parseInt(value, 10);
      if (numValue < 25) {
        setAttendeeError("Minimum number of attendees is 25.");
      } else if (numValue > 50) {
        setAttendeeError("Maximum number of attendees is 50.");
      } else {
        setAttendeeError(""); // Clear error if within range
      }
    }
    setCurrentWorkshop((prev) => ({ ...prev, [name]: value }));
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

  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...currentSessions];
    updatedSessions[index][field] = value;

    // If start_time or end_time is changed, calculate the duration
    if (field === "start_time" || field === "end_time") {
      const startTime = updatedSessions[index].start_time;
      const endTime = updatedSessions[index].end_time;

      if (startTime && endTime) {
        updatedSessions[index].duration = calculateDuration(startTime, endTime);
      } else {
        updatedSessions[index].duration = ""; // Reset duration if either time is missing
      }
    }
    setCurrentSessions(updatedSessions);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentWorkshop) return;
    const scheduleData = {
      start_date: currentWorkshop.start_date,
      end_date: currentWorkshop.end_date,
      reserved_for: "Workshop",
    };
    const scheduleResponse = await fetch(
      `http://localhost:5000/schedules/${currentWorkshop.schedule_id._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      }
    );

    if (scheduleResponse.status === 400) {
      const result = await scheduleResponse.json();
      setError(
        result.message || "An error occurred while creating the schedule."
      );
      setTimeout(() => setError(""), 3000);
      return;
    } else if (!scheduleResponse.ok) {
      const result = await scheduleResponse.json();
      setError(
        result.message || "An error occurred while creating the schedule."
      );
      setTimeout(() => setError(""), 3000);
      return;
    }

    const scheduleResult = await scheduleResponse.json();
    const scheduleId = scheduleResult.schedule._id;
    // Prepare the form data
    const formData = new FormData();
    formData.append("title", currentWorkshop.title);
    formData.append("price", currentWorkshop.price);
    formData.append("total_sessions", currentWorkshop.total_sessions);
    formData.append("description", currentWorkshop.description);
    formData.append("start_date", currentWorkshop.start_date);
    formData.append("end_date", currentWorkshop.end_date);
    formData.append("no_of_attendees", currentWorkshop.no_of_attendees);
    formData.append("hall_id", currentWorkshop.hall_id._id); // Use the ID string
    formData.append("speaker_id", currentWorkshop.speaker_id._id); // Use the ID string

    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        `http://localhost:5000/workshops/${currentWorkshop._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedWorkshop = await response.json();
        console.log("Workshop updated successfully:", updatedWorkshop);

        // Update the workshops state to reflect the changes
        setWorkshops((prevWorkshops) =>
          prevWorkshops.map((workshop) =>
            workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          )
        );

        // Close the modal
        handleModalClose();
      } else {
        const result = await response.json();
        console.error("Error response:", result);
        setError(
          result.message || "An error occurred while updating the workshop."
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to connect to the server. Please try again.");
    }
  };
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="col-10 mx-auto text-center mt-5 mb-5">
      <h1 className="text-center text-uppercase font-weight-bold mb-3">
        Workshops And Sessions
      </h1>
      <table className="table  table-bordered">
        <thead>
          <tr className=" table-info ">
            <th>#</th>
            <th>Workshop Title</th>
            <th>Total Sessions</th>
            <th>Session Titles</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Workshop Image</th>
            <th>Hall</th>
            <th>No of Attendees</th>
            <th>Speaker</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((workshop, index) => (
            <tr key={index}>
              <td className="text-center p-4 ">{index + 1}</td>
              <td className="text-center p-4">{workshop.title}</td>
              <td className="text-center p-4">{workshop.sessions.length}</td>
              <td className="text-center p-4">
                {workshop.sessions.map((session, idx) => (
                  <div key={idx}>{session.title}</div>
                ))}
              </td>
              <td className="text-center p-4">{workshop.price}</td>
              <td className="text-center p-4">
                {new Date(workshop.start_date).toLocaleDateString()}
              </td>
              <td className="text-center p-4">
                {new Date(workshop.end_date).toLocaleDateString()}
              </td>
              <td className="text-center p-4">{workshop.description}</td>
              <td className="text-center p-4">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  width="100"
                  height="100"
                />
              </td>
              <td className="text-center p-4">
                {workshop.hall_id
                  ? getHallName(workshop.hall_id._id)
                  : "Unknown Hall"}
              </td>
              <td className="text-center p-4">{workshop.no_of_attendees}</td>
              <td className="text-center p-4">
                {workshop.speaker_id
                  ? getSpeakerName(workshop.speaker_id._id)
                  : "Unknown Speaker"}
              </td>
              <td className="text-center ">
                <button
                  className="btn btn-outline-warning btn-md mx-1 "
                  onClick={() => handleEdit(workshop)}
                >
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button
                  className="btn btn-outline-info btn-md  mx-1 mt-2"
                  onClick={() => handleSessionModalOpen(workshop)}
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  className="btn btn-outline-danger btn-md mx-1 mt-2"
                  onClick={() =>
                    handleDelete(workshop._id, workshop.schedule_id._id)
                  }
                >
                  {" "}
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          onClick={handleModalClose}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <h4 className="modal-title text-center w-100">Edit Workshop</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "600px", overflowY: "auto" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="text-center form-control"
                        id="title"
                        name="title"
                        value={currentWorkshop?.title || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        className="text-center form-control"
                        id="price"
                        name="price"
                        value={currentWorkshop?.price || ""}
                        onChange={handleInputChange}
                      />
                      {priceError && (
                        <div className="text-danger">{priceError}</div> // Display error message
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="start_date">Start Date</label>
                      <input
                        type="date"
                        className="text-center form-control"
                        id="start_date"
                        name="start_date"
                        min={today} // Disable past dates
                        value={currentWorkshop?.start_date.split("T")[0] || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="end_date">End Date</label>
                      <input
                        type="date"
                        className="text-center form-control"
                        id="end_date"
                        name="end_date"
                        min={today} // Disable past dates
                        value={currentWorkshop?.end_date.split("T")[0] || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7 form-group">
                      <label htmlFor="image">Workshop Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </div>
                    {previewImage && (
                      <div className="col-md-5 form-group">
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="hall_id">Hall</label>
                      <select
                        className=" text-center form-control"
                        id="hall_id"
                        name="hall_id"
                        value={currentWorkshop?.hall_id?._id || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Hall</option>
                        {halls.map((hall) => (
                          <option key={hall._id} value={hall._id}>
                            {hall.hall_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="speaker_id">Speaker</label>
                      <select
                        className="text-center form-control"
                        id="speaker_id"
                        name="speaker_id"
                        value={currentWorkshop?.speaker_id?._id || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Speaker</option>
                        {speakers.map((speaker) => (
                          <option key={speaker._id} value={speaker._id}>
                            {speaker.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="no_of_attendees">No of Attendees</label>
                      <input
                        type="number"
                        className="text-center form-control"
                        id="no_of_attendees"
                        name="no_of_attendees"
                        value={currentWorkshop?.no_of_attendees || ""}
                        onChange={handleInputChange}
                      />
                      {attendeeError && (
                        <div className="text-danger">{attendeeError}</div> // Display error message
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="total_sessions">Total Sessions</label>
                      <input
                        type="number"
                        className=" text-center form-control"
                        id="total_sessions"
                        name="total_sessions"
                        disabled
                        value={currentWorkshop?.total_sessions || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className=" text-center form-control"
                      id="description"
                      name="description"
                      value={currentWorkshop?.description || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* // Inside the modal form where you render session input fields */}
                  {currentSessions.map((session, index) => (
                    <>
                      <hr />
                      <div key={index} className="session-input">
                        <h5>Session {index + 1}</h5>
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <label htmlFor={`sessionTitle_${index}`}>
                              Session Title
                            </label>
                            <input
                              type="text"
                              className="text-center form-control"
                              id={`sessionTitle_${index}`}
                              value={session.title}
                              onChange={(e) =>
                                handleSessionChange(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor={`sessionDate_${index}`}>Date</label>
                            <input
                              type="date"
                              className="text-center form-control"
                              id={`sessionDate_${index}`}
                              min={today} // Disable past dates
                              value={session.date.split("T")[0] || ""}
                              onChange={(e) =>
                                handleSessionChange(
                                  index,
                                  "date",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 form-group">
                            <label htmlFor={`sessionStartTime_${index}`}>
                              Start Time
                            </label>
                            <input
                              type="time"
                              className="text-center form-control"
                              id={`sessionStartTime_${index}`}
                              value={session.start_time}
                              onChange={(e) =>
                                handleSessionChange(
                                  index,
                                  "start_time",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <label htmlFor={`sessionEndTime_${index}`}>
                              End Time
                            </label>
                            <input
                              type="time"
                              className="text-center form-control"
                              id={`sessionEndTime_${index}`}
                              value={session.end_time}
                              onChange={(e) =>
                                handleSessionChange(
                                  index,
                                  "end_time",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <label htmlFor={`sessionDuration_${index}`}>
                              Duration
                            </label>
                            <input
                              type="text"
                              className="text-center form-control"
                              id={`sessionDuration_${index}`}
                              value={session.duration}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
                  <div className=" text-center">
                    <button type="submit" className="btn3 ">
                      Update Workshop
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {sessionsModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          onClick={handleSessionModalClose}
        >
          <div
            className="modal-dialog modal-lg" // Use modal-lg for a larger modal
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
                <table className="table  table-bordered mt-2">
                  <thead>
                    <tr className=" table-info ">
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
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{session.title}</td>
                        <td>{new Date(session.date).toLocaleDateString()}</td>
                        <td>{session.start_time}</td>
                        <td>{session.end_time}</td>
                        <td>{session.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-center">
                  <button className="btn3" onClick={handleSessionModalClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showworkshop;
