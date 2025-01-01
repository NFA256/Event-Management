import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// -----User API
// API
// https://eventsphere-project.vercel.app/users

// -----Role API
// API
// https://eventsphere-project.vercel.app/roles

const Register = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Cnic, setCnic] = useState("");
  const [Password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");


  const [IsPswrdVissible, setIsPswrdVissible] = useState('notVissible')
  const showHidePassword = () => {
    // ----- checking if the state of password is vissible or not vissible
    if (IsPswrdVissible === "notVissible") {
      setIsPswrdVissible("yesVissible") //---setting the state of passwrd vissiblity
    }
    else {
      setIsPswrdVissible("notVissible")//---setting the state of passwrd vissiblity
    }
  }
  // -----function for Confrm Password visiblity 
  const [IsCPswrdVissible, setIsCPswrdVissible] = useState('notVissible')
  const showHideCPassword = () => {
    // ----- checking if the state of password is vissible or not vissible
    if (IsCPswrdVissible === "notVissible") {
      setIsCPswrdVissible("yesVissible")//---setting the state of passwrd vissiblity
    }
    else {
      setIsCPswrdVissible("notVissible") //---setting the state of passwrd vissiblity
    }
  }
  const handleCnicChange = (e) => {
    let inputValue = e.target.value;
  
    // Remove all non-numeric characters
    inputValue = inputValue.replace(/\D/g, "");
  
    // Enforce the correct CNIC format: 1234-1234567-1
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5) + "-" + inputValue.slice(5);
    }
    if (inputValue.length > 13) {
      inputValue = inputValue.slice(0, 13) + "-" + inputValue.slice(13);
    }
  
    // Only allow valid CNIC length
    if (inputValue.length <= 15) {
      setCnic(inputValue);
    }
  };
  

  // Update the CNIC when the user moves away from the field
  const handleBlur = () => {
    // const formattedCnic = formatCnic(Cnic);
    // setCnic(formattedCnic); // Apply the formatted CNIC
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Format CNIC before submission
    // const formattedCnic = formatCnic(Cnic); // Apply the formatting function
let passwordreg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/

    // Validate inputs
    if (Name === "" || Name.length < 3) {
      setError("Username is not valid");
      return;
    }
    if (Email === "" || Email.length < 5) {
      setError("Email is not valid");
      return;
    }
    if (Password === "" || !passwordreg.test(Password)) {
      setError("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character");
      return;
    }
    if (Cpassword !== Password) {
      setError("Password must be equal to Confirm Password");
      return;
    }
    // console.log("Fetched Roles:", GetRoles); // Add this log to verify

    // Create user object
    const newUser = {
      name: Name,
      email: Email,
      password: Password,
      cnic: Cnic, // Adding CNIC to the user object
    };
    console.log("Sending User Data:", newUser);

    // Send user data to backend
    try {
      const response = await fetch("https://eventsphere-project.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.status !== 201) {
        const errorData = await response.json();
        console.log("Error Response:", errorData);
        setError(errorData.message || "Failed to register the user.");
      } else {
        setSuccess("Account Registered Successfully !!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while registering the user.");
    }
  };

  return (
    <div
      className="d-flex mb-5 justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="container shadow-lg p-5" style={{ maxWidth: "550px" }}>
        <div className="text-center mb-4">
          <u>
            <h2>Register</h2>
          </u>
        </div>
        {Error && (
          <div className="alert alert-danger" role="alert">
            <p>{Error}</p>
          </div>
        )}
        {Success && (
          <div className="alert alert-success" role="alert">
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
              name="name"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
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
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="cnic"
              id="cnic"
              type="text"
              placeholder="Enter your CNIC (XXXXX-XXXXXXX-X)"
              value={Cnic}
              onChange={handleCnicChange}
              onBlur={handleBlur} // Apply formatting when the input loses focus
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
              onClick={() => showHidePassword()}
              className=" input-group-text"
              style={{ cursor: "pointer" }}
            >
              <i
                class="fas fa-eye"
                className={
                  IsPswrdVissible === "yesVissible"
                    ? "fas fa-eye-slash"
                    : "fas fa-eye"
                }
              ></i>
            </span>
          </div>
          <div className="form-group input-group mb-3">
            <input
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              type={IsCPswrdVissible === "yesVissible" ? "text" : "password"}
              placeholder="Confirm your password"
              value={Cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              required
            />
            <span
              onClick={() => showHideCPassword()}
              className=" input-group-text"
              style={{ cursor: "pointer" }}
            >
              <i
                class="fas fa-eye"
                className={
                  IsCPswrdVissible === "yesVissible"
                    ? "fas fa-eye-slash"
                    : "fas fa-eye"
                }
              ></i>
            </span>
          </div>

          <div className="form-group mt-3 text-center">
            <button type="submit" className="btn3 w-100">
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
