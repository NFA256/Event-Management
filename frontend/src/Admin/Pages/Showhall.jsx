import React, { useEffect, useState } from "react";


const Showhall = () => {
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hall Records</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && halls.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Hall Name</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall, index) => (
              <tr key={hall._id}>
                <td>{index + 1}</td>
                <td>{hall.hall_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No halls to display.</p>
      )}
    </div>
  );
};

export default Showhall