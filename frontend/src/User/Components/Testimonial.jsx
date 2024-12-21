import React, { useState } from "react";

// Modal component
const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    onSubmit(); // Call the onSubmit prop passed from the parent component
    onClose(); // Close the modal after submitting
  };

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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                  className="form-control"
                  id="feedback"
                  rows="4"
                  placeholder="Write your feedback here"
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              form="feedbackForm"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackSubmit = () => {
    // Alert the user with a thank you message
    alert("Thank you for your feedback!");
  };

  return (
    <>
      <section className="slider-area2 text-center">
        <br />
        {/* <!-- Heading --> */}
        <div className="section-tittle section-tittle2 mb-50">
          <h2>Testimonial.</h2>
        </div>
        {/* <!-- Card Container --> */}
        <div className="container col-8 text-center mt-5">
          <div className="row justify-content-center">
            {/* <!-- Card 1 --> */}
            <div className="col-lg-4 col-md-6 mb-4 col-sm-7">
              <div className="card2">
                <div className="face front-face">
                  <img
                    src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                    alt=""
                    className="profile rounded-circle img-fluid"
                  />
                  <div className="pt-3 text-uppercase name">
                    Robert Garrison
                  </div>
                </div>
                <div className="face back-face">
                  <span className="fas fa-quote-left"></span>
                  <div className="testimonial">
                    I made back the purchase price in just 48 hours! Thank you
                    for making it painless and pleasant. The service was
                    excellent. I will refer everyone I know.
                  </div>
                  <span className="fas fa-quote-right"></span>
                </div>
              </div>
            </div>

            {/* <!-- Card 2 --> */}
            <div className="col-lg-4 col-md-6 mb-4 col-sm-7">
              <div className="card2">
                <div className="face front-face">
                  <img
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt=""
                    className="profile rounded-circle img-fluid"
                  />
                  <div className="pt-3 text-uppercase name">Jeffery Kennan</div>
                </div>
                <div className="face back-face">
                  <span className="fas fa-quote-left"></span>
                  <div className="testimonial">
                    Really good, you have saved our business! I made back the
                    purchase price in just 48 hours! Man, this thing is getting
                    better and better as I learn more about it.
                  </div>
                  <span className="fas fa-quote-right"></span>
                </div>
              </div>
            </div>

            {/* <!-- Card 3 --> */}
            <div className="col-lg-4 col-md-6 col-sm-7 mb-4">
              <div className="card2">
                <div className="face front-face">
                  <img
                    src="https://images.unsplash.com/photo-1614574762522-6ac2fbba2208?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjY2fHxtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    className="profile rounded-circle img-fluid"
                  />
                  <div className="pt-3 text-uppercase name">Issac Maxwell</div>
                </div>
                <div className="face back-face">
                  <span className="fas fa-quote-left"></span>
                  <div className="testimonial">
                    Account keeper is the most valuable business research we
                    have EVER purchased. Without an electrician, we would have
                    gone bankrupt by now.
                  </div>
                  <span className="fas fa-quote-right"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-tittle section-tittle2 ">
          <p>
            Wanna Share Your Experience? <br />
            <button
              className=" btn-outline-info text-white btn-md "
              onClick={openModal}
            >
              Share Feedback
            </button>
          </p>
        </div>
        <br />
      </section>

      {/* Modal Component */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  );
};

export default Testimonial;
