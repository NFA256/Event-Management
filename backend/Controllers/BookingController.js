const bookings = require("../Models/Bookings"); // Import the Booking model

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new bookings(req.body);
    await newBooking.save();
    return res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating booking", error: error.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const allBookings = await bookings
      .find()
      .populate("user_id", "name email") // Populate user details
      .populate("workshop_id", "title date") // Populate workshop details
      .populate("seminar_id", "title date"); // Populate seminar details
    return res.status(200).json({ success: true, data: allBookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await bookings
      .findById(req.params.id)
      .populate("user_id", "name email")
      .populate("workshop_id", "title date")
      .populate("seminar_id", "title date");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching booking", error: error.message });
  }
};

// Update booking by ID
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await bookings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    return res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating booking", error: error.message });
  }
};

// Delete booking by ID
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await bookings.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    return res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting booking", error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
