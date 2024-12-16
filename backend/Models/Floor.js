const mongoose = require("mongoose");

const Floor_Schema = mongoose.Schema(
  {
    hall_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "halls", // Reference to the halls collection
      required: [true, "Hall ID is required"],
    },
    total_halls: {
      type: Number,
      required: [true, "Total halls are required"],
      min: [1, "There must be at least one hall"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Floor model
const floors = mongoose.model("floors", Floor_Schema);

module.exports = floors;
