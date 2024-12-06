const mongoose = require("mongoose");

// Define the User Schema
const User_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    cnic: {
      type: String,
      required: [true, "CNIC is required"],
      unique: true,
      match: [/^[0-9]{11}$/, "Please provide a valid 11-digit CNIC"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character",
      ],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles", // Reference to the roles collection
      required: [true, "Role is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the User model
const users = mongoose.model("users", User_Schema);

module.exports = users;
