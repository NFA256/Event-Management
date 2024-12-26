import React, { useState, useEffect, useRef } from "react";

const Showspeaker = () => {
  const [speakers, setSpeakers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Reference for the modal element
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch("http://localhost:5000/speakers");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setSpeakers(data);
          } else {
            console.error("API response is not an array:", data);
            setSpeakers([]);
          }
        } else {
          console.error("Failed to fetch speakers");
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };
    fetchSpeakers();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleShowModal = () => {
    // Make sure the modal is rendered before trying to show it
    setTimeout(() => {
      if (modalRef.current) {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
        setModalOpen(true);
      }
    }, 0);
  };

  const handleHideModal = () => {
    if (modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.hide();
      setModalOpen(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setPreviewImage("");
    setEditMode(false);
    setCurrentSpeaker(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || (!image && !editMode)) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editMode) {
        const url = `http://localhost:5000/speakers/${currentSpeaker._id}`;
        const response = await fetch(url, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          const updatedSpeaker = await response.json();
          setSpeakers((prevSpeakers) =>
            prevSpeakers.map((speaker) =>
              speaker._id === currentSpeaker._id ? updatedSpeaker : speaker
            )
          );
          setSuccess("Speaker updated successfully!");
          setTimeout(() => setSuccess(""), 3000);
          resetForm();
          handleHideModal();
        } else {
          const result = await response.json();
          setError(result.message || "An error occurred.");
        }
      } else {
        setError("You can only update speakers in edit mode.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/speakers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSpeakers((prevSpeakers) =>
          prevSpeakers.filter((speaker) => speaker._id !== id)
        );
        setSuccess("Speaker deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to delete speaker.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    }
  };

  const handleEdit = (speaker) => {
    setEditMode(true);
    setCurrentSpeaker(speaker);
    setName(speaker.name);
    setDescription(speaker.description);
    setPreviewImage(speaker.image);
    handleShowModal();
  };

  return (
    <div>
      <div className="container mt-5">
        <h3 className="text-center">Speakers List</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(speakers) && speakers.length > 0 ? (
              speakers.map((speaker, index) => (
                <tr key={speaker._id}>
                  <td>{index + 1}</td>
                  <td>{speaker.name}</td>
                  <td>{speaker.description}</td>
                  <td>
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      style={{ maxWidth: "80px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-warning btn-md mx-2 "
                      onClick={() => handleEdit(speaker)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-md "
                      onClick={() => handleDelete(speaker._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No speakers available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal code with ref */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-hidden={!modalOpen}
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Speaker
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleHideModal}
              ></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="modal-name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="modal-description">
                    Description
                  </label>
                  <input
                    type="text"
                    id="modal-description"
                    className="form-control form-control-lg"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="row mb-3 mt-2">
                  <div className="col-8">
                    <div className="form-group">
                      <label htmlFor="modal-image">Image</label>
                      <input
                        name="image"
                        id="modal-image"
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
                  <button type="submit" className="btn3">
                    Update Speaker
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showspeaker;
