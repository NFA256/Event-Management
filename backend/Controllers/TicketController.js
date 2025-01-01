const Ticket = require("../Models/Ticket");
const Seminar = require("../Models/Seminar");
const Workshop = require("../Models/Workshop"); 
// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { seminar_id, workshop_id, user_id, total_price } = req.body;

    // Check if a seminar_id is provided
    if (seminar_id) {
      // Find the seminar
      const seminar = await Seminar.findById(seminar_id);
      if (!seminar) {
        return res.status(404).json({
          success: false,
          message: "Seminar not found",
        });
      }

      // Check if the number of attendees exceeds capacity
      if (seminar.no_of_attendees >= seminar.capacity) {
        return res.status(400).json({
          success: false,
          message: "The seminar capacity has been exceeded. No more tickets can be booked.",
        });
      }

      // Increase the number of attendees
      seminar.no_of_attendees += 1;
      await seminar.save();
    }

    // Check if a workshop_id is provided
    if (workshop_id) {
      // Find the workshop
      const workshop = await Workshop.findById(workshop_id);
      if (!workshop) {
        return res.status(404).json({
          success: false,
          message: "Workshop not found",
        });
      }

      // Check if the number of attendees exceeds capacity
      if (workshop.no_of_attendees >= workshop.capacity) {
        return res.status(400).json({
          success: false,
          message: "The workshop capacity has been exceeded. No more tickets can be booked.",
        });
      }

      // Increase the number of attendees
      workshop.no_of_attendees += 1;
      await workshop.save();
    }

    // Create a new ticket instance
    const ticket = new Ticket({
      seminar_id,
      workshop_id,
      user_id,
      total_price,
    });

    // Save the ticket to the database
    const savedTicket = await ticket.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: savedTicket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create ticket",
      error: error.message,
    });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate({
        path: "seminar_id", // Populate seminar data
        select: "title date",    // Ensure title is fetched
        populate: [
          { path: "speaker_id", select: "name" }, // Speaker name
          { path: "hall_id", select: "hall_name" }, // Hall name
        ]
      })
      .populate({
        path: "workshop_id", // Populate workshop data
        select: "title total_sessions start_date",     // Ensure title is fetched
        populate: [
          { path: "speaker_id", select: "name" }, // Speaker name
          { path: "hall_id", select: "hall_name" }, // Hall name
        ]
      })
      .populate({
        path: "user_id", // Populate user data
        select: "name role",
        populate: {
          path: "role",
          select: "RoleName",  // Populate role name
        }
      });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tickets found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
      error: error.message,
    });
  }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate(
      "seminar_id  workshop_id user_id"
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
      error: error.message,
    });
  }
};
// Get a single ticket by ID
const getTicketByuserId = async (req, res) => {
  try {
    const { user_id } = req.query;  // Extract user_id from query parameters
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }
    const ticket = await Ticket.find({user_id}) .populate({
      path: "seminar_id", // Populating seminar data
      populate: [
        {
          path: "speaker_id", // Populate speaker inside seminar
          select: "name" // Get speaker's name
        },
        {
          path: "hall_id", // Populate hall inside seminar
          select: "hall_name" // Get hall name
        }
      ]
    })
    .populate({
      path: "workshop_id", // Populating workshop data
      populate: [
        {
          path: "speaker_id", // Populate speaker inside workshop
          select: "name" // Get speaker's name
        },
        {
          path: "hall_id", // Populate hall inside workshop
          select: "hall_name" // Get hall name
        }
      ]
    })
    .populate("user_id");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
      error: error.message,
    });
  }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update ticket",
      error: error.message,
    });
  }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete ticket",
      error: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketByuserId,
  updateTicket,
  deleteTicket,
};
