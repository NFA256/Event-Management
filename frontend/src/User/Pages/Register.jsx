import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const handleCNICInputChange = (e) => {
    let inputValue = e.target.value;
    //----------Remove alphabets
    inputValue = inputValue.replace(/\D/g, '');

    //------------ after 5 numbers a dash added
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5) + '-' + inputValue.slice(5);
    }
    //------------ after 13 numbers a dash added
    if (inputValue.length > 13) {
      inputValue = inputValue.slice(0, 13) + '-' + inputValue.slice(13);
    }
    //-------- Only allow 13 digits (15 characters with the dashes)
    if (inputValue.length <= 15) {
      setCNICno(inputValue);

    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add registration logic here
    console.log("Registration attempt:", formData);
  };

  return (
    <div
      className="d-flex mb-5 justify-content-center align-items-center"
      style={{
        minHeight: "75vh",
      }}
    >
      <div className="container shadow-lg p-5" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <u>
            <h2>Register</h2>
          </u>
        </div>
        <form
          onSubmit={handleSubmit}
          className="form-contact contact_form"
          id="contactForm"
        >
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="name"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="cnic"
              id="cnic"
              type=""
              placeholder="Enter your cnic no"
              value={formData.cnic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <select  className="form-control" 
              name="role"
              id="role" value={formData.role}
              onChange={handleChange}>
<option value="">Select Role</option>
<option value="exhibitor">Exhibitor</option>
<option value="attendee">Attendee</option>
              </select>
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3 text-center">
            <button type="submit" className="btn w-100">
              Register
            </button>
          </div>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-info">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
