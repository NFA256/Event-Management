const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingByexhibitorId,
  updateBooking,
  deleteBooking,
  approveBooking, // Import approveBooking method
  rejectBooking, // Import rejectBooking method
} = require("../Controllers/BookingController");

// Create a new booking
router.post("/bookings", createBooking);

// Get all bookings
router.get("/bookings", getAllBookings);

// Get a single booking by ID
router.get("/bookings/:id", getBookingById);

// Get a single booking by user ID
router.get("/bookings-exhibitor-id", getBookingByexhibitorId);

// Update a booking by ID
router.put("/bookings/:id", updateBooking);

// Delete a booking by ID
router.delete("/bookings/:id", deleteBooking);

// Approve a booking
router.patch("/bookings/:id/approve", approveBooking);

// Reject a booking
router.patch("/bookings/:id/reject", rejectBooking);

module.exports = router;
