const mongoose = require("mongoose");

const Workshop_Schema = mongoose.Schema(
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
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    ImageID: { 
      type:String 
    },
    total_sessions: {
      type: Number,
      required: [true, "Total sessions are required"],
    },
    start_date: {
      type: Date,
      required: [true, "Start date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "End date is required"],
    },
    hall_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "halls", // Reference to the halls collection
      required: [true, "Hall ID is required"],
    },
    no_of_attendees: {
      type: Number,
      required: [true, "Number of attendees is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
    speaker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Speaker', // Reference to the Speaker model (if you have one)
      required: [true, "Speaker ID is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Workshop model
const workshops = mongoose.model("workshops", Workshop_Schema);

module.exports = workshops;
