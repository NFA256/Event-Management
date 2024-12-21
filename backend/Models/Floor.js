const mongoose = require("mongoose");

const Floor_Schema = mongoose.Schema(
  {
    floor_name:{
      type: String,
      required: [true, "floor name is required"],
      trim: true,
    },
     total_booths: {
      type: Number,
      required: [true, "Total booths count is required"],
      min: [1, "There must be at least one booth"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Floor model
const floors = mongoose.model("floors", Floor_Schema);

module.exports = floors;
