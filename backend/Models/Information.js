const mongoose = require("mongoose");

const Information_Schema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    contact: {
      type: String,
      required: [true, "Contact person is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

// Create and export the model
const informations = mongoose.model("informations", Information_Schema);

module.exports = informations;
