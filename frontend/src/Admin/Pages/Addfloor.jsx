import React, { useState } from "react";

const AddFloor = () => {
  const [floorName, setFloorName] = useState("");
  const [totalBooths, setTotalBooths] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://eventsphere-project.vercel.app/floors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          floor_name: floorName,
          total_booths: totalBooths,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess("Floor created successfully!");
        setError("");
        setFloorName("");
        setTotalBooths("");
      } else {
        setError(data.message || "Failed to create floor.");
      }
    } catch (err) {
      setError("Error creating floor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="vh-100 mt-5">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase font-weight-bold text-center mb-5">
                      Add a New Floor
                    </h2>

                    {/* Error message */}
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        <p>{error}</p>
                      </div>
                    )}

                    {/* Success message */}
                    {success && (
                      <div className="alert alert-success" role="alert">
                        <p>{success}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="floorNameInput">
                          Floor Name
                        </label>
                        <input
                          type="text"
                          id="floorNameInput"
                          className="form-control form-control-lg"
                          value={floorName}
                          onChange={(e) => setFloorName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label
                          className="form-label"
                          htmlFor="totalBoothsInput"
                        >
                          Total Booths
                        </label>
                        <input
                          type="number"
                          id="totalBoothsInput"
                          className="form-control text-center form-control-lg"
                          value={totalBooths}
                          onChange={(e) => setTotalBooths(e.target.value)}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn3"
                          disabled={loading}
                        >
                          {loading ? "Adding Floor..." : "Add Floor"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddFloor;
