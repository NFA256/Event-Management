import React, { useState, useEffect } from "react";

const Addseminar = () => {
  const [seminarData, setSeminarData] = useState({
    date: "",
    title: "",
    seminarImage: null,
    previewImage: "",
    purpose: "",
    start_time: "",
    end_time: "",
    capacity: "",
    is_paid: false,
    price: "",
    speaker_id: "",
    hall_id: "",
  });

  const [halls, setHalls] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

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
      setSeminarData({
        ...seminarData,
        previewImage: URL.createObjectURL(file),
        seminarImage: file,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the checkbox for is_paid is unchecked, set the price to "Free"
    if (name === "is_paid" && !checked) {
      setSeminarData({
        ...seminarData,
        [name]: checked,
        price: "Free", // Set price to "Free" when is_paid is unchecked
      });
    } else {
      setSeminarData({
        ...seminarData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { start_time, end_time, is_paid, price } = seminarData;

    // Validation
    if (!start_time || !end_time) {
      setError("Both start time and end time are required.");
      setSuccess("");
      return;
    }

    if (start_time >= end_time) {
      setError("End time must be later than start time.");
      setSuccess("");
      return;
    }

    if (is_paid && !price) {
      setError("Price is required for paid seminars.");
      setSuccess("");
      return;
    }
    if (is_paid && price <= 1000) {
      setError("Price must be greater than 1000 for paid seminars.");
      setSuccess("");
      return;
    }
    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      for (const key in seminarData) {
        formData.append(key, seminarData[key]);
      }

      const response = await fetch("http://localhost:5000/seminars", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add seminar.");
      }

      setSuccess("Seminar added successfully!");
      setSeminarData({
        date: "",
        title: "",
        image: null,
        previewImage: "",
        purpose: "",
        start_time: "",
        end_time: "",
        capacity: "",
        is_paid: false,
        price: "",
        speaker_id: "",
        hall_id: "",
      });
    } catch (err) {
      setError(err.message || "Error adding seminar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 ">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create a Seminar
                  </h2>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <p>{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert">
                      <p>{success}</p>
                    </div>
                  )}

                  <form
                    id="seminarForm"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      {/* Seminar Title */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="title">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="form-control text-center form-control-lg"
                          value={seminarData.title}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Seminar Purpose */}
                      <div className=" col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="purpose">
                          Purpose
                        </label>
                        <input
                          type="text"
                          id="purpose"
                          name="purpose"
                          className="form-control text-center form-control-lg"
                          value={seminarData.purpose}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      {/* Seminar Date */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="date">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="form-control text-center form-control-lg"
                          value={seminarData.date}
                          onChange={handleChange}
                          min={today} // Set today's date as the minimum
                        />
                      </div>
                      {/* Seminar Capacity */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="capacity">
                          Capacity
                        </label>
                        <input
                          type="number"
                          id="capacity"
                          name="capacity"
                          className="form-control text-center form-control-lg"
                          value={seminarData.capacity}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Only allow values within the range 25 to 50 and prevent negative values
                            if (value >= 0 && value <= 50) {
                              setSeminarData({
                                ...seminarData,
                                capacity: value,
                              });
                            }
                          }}
                        />
                        {/* Show warning if value is not within the range */}
                        {(seminarData.capacity < 25 ||
                          seminarData.capacity > 50) &&
                          seminarData.capacity !== "" && (
                            <div className="text-danger mt-2">
                              Capacity must be between 25 and 50.
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="row">
                      {/* Seminar Start Time */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="start_time">
                          Start Time
                        </label>
                        <input
                          type="time"
                          id="start_time"
                          name="start_time"
                          className="form-control text-center form-control-lg"
                          value={seminarData.start_time}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Seminar End Time */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="end_time">
                          End Time
                        </label>
                        <input
                          type="time"
                          id="end_time"
                          name="end_time"
                          className="form-control text-center form-control-lg"
                          value={seminarData.end_time}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      {/* Paid Status */}
                      <div className="col-6 form-check mb-4 ">
                        <input
                          className="form-check-input form-check-lg"
                          type="checkbox"
                          id="is_paid"
                          name="is_paid"
                          checked={seminarData.is_paid}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="is_paid"
                        >
                          Is Paid?
                        </label>
                      </div>

                      {/* Price */}
                      {seminarData.is_paid ? (
                        <div className="col-md-6 form-outline mb-4">
                          <label className="form-label" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            className="form-control text-center form-control-lg"
                            value={seminarData.price || ""} // Show empty if no price
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(value)) {
                                // Ensure the input is numeric
                                setSeminarData({
                                  ...seminarData,
                                  price: value,
                                });
                              }
                            }}
                          />
                          {/* Note for price validation */}
                          {seminarData.price && seminarData.price <= 1000 && (
                            <div className="text-danger mt-2">
                              Note: Price must be greater than 1000.
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="col-md-6 form-outline mb-4">
                          <label className="form-label" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            className="form-control text-center form-control-lg"
                            value="Free" // Show "Free" when not paid
                            disabled // Disable the input field when not paid
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      {/* Speaker Dropdown */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="speaker_id">
                          Speaker
                        </label>
                        <select
                          id="speaker_id"
                          name="speaker_id"
                          className="form-control text-center form-control-lg"
                          value={seminarData.speaker_id}
                          onChange={handleChange}
                        >
                          <option value="">Select Speaker</option>
                          {speakers.map((speaker) => (
                            <option key={speaker._id} value={speaker._id}>
                              {speaker.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Hall Dropdown */}
                      <div className="col-md-6 form-outline mb-4">
                        <label className="form-label" htmlFor="hall_id">
                          Hall
                        </label>
                        <select
                          id="hall_id"
                          name="hall_id"
                          className="form-control text-center form-control-lg"
                          value={seminarData.hall_id}
                          onChange={handleChange}
                        >
                          <option value="">Select Hall</option>
                          {halls.map((hall) => (
                            <option key={hall._id} value={hall._id}>
                              {hall.hall_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Image upload */}
                    <div className="row mb-3 mt-2">
                      <div className="col-8">
                        <div className="form-group">
                          <label htmlFor="image">Image</label>
                          <input
                            name="image"
                            id="image"
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        {seminarData.previewImage ? (
                          <img
                            style={{ maxWidth: "120px" }}
                            alt="Preview"
                            className="img-thumbnail"
                            src={seminarData.previewImage}
                          />
                        ) : (
                          <div
                            style={{
                              backgroundColor: "#98939378",
                              width: "100px",
                              height: "100px",
                              color: "grey",
                              fontSize: "13px",
                            }}
                            className="px-3 py-4 text-center"
                          >
                            No Image Selected
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <button
                        type="submit"
                        id="btn_add"
                        name="btn_add"
                        className="btn3 "
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Add Seminar"}
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

export default Addseminar;