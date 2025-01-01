const mongoose = require('mongoose');

const Seminar_Schema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    ImageID: { 
      type:String 
    },
    purpose: {
      type: String,
      required: [true, "Purpose is required"],
    },
    start_time: {
      type: String,
      required: [true, "Start time is required"],
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // 24-hour format validation
        "Please provide a valid start time (HH:MM)",
      ],
    },
    end_time: {
      type: String,
      required: [true, "End time is required"],
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // 24-hour format validation
        "Please provide a valid end time (HH:MM)",
      ],
    },
    no_of_attendees: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      required: [true, "Number of attendees is required"],
      min: [1, "Attendees count must be at least 1"],
    },
    is_paid: {
      type: Boolean,
      default: false, // Defaults to false, meaning not reserved
      required: true,
    },
    price: {
      type: String,
      trim: true,
    },
    speaker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'speakers', // Assuming you have a 'Speaker' model for speakers
      required: [true, "Speaker ID is required"],
    },
    hall_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'halls', // Assuming you have a 'Hall' model for halls
      required: [true, "Hall ID is required"],
    },
     schedule_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'schedules', // Assuming you have a 'schedules' model
          required: [true, "Schedule ID is required"],
        },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the Seminar model
const seminars = mongoose.model('seminars', Seminar_Schema);

module.exports = seminars;
