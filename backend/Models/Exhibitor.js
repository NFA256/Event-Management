const mongoose = require("mongoose");

const Exhibitor_Schema = mongoose.Schema(
  {
    company_id: {
      type: String,
      required: [true, "Company ID is required"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact information is required"],
      match: [
        /^\+?[1-9]\d{0,10}$/, // Allows numbers with up to 11 digits (optionally with a "+" prefix)
        "Please provide a valid contact number (e.g., +12345678901 or 12345678901)",
      ],
    },
    product: {
      type: String,
      required: [true, "Product is required"],
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the user collection
      required: [true, "User ID is required"],
    },
    booth_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booth", // Reference to the booth collection
      required: [true, "Booth ID is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Exhibitor model
const exhibitors = mongoose.model("exhibitors", Exhibitor_Schema);

module.exports = exhibitors;
