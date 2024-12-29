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
  const [loading, setLoading] = useState(false); 
  const [sessions, setSessions] = useState([]); // New state for holding sessions
  const [priceError, setPriceError] = useState("");
  const [attendeesError, setAttendeesError] = useState("");

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
      newSessions.push({
        title: "",
        day_no: i + 1,
        date: "",
        start_time: "",
        end_time: "",
        duration: "",
      });
    }
    setSessions(newSessions);
  }, [totalSessions]); // Whenever totalSessions changes, update the sessions array

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // Automatically set the start date for session 1
    setSessions((prevSessions) => {
      const updatedSessions = [...prevSessions];
      if (updatedSessions[0]) {
        updatedSessions[0].date = newStartDate;
      }
      return updatedSessions;
    });
  };
  const handleNoOfAttendeesChange = (e) => {
    const value = e.target.value;
    setNoOfAttendees(value);

    // Validate number of attendees
    const numValue = parseInt(value, 10);
    if (numValue < 25 || numValue > 50) {
      setAttendeesError("Number of attendees must be between 25 and 50.");
    } else if (numValue < 0) {
      setAttendeesError("Number of attendees cannot be negative.");
    } else {
      setAttendeesError(""); // Clear error if valid
    }
  };
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);

    // Validate price
    if (value && parseFloat(value) <= 1000) {
      setPriceError("Price must be greater than 1000.");
    } else {
      setPriceError(""); // Clear error if valid
    }
  };
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    // Automatically set the end date for session n (last session)
    setSessions((prevSessions) => {
      const updatedSessions = [...prevSessions];
      const lastSessionIndex = updatedSessions.length - 1;
      if (updatedSessions[lastSessionIndex]) {
        updatedSessions[lastSessionIndex].date = newEndDate;
      }
      return updatedSessions;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      // const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setError("Only JPEG, JPG, PNG, images are allowed!");
        setTimeout(() => setError(""), 3000);
        return;
      }
      
      // if (file.size > maxSize) {
      //   setError("Image size must be less than 5MB!");
      //   setTimeout(() => setError(""), 3000);
      //   return;
      // }
  
      setPreviewImage(URL.createObjectURL(file));
      setworkshopImage(file); // Store the file object
    }
  };

  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][field] = value;
  
    // If the start time or end time is changed, recalculate the duration
    if (field === "start_time" || field === "end_time") {
      const startTime = updatedSessions[index].start_time;
      const endTime = updatedSessions[index].end_time;
  
      // Check if both start and end times are set
      if (startTime && endTime) {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
  
        // Ensure the start time is not later than the end time
        if (start >= end) {
          // Reset the end time to an empty string if invalid
          updatedSessions[index].end_time = "";
          updatedSessions[index].duration = ""; // Reset duration if times are invalid
        } else {
          // Calculate duration in minutes
          const durationInMinutes = (end - start) / (1000 * 60); // Convert milliseconds to minutes
  
          if (durationInMinutes > 0) {
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;
            updatedSessions[index].duration = `${hours}h ${minutes}m`; // Format as "Xh Ym"
          } else {
            updatedSessions[index].duration = ""; // Reset if duration is negative
          }
        }
      } else {
        updatedSessions[index].duration = ""; // Reset duration if either time is missing
      }
    }
  
    // Automatically set first session's date to startDate
    if (index === 0 && field === "date") {
      updatedSessions[index].date = startDate;
    }
  
    // Automatically set last session's date to endDate
    if (index === sessions.length - 1 && field === "date") {
      updatedSessions[index].date = endDate;
    }
  
    setSessions(updatedSessions);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price || parseFloat(price) <= 1000) {
      setError("Price must be greater than 1000.");
      setTimeout(() => setError(""), 3000);
      return;
    }
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
      sessions.some(
        (session) =>
          !session.title ||
          !session.day_no ||
          !session.date ||
          !session.start_time ||
          !session.end_time ||
          !session.duration
      ) ||
      // Ensure first session date is the same as startDate and last session date is the same as endDate
      new Date(sessions[0].date).toISOString().split("T")[0] !== startDate ||
      new Date(sessions[sessions.length - 1].date)
        .toISOString()
        .split("T")[0] !== endDate
    ) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (
      // ... other validations
      !noOfAttendees ||
      parseInt(noOfAttendees, 10) < 25 ||
      parseInt(noOfAttendees, 10) > 50 ||
      parseInt(noOfAttendees, 10) < 0
    ) {
      setError(
        "Number of attendees must be between 25 and 50 and cannot be negative."
      );
      setTimeout(() => setError(""), 3000);
      return;
    }
    setLoading(true);
    const scheduleData = { 
      start_date:startDate,
      end_date:endDate,
      reserved_for:"Worskshop",
   };
   const scheduleResponse = await fetch("http://localhost:5000/schedules", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(scheduleData),
   });
    if (!scheduleResponse.ok) {
     const result = await scheduleResponse.json();
     setError(result.message || "An error occurred while creating the schedule.");
     setTimeout(() => setError(""), 3000);
     setLoading(false); // Disable loading on error
     return;
   }

   const scheduleResult = await scheduleResponse.json();
   const scheduleId = scheduleResult.schedule._id;

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
    formData.append("schedule_id", scheduleId);
    try {
      // Send POST request to create the workshop
      const workshopResponse = await fetch("http://localhost:5000/workshops", {
        method: "POST",
        body: formData,
      });

      if (workshopResponse.ok) {
        const workshopData = await workshopResponse.json();

        // After workshop creation, create sessions for the same workshop
        const workshopId = workshopData.data._id; // Assuming workshop data contains the _id
        console.log("workshop", workshopData);
        console.log("workshop id", workshopId);
        const sessionPromises = sessions.map(async (session) => {
          console.log("Sending session data:", session); // Add this log to check the data
          const response = await fetch("http://localhost:5000/sessions", {
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
          const result = await response.json();
          console.log("Session Response:", result);
          return response.ok;
        });

        const sessionResults = await Promise.all(sessionPromises);
        if (sessionResults.every((res) => res === true)) {
          console.log("All sessions added successfully!");
          
        } else {
          console.error("Error adding some sessions.");
          setLoading(false); 
        }

        // Wait for all session creation requests to complete
        await Promise.all(sessionPromises);
        console.log("Session data before sending:", sessions);

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
        setLoading(false); // Disable loading on error
        setError(
          result.message || "An error occurred while adding the workshop."
        );
      }
    } catch (err) {
      setLoading(false); // Disable loading on error
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after operation completes
    }
    
  };

  return (
    <section className="vh-100 mt-5 mb-5">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 mb-5">
              <div className="card">
                <div className="card-body p-5">
                  <h1 className="text-uppercase font-weight-bold text-center mb-5">
                    Add Workshop
                  </h1>

                  {/* Error and Success messages */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                   {loading && (
                    <div className="alert alert-info" role="alert">
                      Adding Workshop...
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
                          className="form-control text-center form-control-lg"
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
    className="form-control text-center form-control-lg"
    value={totalSessions}
    onChange={(e) => {
      const value = e.target.value;

      // Handle backspace and empty value
      if (value === "") {
        setTotalSessions(value);  // Allow clearing the value
        setError(""); // Clear error when input is empty
        return;
      }

      const parsedValue = parseInt(value, 10);

      // Check if the value is a valid number and in the allowed range
      if (parsedValue >= 1 && parsedValue <= 6) {
        setTotalSessions(parsedValue); // Update the state with valid value
        setError(""); // Clear error if the value is valid
      } else {
        setError("Total sessions must be between 1 and 6.");
        setTimeout(() => setError(""), 3000);
      }
    }}
  />
  {error && <div className="text-danger mt-2">{error}</div>}
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
                          className="form-control text-center form-control-lg"
                          value={noOfAttendees}
                          onChange={handleNoOfAttendeesChange}
                        />
                        {attendeesError && (
                          <div className="text-danger mt-2">
                            {attendeesError}
                          </div>
                        )}
                      </div>
                      {/* Price */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="price">
                          Price
                        </label>
                        <input
                          type="text"
                          id="price"
                          className="form-control text-center form-control-lg"
                          value={price}
                          onChange={handlePriceChange}
                        />
                        {priceError && (
                          <div className="text-danger mt-2">{priceError}</div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="form-label" htmlFor="start_date">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="start_date"
                          className="form-control text-center form-control-lg"
                          value={startDate}
                          min={new Date().toISOString().split("T")[0]} // Restrict past dates
                          onChange={handleStartDateChange}
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
                          className="form-control text-center form-control-lg"
                          value={endDate}
                          min={
                            startDate || new Date().toISOString().split("T")[0]
                          }
                          onChange={handleEndDateChange}
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
                          className="form-control text-center form-control-lg"
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
                          className="form-control text-center form-control-lg"
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
                            className="form-control text-center form-control-lg"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        {previewImage ? (
                          <img
                            style={{
                              maxWidth: "150px",
                              maxHeight: "150px",
                              display: "block",
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
                        className="form-control text-center form-control-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Render Session Input Fields Dynamically */}
                    {sessions.map((session, index) => (
                      <>
                        <h5 className="text-center mt-3">
                          Session {index + 1}
                        </h5>
                        <hr />
                        <div className="row" key={index}>
                          <div className="col-md-4 form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor={`sessionTitle_${index}`}
                            >
                              Session Title
                            </label>
                            <input
                              type="text"
                              id={`sessionTitle_${index}`}
                              className="form-control text-center form-control-lg"
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

                          <div className="col-md-4 form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor={`sessionDayNo_${index}`}
                            >
                              Day No
                            </label>
                            <input
                              type="number"
                              id={`sessionDayNo_${index}`}
                              className="form-control text-center form-control-lg"
                              value={session.day_no}
                              onChange={(e) =>
                                handleSessionChange(
                                  index,
                                  "day_no",
                                  e.target.value
                                )
                              }
                              disabled
                            />
                          </div>

                          <div className="col-md-4 form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor={`sessionDate_${index}`}
                            >
                              Date
                            </label>
                            <input
                              type="date"
                              id={`sessionDate_${index}`}
                              className="form-control text-center form-control-lg"
                              value={session.date}
                              onChange={(e) =>
                                handleSessionChange(
                                  index,
                                  "date",
                                  e.target.value
                                )
                              }
                              min={startDate} // Restrict dates before the workshop's start date
                              max={endDate} // Restrict dates after the workshop's end date
                            />
                            {session.date &&
                              (new Date(session.date) < new Date(startDate) ||
                                new Date(session.date) > new Date(endDate)) && (
                                <div className="text-danger mt-2">
                                  Session date must be between the workshop's
                                  start and end dates.
                                </div>
                              )}
                            {index === 0 &&
                              session.date &&
                              new Date(session.date)
                                .toISOString()
                                .split("T")[0] !== startDate && (
                                <div className="text-danger mt-2">
                                  The first session's date must match the
                                  workshop's start date.
                                </div>
                              )}
                            {index === sessions.length - 1 &&
                              session.date &&
                              new Date(session.date)
                                .toISOString()
                                .split("T")[0] !== endDate && (
                                <div className="text-danger mt-2">
                                  The last session's date must match the
                                  workshop's end date.
                                </div>
                              )}
                          </div>

                          <div className="col-md-4 form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor={`sessionStartTime_${index}`}
                            >
                              Start Time
                            </label>
                            <input
                              type="time"
                              id={`sessionStartTime_${index}`}
                              className="form-control text-center form-control-lg"
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

                          <div className="col-md-4 form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor={`sessionEndTime_${index}`}
                            >
                              End Time
                            </label>
                            <input
                              type="time"
                              id={`sessionEndTime_${index}`}
                              className="form-control text-center form-control-lg"
                              value={session.end_time}
                              onChange={(e) =>
                                handleSessionChange(
                                  index,
                                  "end_time",
                                  e.target.value
                                )
                              }
                               min={session.start_time || "00:00"} // Ensure end time is after start time
    max="23:59"
                            />
                          </div>

                          <div className="col-md-4 form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor={`sessionDuration_${index}`}
                            >
                              Duration (hrs)
                            </label>
                            <input
                              type="text"
                              id={`sessionDuration_${index}`}
                              className="form-control text-center form-control-lg"
                              value={session.duration}
                              disabled // Duration is calculated automatically
                            />
                          </div>
                        </div>
                        <hr />
                      </>
                    ))}

<div className="form-outline text-center mb-4">
                      <button
                        type="submit"
                        className="btn3"
                        disabled={loading} // Disable the button while loading
                      >
                        {loading ? "Adding..." : "Submit"} {/* Change button text */}
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
