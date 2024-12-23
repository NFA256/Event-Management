import React, { useState, useEffect } from "react";

const Showbooth = () => {
  const [booths, setBooths] = useState([]);
  const [floors, setFloors] = useState([]); // To store floor data with total booths
  const [error, setError] = useState("");

  // Fetch booth and floor data from API
  useEffect(() => {
    const fetchBooths = async () => {
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

    fetchBooths();
  }, []);

  const handleReserveBooth = (boothId, floorId) => {
    // Find the booth and update the status to reserved
    const updatedBooths = booths.map((booth) => {
      if (booth._id === boothId) {
        return { ...booth, reserved_bool: true }; // Update the reserved status
      }
      return booth;
    });

    // Find the floor and decrement the total_booths available
    const updatedFloors = floors.map((floor) => {
      if (floor._id === floorId && floor.total_booths > 0) {
        return { ...floor, total_booths: floor.total_booths - 1 };
      }
      return floor;
    });

    setBooths(updatedBooths);
    setFloors(updatedFloors);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Booth Records</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && booths.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Booth Name</th>
              <th>Floor Name</th>
              <th>Reserved Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booths.map((booth, index) => (
              <tr key={booth._id}>
                <td>{index + 1}</td>
                <td>{booth.name}</td>
                <td>{booth.floor_id?.floor_name || "N/A"}</td>
                <td>{booth.reserved_bool ? "Reserved" : "Available"}</td>
                <td>
                  {!booth.reserved_bool && (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleReserveBooth(booth._id, booth.floor_id._id)
                      }
                    >
                      Reserve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No booths to display.</p>
      )}
    </div>
  );
};

export default Showbooth;
