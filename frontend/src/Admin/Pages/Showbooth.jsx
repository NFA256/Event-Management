import React, { useState, useEffect } from "react";
import Book from "../Pages/Book";

// Modal Component for editing booth details
const EditBoothModal = ({ show, booth, floors, onClose, onEdit }) => {
  const [boothName, setBoothName] = useState(booth?.name || "");
  const [reservedStatus, setReservedStatus] = useState(booth?.reserved_bool || false);
  const [floorId, setFloorId] = useState(booth?.floor_id?._id || "");

  useEffect(() => {
    if (booth) {
      setBoothName(booth?.name || "");
      setReservedStatus(booth?.reserved_bool || false);
      setFloorId(booth?.floor_id?._id || "");
    }
  }, [booth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (booth) {
      const updatedBooth = {
        ...booth,
        name: boothName,
        reserved_bool: reservedStatus,
        floor_id: floorId,
      };
      onEdit(updatedBooth);
    }
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Booth</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {booth ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Booth Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={boothName}
                    onChange={(e) => setBoothName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Reserved Status</label>
                  <select
                    className="form-control"
                    value={reservedStatus}
                    onChange={(e) => setReservedStatus(e.target.value === "true")}
                  >
                    <option value={true}>Reserved</option>
                    <option value={false}>Available</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Floor</label>
                  <select
                    className="form-control"
                    value={floorId}
                    onChange={(e) => setFloorId(e.target.value)}
                  >
                    <option value="">Select Floor</option>
                    {floors.map((floor) => (
                      <option key={floor._id} value={floor._id}>
                        {floor.floor_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Booth
                </button>
              </form>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Showbooth = () => {
  const [booths, setBooths] = useState([]);
  const [floors, setFloors] = useState([]);
  const [error, setError] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState(null);

  useEffect(() => {
    const fetchBoothsAndFloors = async () => {
      try {
        const boothResponse = await fetch("http://localhost:5000/booths");
        const floorResponse = await fetch("http://localhost:5000/floors");

        const boothData = await boothResponse.json();
        const floorData = await floorResponse.json();

        if (boothResponse.ok && floorResponse.ok) {
          if (Array.isArray(boothData) && Array.isArray(floorData)) {
            setBooths(boothData);
            setFloors(floorData);
          } else {
            setError("No booths or floors found.");
          }
        } else {
          const errorData = await boothResponse.json();
          setError(errorData.message || "Failed to fetch booths.");
        }
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    };

    fetchBoothsAndFloors();
  }, []); // Re-fetch booths on initial render or whenever needed.

  const refreshBooths = async () => {
    const boothResponse = await fetch("http://localhost:5000/booths");
    if (boothResponse.ok) {
      const boothData = await boothResponse.json();
      setBooths(boothData);
    }
  };

  // Function to handle booth update
  const handleEditBooth = async (updatedBooth) => {
    try {
      const response = await fetch(`http://localhost:5000/booths/${updatedBooth._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBooth),
      });

      const data = await response.json();
      if (response.ok) {
        refreshBooths();
        setShowEditModal(false);
      } else {
        setError(data.message || "Failed to update booth.");
      }
    } catch (error) {
      setError("Error updating booth.");
    }
  };

  // Function to handle booth deletion
  const handleDeleteBooth = async (boothId) => {
    if (window.confirm("Are you sure you want to delete this booth?")) {
      try {
        const response = await fetch(`http://localhost:5000/booths/${boothId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
          refreshBooths(); // Refresh the booth list after deletion
        } else {
          setError(data.message || "Failed to delete booth.");
        }
      } catch (error) {
        setError("Error deleting booth.");
      }
    }
  };

  return (
    <div className="col-10 mx-auto text-center mt-5">
      <h1 className="text-center text-uppercase font-weight-bold mb-3">Booths</h1>

      {/* Show Booking Table (conditional render) */}
      {showBooking ? (
        <Book refreshBooths={refreshBooths} />
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          {!error && booths.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr className="table-info">
                  <th>#</th>
                  <th>Booth Name</th>
                  <th>Floor Name</th>
                  <th>Reserved Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {booths.map((booth, index) => (
                  <tr key={booth._id}>
                    <td>{index + 1}</td>
                    <td>{booth.name}</td>
                    <td>{booth.floor_id?.floor_name || "N/A"}</td>
                    <td
                      className={booth.reserved_bool ? "text-danger" : "text-success"}
                    >
                      {booth.reserved_bool ? "Reserved" : "Available"}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setSelectedBooth(booth);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => handleDeleteBooth(booth._id)} // Call delete handler
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !error && <p>No booths to display.</p>
          )}
        </>
      )}

      {/* Modal for editing booth */}
      <EditBoothModal
        show={showEditModal}
        booth={selectedBooth}
        floors={floors}
        onClose={() => setShowEditModal(false)}
        onEdit={handleEditBooth}
      />
    </div>
  );
};

export default Showbooth;
