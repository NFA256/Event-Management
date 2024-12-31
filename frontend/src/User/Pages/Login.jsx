import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

// API Endpoint
// http://localhost:5000/users
// http://localhost:5000/forgot-password

const Login = () => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  // Forgot password modal state
  const [IsForgotPassword, setIsForgotPassword] = useState(false);
  const [ForgotEmail, setForgotEmail] = useState("");
  const [ForgotError, setForgotError] = useState("");
  const [ForgotSuccess, setForgotSuccess] = useState("");

  const [IsOTPModal, setIsOTPModal] = useState(false);
  const [OTP, setOTP] = useState("");
  const [OTPError, setOTPError] = useState("");
  const [OTPSuccess, setOTPSuccess] = useState("");

  // ----function for Password visibility
  const [IsPswrdVissible, setIsPswrdVissible] = useState("notVissible");
  const showHidePassword = () => {
    if (IsPswrdVissible === "notVissible") {
      setIsPswrdVissible("yesVissible");
    } else {
      setIsPswrdVissible("notVissible");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (Email && Password) {
      try {
        // API Call
        const response = await fetch("http://localhost:5000/user-login", {
          method: "POST", // Changed to POST
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: Email, password: Password }), // Send email and password
        });
  
        const result = await response.json();
  
        if (response.status === 200) {
          const user = result.data;
  
          // Store user info in localStorage
          if (user.role.RoleName === "admin") {
            localStorage.setItem("user", JSON.stringify({
              isLogin: true,
              role: user.role.RoleName,
              userId: user._id,
              fname: user.name,
              email: user.email,
              NICno: user.cnic
            }));
          } else if (user.role.RoleName === "exhibitor") {
            localStorage.setItem("user", JSON.stringify({
              isLogin: true,
              role: user.role.RoleName,
              userId: user._id,
              fname: user.name,
              email: user.email,
              NICno: user.cnic,
              exhibitorId: user.exhibitorId
            }));
          } else {
            localStorage.setItem("user", JSON.stringify({
              isLogin: true,
              role: user.role.RoleName,
              userId: user._id,
              fname: user.name,
              email: user.email,
              NICno: user.cnic
            }));
          }
  
          setSuccess("Login successful!");
          setTimeout(() => {
            navigate('/');
          }, 200);
        } else if (response.status === 404) {
          setError(result.message); // Display the error message from the backend
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setError("An error occurred while processing your request."); // Handle network or unexpected errors
      }
    } else {
      setError("Please enter Email and password");
    }
  };
  


  // Handle Forgot Password Submit
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!ForgotEmail) {
      setForgotError("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users/email/${ForgotEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setForgotError(data.message || "Error in sending reset email.");
        return;
      }
      const data = await response.json();
      console.log(data);
      setForgotSuccess("Password reset link sent to your email.");
      setForgotError("");
      setIsForgotPassword(false); // Close the modal
      setIsOTPModal(true);
    } catch (error) {
      setForgotError("Network error. Please try again.");
    }
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!OTP) {
      setOTPError("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ForgotEmail, otp: OTP }),
      });

      if (!response.ok) {
        const data = await response.json();
        setOTPError(data.message || "Invalid OTP.");
        return;
      }

      const data = await response.json();
      console.log(data);

      setOTPSuccess(
        "OTP verified successfully. Proceed to reset your password."
      );
      setOTPError("");
      setIsOTPModal(false); // Close the OTP modal
      navigate("/reset-password"); // Navigate to the reset password page
    } catch (error) {
      setOTPError("Network error. Please try again.");
    }
  };

  return (
    <div
      className="d-flex mb-5 justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div className="container shadow-lg p-5" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-4">
          <u>
            <h2>Login</h2>
          </u>
        </div>

        {Error && (
          <div className="alert alert-danger fs-6" role="alert">
            <p>{Error}</p>
          </div>
        )}
        {Success && (
          <div className="alert alert-success fs-6" role="alert">
            <p>{Success}</p>
          </div>
        )}

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
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group form-group mb-3">
            <input
              className="form-control"
              name="password"
              id="password"
              type={IsPswrdVissible === "yesVissible" ? "text" : "password"}
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={showHidePassword}
              className="input-group-text"
              style={{ cursor: "pointer" }}
            >
              <i
                className={
                  IsPswrdVissible === "yesVissible"
                    ? "fas fa-eye-slash"
                    : "fas fa-eye"
                }
              ></i>
            </span>
          </div>

          <div className="mb-3">
            <Link
              to="#"
              onClick={() => setIsForgotPassword(true)}
              className="text-end text-info"
            >
              Forgot password?
            </Link>
          </div>

          <div className="form-group mt-3 text-center">
            <button type="submit" className="btn3 w-100">
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

      {/* Forgot Password Modal */}
      {IsForgotPassword && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forgot Password</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsForgotPassword(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {ForgotError && (
                  <div className="alert alert-danger fs-6">{ForgotError}</div>
                )}
                {ForgotSuccess && (
                  <div className="alert alert-success fs-6">
                    {ForgotSuccess}
                  </div>
                )}
                <form onSubmit={handleForgotPasswordSubmit}>
                  <div className="form-group mb-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter your email to reset password"
                      value={ForgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn w-100">
                      Send Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* OTP Modal */}
      {IsOTPModal && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter OTP</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsOTPModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {OTPError && (
                  <div className="alert alert-danger fs-6">{OTPError}</div>
                )}
                {OTPSuccess && (
                  <div className="alert alert-success fs-6">{OTPSuccess}</div>
                )}
                <form onSubmit={handleOTPSubmit}>
                  <div className="form-group mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter OTP"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn w-100">
                      Verify OTP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
