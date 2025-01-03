const mongoose = require("mongoose");

const Event_Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // 24-hour format validation
        "Please provide a valid time (HH:MM)",
      ],
    },
    date: {
      type: Date,
      // required: [true, "Date is required"],
    },
    no_of_visitors: {
      type: Number,
      required: [true, "Number of visitors is required"],
      min: [1, "Visitors count must be at least 1"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["Active", "Completed", "Upcoming"],
        message: "Status must be either 'Active', 'Completed', or 'Upcoming'",
      },
    },
    ImageID: { 
      type:String 
    },
    schedule_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'schedules', // Assuming you have a 'schedules' model
      required: [true, "Schedule ID is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the Event model
const events = mongoose.model("events", Event_Schema);

module.exports = events;
