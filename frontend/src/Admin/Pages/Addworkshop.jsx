import React, { useState, useEffect } from "react";

const Addworkshop = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !image ||
      !totalSessions ||
      !startDate ||
      !endDate ||
      !hallId ||
      !noOfAttendees ||
      !price ||
      !speakerId
    ) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("total_sessions", totalSessions);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("hall_id", hallId);
    formData.append("no_of_attendees", noOfAttendees);
    formData.append("price", price);
    formData.append("speaker_id", speakerId);

    try {
      const response = await fetch("http://localhost:5000/workshops", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("Workshop added successfully!");
        setError("");
        setTitle("");
        setDescription("");
        setImage(null);
        setPreviewImage("");
        setTotalSessions("");
        setStartDate("");
        setEndDate("");
        setHallId("");
        setNoOfAttendees("");
        setPrice("");
        setSpeakerId("");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const result = await response.json();
        setError(
          result.message || "An error occurred while adding the workshop."
        );
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
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="total_sessions">
                          Total Sessions
                        </label>
                        <input
                          type="number"
                          id="total_sessions"
                          className="form-control form-control-lg"
                          value={totalSessions}
                          onChange={(e) => setTotalSessions(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Total Sessions */}
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
                          min={
                            startDate || new Date().toISOString().split("T")[0]
                          } // Start date or current date
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      {/* Hall Selection */}
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

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn  btn-block ">
                        Add Workshop
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
