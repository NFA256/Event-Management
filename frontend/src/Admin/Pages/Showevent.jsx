import React, { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
const ShowEvent = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(""); // Time field
  const [date, setDate] = useState(""); // Date field
  const [no_of_visitors, setNoOfVisitors] = useState(""); // Correct field for no_of_visitors
  const [status, setStatus] = useState(""); // Status field
  const [eventImage, setEventImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const modalRef = useRef(null);
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/events");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("API response is not an array:", data);
          setEvents([]);
        }
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    
    fetchEvents();
  }, []);
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.role) {
    setRole(storedUser.role);
    setIsLoggedIn(true);

  }
  
}, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      setEventImage(file);
    }
  };

const handleShowModal = () => {
  setModalOpen(true);
  setTimeout(() => {
    if (modalRef.current) {
      const modalInstance = new Modal(modalRef.current);
        modalInstance.show(); // Show the modal
    }
  }, 0);
};

const handleHideModal = () => {
  setModalOpen(false);
  if (modalRef.current) {
    const modalInstance = Modal.getInstance(modalRef.current);
    modalInstance.hide(); // Hide the modal
  }
};

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTime("");
    setDate("");
    setNoOfVisitors(""); // Reset no_of_visitors
    setStatus("");
    setEventImage(null);
    setPreviewImage("");
    setEditMode(false);
    setCurrentEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !time || !date || !no_of_visitors || (!eventImage && !editMode)) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    const scheduleData = {
      start_date: date,
      end_date: date,
      reserved_for: "Event",
    };

    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("time", time);
    formData.append("date", date);
    formData.append("no_of_visitors", no_of_visitors); // Correct field name
    formData.append("status", status);
    if (eventImage) formData.append("eventImage", eventImage);

    try {
      if (editMode) {
        const scheduleResponse = await fetch(`http://localhost:5000/schedules/${currentEvent.schedule_id._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(scheduleData),
        });
    
        if (scheduleResponse.status === 400) {
          const result = await scheduleResponse.json();
          setError(result.message || "An error occurred while creating the schedule.");
          setTimeout(() => setError(""), 3000);
          return;
        } else if (!scheduleResponse.ok) {
          const result = await scheduleResponse.json();
          setError(result.message || "An error occurred while creating the schedule.");
          setTimeout(() => setError(""), 3000);
          return;
        }
    
        const scheduleResult = await scheduleResponse.json();
        const scheduleId = scheduleResult.schedule._id;
        formData.append("schedule_id", scheduleId);
        const url = `http://localhost:5000/events/${currentEvent._id}`;
        const response = await fetch(url, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          const updatedEvent = await response.json();
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event._id === currentEvent._id ? updatedEvent : event
            )
          );
          setSuccess("Event updated successfully!");
          setTimeout(() => setSuccess(""), 3000);
          resetForm();
          handleHideModal();
          fetchEvents()
        } else {
          const result = await response.json();
          setError(result.message || "An error occurred.");
        }
      } else {
        setError("You can only update events in edit mode.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  const handleDelete = async (id,schedule_id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
    try {
      const deleteSchedule = await fetch(
        `http://localhost:5000/schedules/${schedule_id}`,
        {
          method: "DELETE",
        }
      );
      const response = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok  && deleteSchedule.ok) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== id)
        );
        setSuccess("Event deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to delete event.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    }}
  };

  const handleEdit = (event) => {
    setEditMode(true);
    setCurrentEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setTime(event.time);
    setDate(event.date);
    setNoOfVisitors(event.no_of_visitors); // Set no_of_visitors correctly
    setStatus(event.status);
    setPreviewImage(event.image);
    handleShowModal();
  };

  return (
    <div>
      <div className="col-10 mx-auto text-center mt-5">
        <h1 className="text-center text-uppercase font-weight-bold mb-3">
          Events{" "}
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <table className="table table-bordered">
          <thead>
            <tr className="table-info ">
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Time</th>
              <th>Date</th>
              <th>No of Visitors</th>
              <th>Status</th>
              <th>Image</th>
              {
                 role === "admin"
?(
  <th>Actions</th>
)
:null
              }
              
            </tr>
          </thead>
          <tbody>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>
                  {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td>{new Date(event.date).toLocaleDateString()} </td>
                  <td>{event.no_of_visitors}</td>
                  <td>{event.status}</td>
                  <td>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{ maxWidth: "80px" }}
                    />
                  </td>
                  {
                 role === "admin"
?(
  <td>
                    <button
                      className="btn btn-outline-warning btn-md mx-2"
                      onClick={() => handleEdit(event)}
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-md mx-2"
                      onClick={() => handleDelete(event._id,event.schedule_id._id)}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
)
:null
              }
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No events available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-hidden={!modalOpen}
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h4 className="modal-title text-center w-100" id="editModalLabel">
                Edit Event
              </h4>
              <button type="button" className="close"  data-bs-dismiss="modal" aria-label="Close">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="modal-title">
                        Title
                      </label>
                      <input
                        type="text"
                        id="modal-title"
                        className="form-control form-control-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="modal-description">
                        Description
                      </label>
                      <input
                        type="text"
                        id="modal-description"
                        className="form-control form-control-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="modal-time">
                        Time
                      </label>
                      <input
                        type="time"
                        id="modal-time"
                        className="form-control form-control-lg"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="modal-date">
                        Date
                      </label>
                      <input
                        type="date"
                        id="modal-date"
                        className="form-control form-control-lg"
                        value={date.split("T")[0] || ""} // Ensure the date is in YYYY-MM-DD format
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="modal-visitors">
                        No of Visitors
                      </label>
                      <input
                        type="number"
                        id="modal-visitors"
                        className="form-control form-control-lg"
                        value={no_of_visitors}
                        onChange={(e) => setNoOfVisitors(e.target.value)}
                      />
                    </div>
                  </div>
{/* Status */}
<div className="col-md-6 mb-4">
                        <label className="form-label" htmlFor="modal-status">
                          Status
                        </label>
                        <select
                          id="modal-status"
                          className="form-control form-control-lg"
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

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="modal-image">
                    Event Image
                  </label>
                  <input
                    type="file"
                    id="modal-image"
                    className="form-control form-control-lg"
                    onChange={handleImageChange}
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="mt-3"
                      style={{ maxWidth: "150px" }}
                    />
                  )}
                </div>

                <button type="submit" className="btn3 ">
                  {editMode ? "Update Event" : "Add Event"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
