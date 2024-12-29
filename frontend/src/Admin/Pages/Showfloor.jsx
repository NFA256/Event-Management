import React, { useState, useEffect } from "react";

const Showfloor = () => {
  const [floors, setFloors] = useState([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState(""); // For warning about booth limit

  // Fetch floor data from API
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await fetch("http://localhost:5000/floors");
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

  return (
    <div className="col-10 mx-auto text-center  mt-5">
      <h1 className="text-center text-uppercase font-weight-bold mb-3">
        Floors
      </h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {warning && <div className="alert alert-warning">{warning}</div>}{" "}
      {/* Display warning */}
      {!error && floors.length > 0 ? (
        <table className="table  table-bordered">
          <thead>
            <tr className="table-info">
              <th>#</th>
              <th>Floor Name</th>
              <th>Total Booths</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {floors.map((floor, index) => (
              <tr key={floor._id}>
                <td>{index + 1}</td>
                <td>{floor.floor_name}</td> {/* Floor name */}
                <td>{floor.total_booths}</td> {/* Total booths */}
                {/* Display a warning in case the floor has more than 50 booths */}
                {floor.total_booths > 50 && (
                  <td className="text-danger">Exceeded 50 booths</td>
                )}
                <td>{new Date(floor.createdAt).toLocaleDateString()}</td>{" "}
                {/* Created date */}
                <td>{new Date(floor.updatedAt).toLocaleDateString()}</td>{" "}
                {/* Updated date */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No floors to display.</p>
      )}
    </div>
  );
};

export default Showfloor;
