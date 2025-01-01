import React, { useEffect, useState } from "react";

// Modal component for editing hall details
const EditHallModal = ({ show, hall, onClose, onEdit }) => {
  const [hallName, setHallName] = useState(hall.hall_name || ""); // Initialize with hall_name or empty string

  // This useEffect ensures that when the modal is opened, the hall name is updated.
  useEffect(() => {
    if (hall) {
      setHallName(hall.hall_name || ""); // Reset hall name whenever hall changes
    }
  }, [hall]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ ...hall, hall_name: hallName }); // Pass updated hall data
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Hall</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Hall Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={hallName}
                  onChange={(e) => setHallName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Showhall = () => {
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState("");
  const [editHall, setEditHall] = useState(null);  // State to manage the hall being edited
  const [showEditModal, setShowEditModal] = useState(false);  // State to manage modal visibility

  // Fetch data from API
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch("http://localhost:5000/halls");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setHalls(data);
          } else {
            setError(data.message || "No halls found.");
          }
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch halls.");
        }
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    };

    fetchHalls();
  }, []);

  // Delete hall
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this hall?");
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:5000/halls/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setHalls(halls.filter((hall) => hall._id !== id));
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to delete hall.");
        }
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (updatedHall) => {
    try {
      const response = await fetch(`http://localhost:5000/halls/${updatedHall._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedHall),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setHalls(
          halls.map((hall) => (hall._id === data.hall._id ? data.hall : hall))  // Update hall in state
        );
        setShowEditModal(false);  // Close modal after successful edit
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update hall.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="col-10 mx-auto text-center mt-5">
      <h1 className="text-center text-uppercase font-weight-bold mb-3">Halls</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table of halls */}
      {!error && halls.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr className="table-info">
              <th>#</th>
              <th>Hall Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall, index) => (
              <tr key={hall._id}>
                <td>{index + 1}</td>
                <td>{hall.hall_name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setEditHall(hall);  // Set the hall to be edited
                      setShowEditModal(true);  // Show the edit modal
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(hall._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No halls to display.</p>
      )}

      {/* Edit Hall Modal */}
      <EditHallModal
        show={showEditModal}
        hall={editHall || {}}
        onClose={() => setShowEditModal(false)}
        onEdit={handleEditSubmit}
      />
    </div>
  );
};

export default Showhall;
