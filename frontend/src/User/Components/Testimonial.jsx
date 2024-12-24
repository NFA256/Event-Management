import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Modal component
const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [IMG, setIMG] = useState("");
  const [submitBTN, setSubmitBTN] = useState("enabled");

  const handleImageChange = (e) => {
    setIMG(URL.createObjectURL(e.target.files[0])); // Show Image Preview
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || feedback === "" || !imageFile) {
      alert("Fill the form first!");
      return;
    }

    const formData = new FormData();
    formData.append("feedback", feedback);
    formData.append("username", username);
    formData.append("imageFile", imageFile);

    try {
      setSubmitBTN("disabled");
      const response = await fetch("http://localhost:5000/testimonials", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.status === 201) {
        onSubmit(result); // Pass the result (new testimonial) to the parent
        onClose(); // Close the modal after submitting
        setSubmitBTN("enabled");
        setIMG(""); // Reset Image preview
        setFeedback(""); // Reset form state
        setUsername(""); // Reset form state
      } else {
        console.log(result.error);
        alert("Failed to submit the feedback.");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share Your Feedback</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form
              id="feedbackForm"
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your name"
                  value={username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                  onChange={(e) => setFeedback(e.target.value)}
                  className="form-control"
                  id="feedback"
                  rows="4"
                  placeholder="Write your feedback here"
                  value={feedback}
                />
              </div>
              <div className="row mb-3 mt-2">
                <div className="col-8">
                  <div className="form-group">
                    <label htmlFor="imageFile">Image</label>
                    <input
                      name="imageFile"
                      onChange={handleImageChange}
                      type="file"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-4">
                  {IMG ? (
                    <img
                      style={{ maxWidth: "120px" }}
                      alt="Preview"
                      className="img-thumbnail"
                      src={IMG}
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
                      No Image selected
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
            <button
              disabled={submitBTN === "disabled"}
              type="submit"
              className="btn btn-primary"
              form="feedbackForm"
            >
              {submitBTN === "disabled" ? "Submitting ..." : "Submit Feedback"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const [TestimonialsData, setTestimonialsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchingTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5000/testimonials");
        const fetchData = await response.json();
        if (response.status === 200) {
          // Sort testimonials by createdAt in descending order
          const sortedData = fetchData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setTestimonialsData(sortedData.slice(0, 3)); // Only take the last 3 records
        }
      } catch (error) {
        console.log({ Error: error });
      }
    };
    fetchingTestimonials();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackSubmit = (newTestimonial) => {
    // Add the newly submitted testimonial to the list and maintain only the last 3
    setTestimonialsData((prevData) => {
      const updatedData = [newTestimonial, ...prevData];
      // Keep only the latest 3 testimonials
      return updatedData.slice(0, 3);
    });
  };

  return (
    <>
      <section className="slider-area2 text-center">
        <br />
        <div className="section-tittle section-tittle2 mb-50">
          <h2>Testimonial.</h2>
        </div>
        <div className="container col-8 text-center mt-5">
          <div className="row justify-content-center">
            {TestimonialsData.map((data, index) => (
              <div
                className="col-lg-4 col-md-6 mb-4 col-sm-7"
                key={data.id || index}
              >
                <div className="card2">
                  <div className="face front-face">
                    <img
                      src={data.image}
                      alt=""
                      className="profile rounded-circle img-fluid"
                    />
                    <div className="pt-3 text-uppercase name">
                      {data.username}
                    </div>
                  </div>
                  <div className="face back-face">
                    <span className="fas fa-quote-left"></span>
                    <div className="testimonial">{data.feedback}</div>
                    <span className="fas fa-quote-right"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-tittle section-tittle2">
          <p>
            Wanna Share Your Experience? <br />
            <button
              className="btn-outline-info text-white btn-md"
              onClick={openModal}
            >
              Share Feedback
            </button>
          </p>
        </div>
        <br />
      </section>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  );
};

export default Testimonial;
