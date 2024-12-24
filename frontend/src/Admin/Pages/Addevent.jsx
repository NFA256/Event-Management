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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !description || !time || !date || !noOfVisitors || !status || !eventImage) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("time", time);
    formData.append("date", date);
    formData.append("no_of_visitors", noOfVisitors);
    formData.append("status", status);
    formData.append("eventImage", eventImage);

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
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Display image preview
      setEventImage(file); // Store the file object
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
                  <h2 className="text-uppercase text-center mb-5">Add Event</h2>

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
                    {/* Title */}
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

                      {/* Description */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="form-control form-control-lg"
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
                          className="form-control form-control-lg"
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
                          className="form-control form-control-lg"
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
                          className="form-control form-control-lg"
                          value={noOfVisitors}
                          onChange={(e) => setNoOfVisitors(e.target.value)}
                        />
                      </div>

                      {/* Status */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <input
                          type="text"
                          id="status"
                          className="form-control form-control-lg"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        />
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

export default Addevent;
