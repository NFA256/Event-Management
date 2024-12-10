const mongoose = require("mongoose");

// Define the User Schema
const User_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      match: [
        /^[A-Za-z]{3,}$/,
        "Name must be at least 3 characters long and contain only alphabets",
      ],
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
      match: [
        /^\d{4}-\d{7}-\d{1}$/,
        "CNIC format must be 1234-1234567-1",
      ],
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
