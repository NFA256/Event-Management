import React, { useState, useEffect } from "react";

const AddBooth = () => {
  const [GetFloor, setFloor] = useState([]);
  const [floor_id, setFloorId] = useState("");
  // const [reserved_bool, setReservedBool] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  useEffect(() => {
    async function GetFloorData() {
      try {
        const response = await fetch("https://eventsphere-project.vercel.app/floors");
        if (response.status === 200) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setFloor(data);
          } else {
            setError("Received data is not an array.");
          }
        } else {
          setError("Failed to fetch floor data.");
        }
      } catch (err) {
        setError("Error fetching data.");
      }
    }

    GetFloorData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://eventsphere-project.vercel.app/booths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ floor_id, name }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Booth created successfully!");
        setMessage("");
        setFloorId("");
        // setReservedBool(false);
        setName("");
      } else {
        setError(data.message || "Failed to create booth.");
      }
    } catch (err) {
      setError("Error creating booth.");
    }
  };

  return (
    <section className="vh-100 mt-5">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h1 className="text-uppercase font-weight-bold text-center mb-5">
                    Add New Booth
                  </h1>
                  {/* Error message */}
                  {Error && (
                    <div className="alert alert-danger" role="alert">
                      <p>{Error}</p>
                    </div>
                  )}

                  {/* Success message */}
                  {Success && (
                    <div className="alert alert-success" role="alert">
                      <p>{Success}</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    {/* Floor selection */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="floor">
                        Select Floor
                      </label>
                      <select
                        className="form-control text-center"
                        value={floor_id}
                        onChange={(e) => setFloorId(e.target.value)}
                        required
                      >
                        <option value="">Choose Floor</option>
                        {Array.isArray(GetFloor) && GetFloor.length > 0 ? (
                          GetFloor.map((floor) => (
                            <option key={floor._id} value={floor._id}>
                              {floor.floor_name} {/* Displaying floor name */}
                            </option>
                          ))
                        ) : (
                          <option disabled>No floors available</option>
                        )}
                      </select>
                    </div>

                    {/* Booth Name input */}
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn3 ">
                      Create Booth
                    </button>
                  </form>

                  {/* Display message */}
                  {message && <p>{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddBooth;
