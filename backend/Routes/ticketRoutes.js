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
router.post("/tickets", createTicket);

// Route to get all tickets
router.get("/tickets", getAllTickets);

// Route to get a ticket by ID
router.get("/tickets/:id", getTicketById);

// Route to update a ticket by ID
router.put("/tickets/:id", updateTicket);

// Route to delete a ticket by ID
router.delete("/tickets/:id", deleteTicket);

module.exports = router;
