import React, { useEffect, useState } from "react";

const Contact = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // API endpoint for saving contact data
  const contactApiUrl = "http://localhost:5000/contacts";

  useEffect(() => {
    // Local storage se user ka data fetch karna
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.fname); // Local storage ka name field
      setUserEmail(storedUser.email); // Local storage ka email field
      setIsLoggedIn(true); // User logged in hai
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userName && userEmail && subject && message) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser ? storedUser.userId : null; // Get userId if logged in

        // Sending the contact data to the backend
        const response = await fetch(contactApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId, // User ID from localStorage (if logged in)
            subject: subject,
            message: message,
          }),
        });

        const result = await response.json();

        // Check if the response is OK and has a success message
        if (response.ok) {
          alert(result.message || "Message sent successfully!"); // Show the success message from backend

          // Reset form fields after success

          setSubject("");
          setMessage("");
        } else {
          console.error("Backend error:", result.message || "Unknown error");
          alert(result.message || "Failed to send the message.");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        alert(`An error occurred: ${error.message || "Unknown error"}`);
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <>
      <main>
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 text-center">
                    <h2>Contact Us</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Get in Touch</h2>
              </div>
              <div className="col-lg-8">
                <form
                  className="form-contact contact_form"
                  id="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control w-100"
                          name="message"
                          id="message"
                          cols="30"
                          rows="9"
                          placeholder="Enter Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control valid"
                          name="name"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          readOnly={isLoggedIn}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control valid"
                          name="email"
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          readOnly={isLoggedIn}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="subject"
                          id="subject"
                          type="text"
                          placeholder="Enter Subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3 float-end">
                    <button
                      type="submit"
                      className="button button-contactForm boxed-btn "
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-3 offset-lg-1">
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-home"></i>
                  </span>
                  <div className="media-body">
                    <h3>Buttonwood, California.</h3>
                    <p>Rosemead, CA 91770</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-tablet"></i>
                  </span>
                  <div className="media-body">
                    <h3>+1 253 565 2365</h3>
                    <p>Mon to Fri 9am to 6pm</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-email"></i>
                  </span>
                  <div className="media-body">
                    <h3>support@colorlib.com</h3>
                    <p>Send us your query anytime!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
