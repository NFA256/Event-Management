const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../Controllers/BookingController");

// Create a new booking
router.post("/bookings", createBooking);

// Get all bookings
router.get("/bookings", getAllBookings);

// Get a single booking by ID
router.get("/bookings/:id", getBookingById);

// Update a booking by ID
router.put("/bookings/:id", updateBooking);

// Delete a booking by ID
router.delete("/bookings/:id", deleteBooking);

module.exports = router;
