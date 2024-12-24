const express = require("express");
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../Controllers/TicketController");

// Route to create a new ticket
router.post("/", createTicket);

// Route to get all tickets
router.get("/", getAllTickets);

// Route to get a ticket by ID
router.get("/:id", getTicketById);

// Route to update a ticket by ID
router.put("/:id", updateTicket);

// Route to delete a ticket by ID
router.delete("/:id", deleteTicket);

module.exports = router;
