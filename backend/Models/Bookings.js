const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    exhibitor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exhibitors",
      required: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    booth_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booths",
      required: true,
    },
    date: { type: Date, required: true },
    total_cost: { type: Number, required: true, min: 1 }, // Validate positive cost
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Booking model
const bookings = mongoose.model("bookings", BookingSchema);

module.exports = bookings;
