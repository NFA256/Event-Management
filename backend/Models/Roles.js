const mongoose = require("mongoose");

const Roles_Schema = mongoose.Schema(
  {
    RoleName: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
      trim: true, // Optional: removes extra spaces from the role name
    },
    Status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["active", "unactive"],
      default: "active", // Default status is "active"
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model
const roles_tb = mongoose.model("roles", Roles_Schema);

module.exports = roles_tb;