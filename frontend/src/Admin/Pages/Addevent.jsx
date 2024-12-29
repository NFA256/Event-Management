import React, { useState } from "react";

const Addevent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [noOfVisitors, setNoOfVisitors] = useState("");
  const [status, setStatus] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);  // New state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !description || !time || !date || !noOfVisitors || !status || !eventImage) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (!noOfVisitors || isNaN(noOfVisitors) || noOfVisitors <= 0) {
      setError("Number of visitors must be a positive number!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setLoading(true); // Set loading state to true when the form is being submitted

    const scheduleData = {
      start_date: date,
      end_date: date,
      reserved_for: "Event",
    };

    const scheduleResponse = await fetch("http://localhost:5000/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scheduleData),
    });

    if (scheduleResponse.status === 400) {
      const result = await scheduleResponse.json();
      setError(result.message || "An error occurred while creating the schedule.");
      setTimeout(() => setError(""), 3000);
      setLoading(false); // Disable loading on error
      return;
    } else if (!scheduleResponse.ok) {
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
    formData.append("time", time);
    formData.append("date", date);
    formData.append("no_of_visitors", noOfVisitors);
    formData.append("status", status);
    formData.append("eventImage", eventImage);
    formData.append("schedule_id", scheduleId);

    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("Event created successfully!");
        setError("");
        setTitle("");
        setDescription("");
        setTime("");
        setDate("");
        setNoOfVisitors("");
        setStatus("");
        setEventImage(null);
        setPreviewImage(null); // Clear preview
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const result = await response.json();
        setError(result.message || "An error occurred while creating the event.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after operation completes
    }
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
  
      setPreviewImage(URL.createObjectURL(file)); // Display image preview
      setEventImage(file); // Store the file object
    }
  };

  return (
    <section className="vh-100 mt-5">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 mb-5">
              <div className="card">
                <div className="card-body p-5">
                  <h1 className="text-uppercase font-weight-bold text-center mb-5">
                    Add Event
                  </h1>

                  {/* Error and Success messages */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {loading && (
                    <div className="alert alert-info" role="alert">
                      Adding Event...
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Title */}
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

                      {/* Description */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="form-control text-center form-control-lg"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="row">
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="time">
                          Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          className="form-control text-center form-control-lg"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>

                      {/* Date */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="date">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          className="form-control text-center form-control-lg"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Number of Visitors */}
                    <div className="row">
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="no_of_visitors">
                          Number of Visitors
                        </label>
                        <input
                          type="number"
                          id="no_of_visitors"
                          className="form-control text-center form-control-lg"
                          value={noOfVisitors}
                          onChange={(e) => setNoOfVisitors(e.target.value)}
                        />
                      </div>

                      {/* Status */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <select
                          id="status"
                          className="form-control text-center form-control-lg"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                          <option value="Upcoming">Upcoming</option>
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
                      <div className="col-3 ">
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

export default Addevent;
