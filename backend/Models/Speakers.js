const mongoose = require("mongoose");

const Speaker_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Speaker name is required"],
      trim: true, // Removes extra spaces
    },
    description: {
      type: String,
      required: [true, "Speaker description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Speaker image URL is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Speaker model
const speakers = mongoose.model("speakers", Speaker_Schema);

module.exports = speakers;
