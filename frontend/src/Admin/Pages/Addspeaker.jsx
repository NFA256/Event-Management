import React, { useState } from "react";

const Addspeaker = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Show image preview
      setImage(file); // Set the file to state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/speakers", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setError("");
        setSuccess("Speaker added successfully!");
        setName("");
        setDescription("");
        setImage(null);
        setPreviewImage("");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const result = await response.json();
        setError(
          result.message || "An error occurred while adding the speaker."
        );
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create a Speaker
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

                    <form
                      id="speakerForm"
                      method="post"
                      encType="multipart/form-data"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                        <input
                          type="text"
                          id="description"
                          className="form-control form-control-lg"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="row mb-3 mt-2">
                        <div className="col-8">
                          <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                              name="image"
                              id="image"
                              type="file"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          {previewImage ? (
                            <img
                              style={{ maxWidth: "120px" }}
                              alt="Preview"
                              className="img-thumbnail"
                              src={previewImage}
                            />
                          ) : (
                            <div
                              style={{
                                backgroundColor: "#98939378",
                                width: "100px",
                                height: "100px",
                                color: "grey",
                                fontSize: "13px",
                              }}
                              className="px-3 py-4 text-center"
                            >
                              No Image Selected
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn text-white btn-block"
                        >
                          Add Speaker
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

export default Addspeaker;
