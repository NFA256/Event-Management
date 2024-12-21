import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Modal component
const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [feedback, setfeedback] = useState("");
  const [username, setusername] = useState("");
  const [imageFile, setimageFile] = useState("");
  const [IMG, setIMG] = useState("");
  const [submitBTN, setsubmitBTN] = useState("enabled");

  const handleImageChange = (e) => {
    setIMG(URL.createObjectURL(e.target.files[0])); // Show Image
    setimageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (username === "" || feedback === "" || imageFile === "") {
      alert("Fill the form first!");
      return;
    }

    const formData = new FormData();
    formData.append("feedback", feedback);
    formData.append("username", username);
    formData.append("imageFile", imageFile);

    try {
      setsubmitBTN("disabled")
      const response = await fetch("http://localhost:5000/testimonials", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.status === 201) {
        onSubmit(); // Call the onSubmit prop
        onClose(); // Close the modal after submitting
      setsubmitBTN("enabled")
      setIMG("")
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }

    
  };

  if (!isOpen) return null; // Ensure hooks are still executed before this check

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
            <form id="feedbackForm" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={(e) => setusername(e.target.value)}
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                  onChange={(e) => setfeedback(e.target.value)}
                  className="form-control"
                  id="feedback"
                  rows="4"
                  placeholder="Write your feedback here"
                />
              </div>
              <div className="row mb-3 mt-2">
                <div className="col-8">
                  <div className="form-group">
                    <label htmlFor="feedback">Image</label>
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
                    <img style={{ maxWidth: "120px" }} alt="" className="img-thumbnail" src={IMG} />
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
             type="submit" className="btn btn-primary" form="feedbackForm">
               {
              submitBTN === "disabled"
              ?
            'Submiting ...'
              :'Submit Feedback'
            }
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Testimonial = () => {
  const [TestimonialsData, setTestimonialsData] = useState([])
  useEffect(() => {
      // ----Fetching roles from backend
      const fetchingTestimonials = async () => {
          try {
              const Response = await fetch("http://localhost:5000/testimonials");
              const fetchData = await Response.json()
              if (Response.status === 200) {
                setTestimonialsData(fetchData)
                console.log("testtimonial",TestimonialsData)
              }
          } catch (error) {
              console.log({ "Error": error })
          }

      }
      fetchingTestimonials()
  },[])
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

{
  TestimonialsData.map((data, index)=>{
return (
  <div className="col-lg-4 col-md-6 mb-4 col-sm-7">
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
        <div className="testimonial">
        {data.feedback}
        </div>
        <span className="fas fa-quote-right"></span>
      </div>
    </div>
  </div>)
  })
}

           

           
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
