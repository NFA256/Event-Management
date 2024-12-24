import React, { useState, useEffect, useRef } from "react";

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

  useEffect(() => {
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
    fetchEvents();
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
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
      }
    }, 0);
  };

  const handleHideModal = () => {
    setModalOpen(false);
    if (modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.hide();
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
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
    }
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
    setPreviewImage(event.eventImage);
    handleShowModal();
  };

  return (
    <div>
      <div className="container mt-5">
        <h3 className="text-center">Events List</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Time</th>
              <th>Date</th>
              <th>No of Visitors</th>
              <th>Status</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.time}</td>
                  <td>{event.date}</td>
                  <td>{event.no_of_visitors}</td>
                  <td>{event.status}</td>
                  <td>
                    <img
                      src={event.eventImage}
                      alt={event.title}
                      style={{ maxWidth: "80px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </td>
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
  <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden={!modalOpen} ref={modalRef}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editModalLabel">Edit Event</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleHideModal}></button>
      </div>
      <div className="modal-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="form-outline">
                <label className="form-label" htmlFor="modal-title">Title</label>
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
                <label className="form-label" htmlFor="modal-description">Description</label>
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
                <label className="form-label" htmlFor="modal-time">Time</label>
                <input
                  type="text"
                  id="modal-time"
                  className="form-control form-control-lg"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="form-outline">
                <label className="form-label" htmlFor="modal-date">Date</label>
                <input
                  type="text"
                  id="modal-date"
                  className="form-control form-control-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="form-outline">
                <label className="form-label" htmlFor="modal-visitors">No of Visitors</label>
                <input
                  type="number"
                  id="modal-visitors"
                  className="form-control form-control-lg"
                  value={no_of_visitors}
                  onChange={(e) => setNoOfVisitors(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="form-outline">
                <label className="form-label" htmlFor="modal-status">Status</label>
                <input
                  type="text"
                  id="modal-status"
                  className="form-control form-control-lg"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="modal-image">Event Image</label>
            <input
              type="file"
              id="modal-image"
              className="form-control form-control-lg"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-3" style={{ maxWidth: "150px" }} />
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            {editMode ? "Update" : "Add Event"}
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
