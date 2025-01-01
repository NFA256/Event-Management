import React, { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
const Showseminar = () => {
  const [seminars, setSeminars] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSeminar, setCurrentSeminar] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);

  // Fetch seminars on load
  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await fetch("http://localhost:5000/seminars");
      const data = await response.json();

      if (response.ok) {
        const updatedSeminars = data.map((seminar) => ({
          ...seminar,
          is_paid: seminar.price === "Free" ? "No" : "Yes",
        }));
        setSeminars(updatedSeminars);
      } else {
        throw new Error(data.message || "Failed to fetch seminars.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [speakerResponse, hallResponse] = await Promise.all([
        fetch("http://localhost:5000/speakers"),
        fetch("http://localhost:5000/halls"),
      ]);

      const speakersData = await speakerResponse.json();
      const hallsData = await hallResponse.json();

      if (speakerResponse.ok && hallResponse.ok) {
        setSpeakers(speakersData);
        setHalls(hallsData);
      } else {
        throw new Error("Failed to fetch speakers or halls.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowModal = async (seminar) => {
    setCurrentSeminar(seminar);
    setModalOpen(true);
    setSuccessMessage(""); // Clear success message
    await fetchDropdownData();

    setTimeout(() => {
      if (modalRef.current) {
        const modal = new Modal(modalRef.current);
        modal.show();
      }
    }, 0);
  };
  const handleHideModal = () => {
    if (modalRef.current) {
      // Use the Bootstrap modal instance for proper control
      const modal = Modal.getInstance(modalRef.current);

      // Hide the modal and dispose the instance to ensure cleanup
      modal.hide();
      modal.dispose();

      // Update the React state to close the modal
      setModalOpen(false);

      // Ensure the background is properly restored after modal is closed
      // document.body.classList.remove("modal-open");
      // document.body.style.paddingRight = ""; // Reset any added padding (for scrollbar)
    }
  };

  useEffect(() => {
    return () => {
      if (modalRef.current) {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.dispose();
      }
    };
  }, []);
  const handleDeleteSeminar = async (seminarId,schedule_id) => {
    console.log(schedule_id)
    if (window.confirm("Are you sure you want to delete this seminar?")) {
      try {
        const deleteSchedule = await fetch(
          `http://localhost:5000/schedules/${schedule_id}`,
          {
            method: "DELETE",
          }
        );
        const response = await fetch(
          `http://localhost:5000/seminars/${seminarId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok && deleteSchedule.ok) {
          setSuccessMessage("Seminar deleted successfully!");
          fetchSeminars(); // Refresh the list after deletion
        } else {
          const scheduleresult = await response.json();
          const result = await response.json();
          setError(scheduleresult.message || result.message || "Failed to delete seminar.");
        }
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing title and purpose
    if (!currentSeminar.title || !currentSeminar.purpose) {
      setError("Title and Purpose are required!");
      return;
    }
    const scheduleData = {
      start_date: currentSeminar.date,
      end_date: currentSeminar.date,
      reserved_for: "Seminar",
    };

    const scheduleResponse = await fetch(`http://localhost:5000/schedules/${currentSeminar.schedule_id._id}`, {
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
    const updatedSeminar = {
      title: currentSeminar.title,
      purpose: currentSeminar.purpose,
      start_time: currentSeminar.start_time,
      end_time: currentSeminar.end_time,
      date: currentSeminar.date,
      speaker_id: currentSeminar.speaker_id,
      hall_id: currentSeminar.hall_id,
      capacity: currentSeminar.capacity,
      price: currentSeminar.price,
      scheduleId:scheduleResult.schedule._id,
      image: currentSeminar.image ? currentSeminar.image : null, // Or handle image separately if it's required
    };

    try {
      const response = await fetch(
        `http://localhost:5000/seminars/${currentSeminar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Send as JSON
          },
          body: JSON.stringify(updatedSeminar), // Send as JSON string
        }
      );

      if (response.ok) {
        setSuccessMessage("Seminar updated successfully!");
        fetchSeminars(); // Refresh seminars list
        handleHideModal(); // Close modal after success
      } else {
        const result = await response.json();
        setError(result.message || "Failed to update seminar.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="col-10 mx-auto text-center mt-5">
      <h1 className="text-center text-uppercase font-weight-bold mb-3">
        Seminars
      </h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && seminars.length > 0 ? (
        <table className="table  table-bordered">
          <thead>
            <tr className="table-info ">
              <th>#</th>
              <th>Title</th>
              <th>Purpose</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Date</th>
              <th>Speaker</th>
              <th>Hall</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Is Paid</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {seminars.map((seminar, index) => (
              <tr key={seminar._id}>
                <td>{index + 1}</td>
                <td>{seminar.title}</td>
                <td>{seminar.purpose}</td>
                <td>
                  {new Date(
                    `1970-01-01T${seminar.start_time}Z`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </td>
                <td>
                  {new Date(
                    `1970-01-01T${seminar.end_time}Z`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{new Date(seminar.date).toLocaleDateString()}</td>
                <td>{seminar.speaker_id ? seminar.speaker_id.name : "N/A"}</td>
                <td>{seminar.hall_id ? seminar.hall_id.hall_name : "N/A"}</td>
                <td>{seminar.capacity - seminar.no_of_attendees}</td>
                <td>{seminar.price}</td>
                <td>{seminar.is_paid}</td>
                <td>
                  {seminar.image ? (
                    <img
                      src={seminar.image}
                      alt={seminar.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-outline-warning btn-sm mx-2"
                    onClick={() => handleShowModal(seminar)}
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteSeminar(seminar._id,seminar.schedule_id._id)}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No seminars to display.</p>
      )}

      {/* modal */}

      <div
        className="modal fade"
        // id="editModal"
        tabIndex="-1"
        id={`editModal-${currentSeminar?._id || "new"}`}
        aria-hidden={!modalOpen}
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header  justify-content-center">
              <h4 className="modal-title text-center w-100">Edit Seminar</h4>
              <button type="button" className="close"  data-bs-dismiss="modal" aria-label="Close">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label>Title</label>
                    <input
                      type="text"
                      className=" text-center form-control"
                      value={currentSeminar?.title || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-md-6 ">
                    <label>Purpose</label>
                    <input
                      type="text"
                      className=" text-center form-control"
                      value={currentSeminar?.purpose || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          purpose: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label>Start Time</label>
                    <input
                      type="time"
                      className="text-center form-control"
                      value={currentSeminar?.start_time || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          start_time: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label>End Time</label>
                    <input
                      type="time"
                      className="text-center form-control"
                      value={currentSeminar?.end_time || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          end_time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label>Date</label>
                    <input
                      type="date"
                      className="text-center form-control"
                      value={
                        currentSeminar?.date
                          ? currentSeminar.date.split("T")[0]
                          : ""
                      }
                      min={new Date().toISOString().split("T")[0]} // Ensures past dates are disabled
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label>Capacity</label>
                    <input
                      type="number"
                      className="text-center form-control"
                      value={currentSeminar?.capacity || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          capacity: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label>Speaker</label>
                    <select
                      className="text-center form-control"
                      value={currentSeminar?.speaker_id?._id || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          speaker_id: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Speaker</option>
                      {speakers.map((speaker) => (
                        <option key={speaker._id} value={speaker._id}>
                          {speaker.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label>Hall</label>
                    <select
                      className="text-center form-control"
                      value={currentSeminar?.hall_id?._id || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          hall_id: e.target.value,
                        })
                      }
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
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="me-2">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          image: e.target.files[0],
                        })
                      }
                    />
                    {currentSeminar?.image &&
                    currentSeminar.image instanceof File ? (
                      <div className="ms-3">
                        <img
                          src={URL.createObjectURL(currentSeminar.image)}
                          alt="seminar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : currentSeminar?.image &&
                      typeof currentSeminar.image === "string" ? (
                      <div className="ms-3">
                        <img
                          src={currentSeminar.image}
                          alt="seminar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3  col-md-6 ">
                    <label>Price</label>
                    <input
                      type="text"
                      className="text-center form-control"
                      value={currentSeminar?.price || ""}
                      onChange={(e) =>
                        setCurrentSeminar({
                          ...currentSeminar,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn3" type="submit">
                    Update Seminar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showseminar;
