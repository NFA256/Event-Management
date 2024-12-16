const mongoose = require("mongoose");

const Session_Schema = mongoose.Schema(
  {
    // Reference to the Workshop schema
    workshop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'workshops', // The model name of the Workshop schema
      required: [true, "Workshop ID is required"]
    },
    day_no: {
      type: Number,
      required: [true, "Day number is required"],
      min: 1, // Assuming day_no starts from 1
    },
    date: {
      type: Date,
      required: [true, "Session date is required"],
    },
    start_time: {
      type: String,
      required: [true, "Start time is required"],
    },
    end_time: {
      type: String,
      required: [true, "End time is required"],
    },
    speaker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Speaker', // Reference to the Speaker model (if you have one)
      required: [true, "Speaker ID is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Session model
const sessions = mongoose.model("sessions", Session_Schema);

module.exports = sessions;
