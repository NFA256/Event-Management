import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";  // Import necessary components from React Bootstrap

const Showfloor = () => {
  const [floors, setFloors] = useState([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState(""); // For warning about booth limit
  const [editMode, setEditMode] = useState(false); // For toggling edit modal
  const [currentFloor, setCurrentFloor] = useState(null); // Store the floor being edited

  // Fetch floor data from API
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await fetch("https://eventsphere-project.vercel.app/floors");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setFloors(data);

            // Check if any floor has more than 50 booths
            data.forEach((floor) => {
              if (floor.total_booths > 50) {
                setWarning("Some floors have more than the allowed 50 booths.");
              }
            });
          } else {
            setError(data.message || "No floors found.");
          }
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch floors.");
        }
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    };

    fetchFloors();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this floor?");
    if (confirmed) {
      try {
        const response = await fetch(`https://eventsphere-project.vercel.app/floors/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setFloors(floors.filter((floor) => floor._id !== id)); // Remove from UI
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to delete the floor.");
        }
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    }
  };

  // Handle Edit
  const handleEdit = (floor) => {
    setEditMode(true);
    setCurrentFloor({ ...floor }); // Pre-fill the form with current floor data
  };

  // Handle Edit Form Submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://eventsphere-project.vercel.app/floors/${currentFloor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentFloor),
      });

      if (response.ok) {
        const updatedFloor = await response.json();
        console.log(updatedFloor.floor)
        setFloors(floors.map((floor) => (floor._id === updatedFloor.floor._id ? updatedFloor.floor : floor)));
        setEditMode(false);
        setCurrentFloor(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update the floor.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="col-10 mx-auto text-center mt-5">
      <h1 className="text-center text-uppercase font-weight-bold mb-3">Floors</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {warning && <div className="alert alert-warning">{warning}</div>} {/* Display warning */}

      {/* Floor List Table */}
      {!error && floors.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr className="table-info">
              <th>#</th>
              <th>Floor Name</th>
              <th>Total Booths</th>
              <th>Capacity left</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {floors.map((floor, index) => (
              <tr key={floor._id}>
                <td>{index + 1}</td>
                <td>{floor.floor_name}</td>
                <td>{floor.total_booths}</td>
                {/* Display a warning in case the floor has more than 50 booths */}
                {floor.total_booths > 50 && (
                  <td className="text-danger">Exceeded 50 booths</td>
                )}
                <td>{floor.total_booths - floor.no_of_booths}</td> {/* Subtraction here */}
                <td>{new Date(floor.createdAt).toLocaleDateString()}</td>
                <td>{new Date(floor.updatedAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(floor)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(floor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No floors to display.</p>
      )}

      {/* Edit Modal */}
      {editMode && (
        <Modal show={editMode} onHide={() => setEditMode(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Floor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="formFloorName">
                <Form.Label>Floor Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentFloor.floor_name}
                  onChange={(e) =>
                    setCurrentFloor({ ...currentFloor, floor_name: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTotalBooths">
                <Form.Label>Total Booths</Form.Label>
                <Form.Control
                  type="number"
                  value={currentFloor.total_booths}
                  onChange={(e) =>
                    setCurrentFloor({ ...currentFloor, total_booths: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button variant="secondary" onClick={() => setEditMode(false)} className="mr-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Showfloor;
