import React, { useState, useEffect } from "react";

const Addworkshop = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [workshopImage, setworkshopImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [totalSessions, setTotalSessions] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hallId, setHallId] = useState("");
  const [noOfAttendees, setNoOfAttendees] = useState("");
  const [price, setPrice] = useState("");
  const [speakerId, setSpeakerId] = useState("");
  const [halls, setHalls] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sessions, setSessions] = useState([]);  // New state for holding sessions

  useEffect(() => {
    const fetchHallsAndSpeakers = async () => {
      try {
        const hallResponse = await fetch("http://localhost:5000/halls");
        const hallData = await hallResponse.json();
        setHalls(hallData);

        const speakerResponse = await fetch("http://localhost:5000/speakers");
        const speakerData = await speakerResponse.json();
        setSpeakers(speakerData);
      } catch (err) {
        setError("Failed to fetch halls or speakers.");
      }
    };

    fetchHallsAndSpeakers();
  }, []);

  useEffect(() => {
    // Dynamically set session fields based on totalSessions
    const newSessions = [];
    for (let i = 0; i < totalSessions; i++) {
      newSessions.push({ title: "", day_no: "", date: "", start_time: "", end_time: "", duration: "" });
    }
    setSessions(newSessions);
  }, [totalSessions]);  // Whenever totalSessions changes, update the sessions array

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setworkshopImage(file);
    }
  };

  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][field] = value;
  
    // If the start time or end time is changed, recalculate the duration
    if (field === 'start_time' || field === 'end_time') {
      const startTime = updatedSessions[index].start_time;
      const endTime = updatedSessions[index].end_time;
  
      // Check if both start and end times are set
      if (startTime && endTime) {
        // Calculate duration in hours
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        
        // Duration in hours (rounded to two decimal places)
        const duration = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
        updatedSessions[index].duration = duration > 0 ? duration.toFixed(2) : ""; // Ensure positive duration
      }
    }
  
    setSessions(updatedSessions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields
    if (
      !title ||
      !description ||
      !workshopImage ||
      !totalSessions ||
      !startDate ||
      !endDate ||
      !hallId ||
      !noOfAttendees ||
      !price ||
      !speakerId ||
      sessions.some(session => 
        !session.title || 
        !session.day_no || 
        !session.date || 
        !session.start_time || 
        !session.end_time || 
        !session.duration
      )
      ||
    // Ensure first session date is the same as startDate and last session date is the same as endDate
    new Date(sessions[0].date).toISOString().split("T")[0] !== startDate ||
    new Date(sessions[sessions.length - 1].date).toISOString().split("T")[0] !== endDate
    ) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("workshopImage", workshopImage);
    formData.append("total_sessions", totalSessions);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("hall_id", hallId);
    formData.append("no_of_attendees", noOfAttendees);
    formData.append("price", price);
    formData.append("speaker_id", speakerId);
  
    try {
      // Send POST request to create the workshop
      const workshopResponse = await fetch("http://localhost:5000/workshops", {
        method: "POST",
        body: formData,
      });
  
      if (workshopResponse.ok) {
        const workshopData = await workshopResponse.json();
  
        // After workshop creation, create sessions for the same workshop
        const workshopId = workshopData._id; // Assuming workshop data contains the _id
  
        const sessionPromises = sessions.map((session) => {
          return fetch("http://localhost:5000/sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              workshop_id: workshopId,
              title: session.title,
              day_no: session.day_no,
              date: session.date,
              start_time: session.start_time,
              end_time: session.end_time,
              duration: session.duration,
            }),
          });
        });
  
        // Wait for all session creation requests to complete
        await Promise.all(sessionPromises);
  
        // Success feedback
        setSuccess("Workshop and sessions added successfully!");
        setError("");
        setTitle("");
        setDescription("");
        setworkshopImage(null);
        setPreviewImage("");
        setTotalSessions("");
        setStartDate("");
        setEndDate("");
        setHallId("");
        setNoOfAttendees("");
        setPrice("");
        setSpeakerId("");
        setSessions([]); // Clear session data after submission
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const result = await workshopResponse.json();
        setError(result.message || "An error occurred while adding the workshop.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };
  

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 mb-5">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Add Workshop
                  </h2>

                  {/* Error and Success messages */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Title and Total Sessions */}
                    <div className="row">
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="title">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="form-control form-control-lg"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="total_sessions">
                          Total Sessions
                        </label>
                        <input
                          type="number"
                          id="total_sessions"
                          className="form-control form-control-lg"
                          value={totalSessions}
                          onChange={(e) => setTotalSessions(parseInt(e.target.value, 10) || "")}
                        />
                      </div>
                    </div>

                    {/* Other workshop details */}
                    <div className="row">
                      {/* Number of Attendees */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="no_of_attendees">
                          Number of Attendees
                        </label>
                        <input
                          type="number"
                          id="no_of_attendees"
                          className="form-control form-control-lg"
                          value={noOfAttendees}
                          onChange={(e) => setNoOfAttendees(e.target.value)}
                        />
                      </div>
                      {/* Price */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="price">
                          Price
                        </label>
                        <input
                          type="text"
                          id="price"
                          className="form-control form-control-lg"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      {/* Start Date */}
                      <div className="col-md-6 mb-4">
                        <label className="form-label" htmlFor="start_date">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="start_date"
                          className="form-control form-control-lg"
                          value={startDate}
                          min={new Date().toISOString().split("T")[0]} // Restrict past dates
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>

                      {/* End Date */}
                      <div className="col-md-6 mb-4">
                        <label className="form-label" htmlFor="end_date">
                          End Date
                        </label>
                        <input
                          type="date"
                          id="end_date"
                          className="form-control form-control-lg"
                          value={endDate}
                          min={startDate || new Date().toISOString().split("T")[0]}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Hall and Speaker Selection */}
                    <div className="row">
                      <div className="col-6 form-outline mb-4">
                        <label className="form-label" htmlFor="hall_id">
                          Hall
                        </label>
                        <select
                          id="hall_id"
                          className="form-control form-control-lg"
                          value={hallId}
                          onChange={(e) => setHallId(e.target.value)}
                        >
                          <option value="">Select Hall</option>
                          {halls.length === 0 ? (
                            <option value="">No halls available</option>
                          ) : (
                            halls.map((hall) => (
                              <option key={hall._id} value={hall._id}>
                                {hall.hall_name || "Unknown Hall"}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {/* Speaker Selection */}
                      <div className="col-6 form-outline mb-4">
                        <label className="form-label" htmlFor="speaker_id">
                          Speaker
                        </label>
                        <select
                          id="speaker_id"
                          className="form-control form-control-lg"
                          value={speakerId}
                          onChange={(e) => setSpeakerId(e.target.value)}
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

                    {/* Image Upload */}
                    <div className="row mt-2">
                      <div className="col-9">
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="image">
                            Image
                          </label>
                          <input
                            type="file"
                            id="image"
                            className="form-control form-control-lg"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        {previewImage ? (
                          <img
                            style={{
                              maxWidth: "100%",
                              maxHeight: "150px",
                              display: "block",
                              marginTop: "10px",
                              borderRadius: "8px",
                            }}
                            alt="Preview"
                            className="img-thumbnail"
                            src={previewImage}
                          />
                        ) : (
                          <div
                            style={{
                              backgroundColor: "#f8f9fa",
                              border: "1px dashed #ced4da",
                              borderRadius: "8px",
                              width: "150px",
                              height: "150px",
                              marginTop: "10px",
                              color: "#6c757d",
                              fontSize: "14px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            No Image Selected
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="form-control form-control-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Render Session Input Fields Dynamically */}
                    {sessions.map((session, index) => (
  <>
    <h5 className="text-center mt-3">Session {index + 1}</h5>
    <hr />
    <div className="row" key={index}>
      <div className="col-md-4 form-outline mb-4">
        <label className="form-label" htmlFor={`sessionTitle_${index}`}>
          Session Title
        </label>
        <input
          type="text"
          id={`sessionTitle_${index}`}
          className="form-control form-control-lg"
          value={session.title}
          onChange={(e) => handleSessionChange(index, "title", e.target.value)}
        />
      </div>

      <div className="col-md-4 form-outline mb-4">
        <label className="form-label" htmlFor={`sessionDayNo_${index}`}>
          Day No
        </label>
        <input
          type="number"
          id={`sessionDayNo_${index}`}
          className="form-control form-control-lg"
          value={session.day_no}
          onChange={(e) => handleSessionChange(index, "day_no", e.target.value)}
        />
      </div>

      <div className="col-md-4 form-outline mb-4">
        <label className="form-label" htmlFor={`sessionDate_${index}`}>
          Date
        </label>
        <input
          type="date"
          id={`sessionDate_${index}`}
          className="form-control form-control-lg"
          value={session.date}
          onChange={(e) => handleSessionChange(index, "date", e.target.value)}
          min={startDate} // Restrict dates before the workshop's start date
          max={endDate} // Restrict dates after the workshop's end date
        />
        {/* Error message if the session date is outside the workshop's range */}
        {session.date && (
          (new Date(session.date) < new Date(startDate) || new Date(session.date) > new Date(endDate)) && (
            <div className="text-danger mt-2">Session date must be between the workshop's start and end dates.</div>
          )
        )}
        {/* Additional validation: first session must match the workshop start date */}
        {index === 0 && session.date && new Date(session.date).toISOString().split("T")[0] !== startDate && (
          <div className="text-danger mt-2">The first session's date must match the workshop's start date.</div>
        )}
        {/* Additional validation: last session must match the workshop end date */}
        {index === sessions.length - 1 && session.date && new Date(session.date).toISOString().split("T")[0] !== endDate && (
          <div className="text-danger mt-2">The last session's date must match the workshop's end date.</div>
        )}
      </div>

      <div className="col-md-4 form-outline mb-4">
        <label className="form-label" htmlFor={`sessionStartTime_${index}`}>
          Start Time
        </label>
        <input
          type="time"
          id={`sessionStartTime_${index}`}
          className="form-control form-control-lg"
          value={session.start_time}
          onChange={(e) => handleSessionChange(index, "start_time", e.target.value)}
        />
      </div>

      <div className="col-md-4 form-outline mb-4">
        <label className="form-label" htmlFor={`sessionEndTime_${index}`}>
          End Time
        </label>
        <input
          type="time"
          id={`sessionEndTime_${index}`}
          className="form-control form-control-lg"
          value={session.end_time}
          onChange={(e) => handleSessionChange(index, "end_time", e.target.value)}
        />
      </div>

      <div className="col-md-4 form-outline mb-4">
        <label className="form-label" htmlFor={`sessionDuration_${index}`}>
          Duration (hrs)
        </label>
        <input
          type="number"
          id={`sessionDuration_${index}`}
          className="form-control form-control-lg"
          value={session.duration}
          disabled // Duration is calculated automatically
        />
      </div>
    </div>
    <hr />
  </>
))}



                    <div className="form-outline text-center mb-4">
                      <button type="submit" className="btn btn-success btn-lg">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addworkshop;
