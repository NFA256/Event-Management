const mongoose = require("mongoose");

const Hall_Schema = mongoose.Schema(
  {
    hall_name: {
      type: String,
      required: [true, "Hall name is required"],
      trim: true,
    },
   
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the Hall model
const halls = mongoose.model("halls", Hall_Schema);

module.exports = halls;
