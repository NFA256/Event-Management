const bookings = require("../Models/Bookings"); // Import the Booking model
const booths = require("../Models/Booth"); // Import the Booking model

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { exhibitor_id, event_id, booth_id, date, total_cost } = req.body;

    // Check if all required fields are provided and total_cost is positive
    if (!exhibitor_id || !event_id || !booth_id || !date || total_cost <= 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, and total_cost must be positive.",
      });
    }

    // Check if the booth is already reserved
    const booth = await booths.findOne({ _id: booth_id });

    if (!booth) {
      return res.status(404).json({
        success: false,
        message: "Booth not found.",
      });
    }

    if (booth.reserved_bool === true) {
      return res.status(400).json({
        success: false,
        message: "Booth is already reserved.",
      });
    }
    // Check if the booth is already reserved for the same event and date
    // const existingBooking = await bookings.findOne({
    //   booth_id,
    // });

    // if (existingBooking) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Booth is already selected by seomone .",
    //   });
    // }
    // If booth is not reserved, proceed with the booking
    const newBooking = new bookings({
      exhibitor_id,
      event_id,
      booth_id,
      date,
      total_cost,
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();


    return res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the booking.",
      error: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    console.log("Fetching all bookings...");

    const allBookings = await bookings
      .find()
      .populate("exhibitor_id", "name ") // Populate exhibitor details
      .populate("event_id", "title date") // Populate event details
      .populate("booth_id", "name"); // Populate booth details

    console.log("Bookings fetched:", allBookings); // Log the populated bookings

    return res.status(200).json({ success: true, data: allBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error.message); // Log error details
    return res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await bookings
      .findById(req.params.id)
      .populate("exhibitor_id", "name email")
      .populate("event_id", "title date")
      .populate("booth_id", "name");
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};
// Get booking by ID
const getBookingByexhibitorId = async (req, res) => {
  try {
    const { exhibitor_id } = req.query;  // Extract user_id from query parameters
    if (!exhibitor_id) {
      return res.status(400).json({ message: "exhibitor ID is required." });
    }
    const booking = await bookings
      .find({exhibitor_id})
      .populate("exhibitor_id")
      .populate("event_id", "title date")
      .populate("booth_id", "name");
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};

// Update booking by ID
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await bookings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    return res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating booking",
      error: error.message,
    });
  }
};

// Delete booking by ID
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await bookings.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: error.message,
    });
  }

};
// Approve booking
// Approve booking
const approveBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find the booking that is being approved
    const booking = await bookings.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Check if the booth is already reserved by another approved booking
    const existingBooking = await bookings.findOne({
      booth_id: booking.booth_id,
      status: "approved",  // Look for already approved bookings
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This booth has already been reserved by another approved booking.",
      });
    }

    // Update the status of the booking to approved
    const updatedBooking = await bookings.findByIdAndUpdate(
      bookingId,
      { status: "approved" },
      { new: true }
    );

    // After approval, mark the booth as reserved
    const booth = await booths.findById(booking.booth_id);
    booth.reserved_bool = true;  // Mark the booth as reserved
    await booth.save();  // Save the updated booth

    return res.status(200).json({
      success: true,
      message: "Booking approved and booth reserved successfully.",
      data: updatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error approving booking",
      error: error.message,
    });
  }
};


// Reject booking
const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const updatedBooking = await bookings.findByIdAndUpdate(
      bookingId,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      data: updatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error rejecting booking",
      error: error.message,
    });
  }
};



module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingByexhibitorId,
  updateBooking,
  deleteBooking,
  approveBooking,
  rejectBooking,
};
