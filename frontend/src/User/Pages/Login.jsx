import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div
      className="d-flex mb-5 justify-content-center align-items-center"
      style={{
        minHeight: "65vh",
      }}
    >
      <div className="container shadow-lg p-5" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <u>
            <h2>Login</h2>
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
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <input
              className="form-control"
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className=" mb-3">
            <Link to="#" className="text-end text-info">
              Forgot password?
            </Link>
          </div>

          <div className="form-group mt-3 text-center">
            <button type="submit" className="btn  w-100">
              Login
            </button>
          </div>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-info">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
