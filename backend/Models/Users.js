const mongoose = require("mongoose");

// Define the User Schema
const User_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      match: [
        /^[A-Za-z ]{3,}$/,
        "Name must be at leastxxx 3 characters long and contain only alphabets",
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
        /^\d{5}-\d{7}-\d{1}$/,
        "CNIC format must be 1234-12345678-1",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles", // Reference to the roles collection
      required: [true, "Role is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save middleware to set the default role if not provided
User_Schema.pre("save", async function (next) {
  if (!this.role) {
    const role = await mongoose.model("roles").findOne({ RoleName: "attendee" });
    this.role = role ? role._id : null;
  }
  next(); // Call the next middleware or save the user
});

// Create the User model
const users = mongoose.model("users", User_Schema);

module.exports = users;
