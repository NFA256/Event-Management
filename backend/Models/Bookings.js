const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the users collection
      required: true,
    },
    workshop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workshops", // Reference to the workshops collection
      required: false, // Optional if booking is not for a workshop
    },
    seminar_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seminars", // Reference to the seminars collection
      required: false, // Optional if booking is not for a seminar
    },
    date: {
      type: Date,
      required: true, // Booking date
    },
    total_cost: {
      type: Number,
      required: true, // Total cost for the booking
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Booking model
const bookings = mongoose.model("bookings", BookingSchema);

module.exports = bookings;
