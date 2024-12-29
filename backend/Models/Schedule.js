const mongoose = require("mongoose");

const Schedule_Schema = mongoose.Schema(
  {
    start_date: {
      type: Date,
      required: [true, "Date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "Date is required"],
    },
    reserved_for: {
      type: String,
      required: [true, "Reserved For field is required"],
      trim: true, // Remove extra spaces
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Schedule model
const schedules = mongoose.model("schedules", Schedule_Schema);

module.exports = schedules;
