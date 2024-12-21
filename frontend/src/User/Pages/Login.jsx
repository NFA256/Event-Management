import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
// API
// http://localhost:5000/users


const Login = () => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
 // ----function for Password visiblity 
 const [IsPswrdVissible, setIsPswrdVissible] = useState('notVissible')
 const showHidePassword = () => {
   // ----- checking if the state of password is vissible or not vissible
   if (IsPswrdVissible == "notVissible") {
     setIsPswrdVissible("yesVissible") //---setting the state of passwrd vissiblity
   }
   else {
     setIsPswrdVissible("notVissible")//---setting the state of passwrd vissiblity
   }
 }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email && Password) {
      try {
        // API Call
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        // Log response for debugging
        const users = await response.json();
        console.log("Users:", users); // This logs the entire response object

        // Ensure that we're working with the array inside 'data'
        const user = users.data.find(
          (user) => user.email === Email 
        );
        console.log("User found:", user); // Log found user
        
        if (user) {
          const match = await bcrypt.compare(Password, user.password);
          if(!match){
            setError("Invalid Email or password");
      return;
    }
          setSuccess("Login Successful");
          setError("");

          // User ka sara data localStorage mein save karein
          localStorage.setItem("user", JSON.stringify(user));

          // Navigate to Dashboard or Home Page
          navigate("/");
        } else {
          setError("Invalid Email or password");
          setSuccess("");
        }
      } catch (error) {
        console.error("Login Error:", error);
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Please enter Email and password");
    }
  };

  return (
    <div
      className="d-flex mb-5 justify-content-center align-items-center"
      style={{
        minHeight: "70vh",
      }}
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
              type={IsPswrdVissible == "yesVissible"
                ? "text"
                : "password"}
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
              <span onClick={() => showHidePassword()} className=" input-group-text" style={{ cursor: "pointer" }}>
              <i class="fas fa-eye"
                className={
                  IsPswrdVissible == "yesVissible"
                    ? "fas fa-eye-slash"
                    : "fas fa-eye"}
              ></i>
            </span>
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
