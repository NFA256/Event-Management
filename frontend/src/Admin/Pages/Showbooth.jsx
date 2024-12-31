import React, { useState, useEffect } from "react";
import Book from "../Pages/Book";

const Showbooth = () => {
  const [booths, setBooths] = useState([]);
  const [floors, setFloors] = useState([]);
  const [error, setError] = useState("");
  const [showBooking, setShowBooking] = useState(false); // New state to control display

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
  }, []); // Re-fetch booths on initial render or whenever needed.

  const refreshBooths = async () => {
    const boothResponse = await fetch("http://localhost:5000/booths");
    if (boothResponse.ok) {
      const boothData = await boothResponse.json();
      setBooths(boothData);
    }
  };

  return (
    <div className="col-10 mx-auto text-center mt-5">
      <h1 className="text-center text-uppercase font-weight-bold mb-3">
        Booths
      </h1>

      {/* Show Booking Table (conditional render) */}
      {showBooking ? (
        <Book refreshBooths={refreshBooths} />
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          {!error && booths.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr className="table-info ">
                  <th>#</th>
                  <th>Booth Name</th>
                  <th>Floor Name</th>
                  <th>Reserved Status</th>
                </tr>
              </thead>
              <tbody>
                {booths.map((booth, index) => (
                  <tr key={booth._id}>
                    <td>{index + 1}</td>
                    <td>{booth.name}</td>
                    <td>{booth.floor_id?.floor_name || "N/A"}</td>
                    <td
                      className={
                        booth.reserved_bool ? "text-danger" : "text-success"
                      }
                    >
                      {booth.reserved_bool ? "Reserved" : "Available"}
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
    </div>
  );
};

export default Showbooth;
