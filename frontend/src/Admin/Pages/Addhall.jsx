import React, { useState } from "react";

const AddHall = () => {
  const [hallName, setHallName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hallName.trim()) {
      setError("Hall name is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/halls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hall_name: hallName }),
      });

      if (res.status === 201) {
        setSuccess("Hall added successfully.");
        setError("");
        setHallName("");
      } else {
        const result = await res.json();
        setError(result.message || "Failed to add hall.");
        setSuccess("");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Add a New Hall
                  </h2>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <p>{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert">
                      <p>{success}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="hallNameInput">
                        Hall Name
                      </label>
                      <input
                        type="text"
                        id="hallNameInput"
                        className="form-control form-control-lg"
                        value={hallName}
                        onChange={(e) => setHallName(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        disabled={loading}
                      >
                        {loading ? "Adding Hall..." : "Add Hall"}
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
  );
};

export default AddHall;
