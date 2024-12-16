const express = require("express");
const router = express.Router();

// Importing the controller functions for workshops
const {
  createWorkshop,
  getAllWorkshops,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
} = require("../Controllers/WorkshopController");

// Route to create a new workshop and get all workshops
router.route("/workshops")
  .post(createWorkshop)   // Create a new workshop
  .get(getAllWorkshops);  // Get all workshops

// Route to get, update, or delete a workshop by its ID
router.route("/workshops/:id")
  .get(getWorkshopById)   // Get a workshop by ID
  .put(updateWorkshop)    // Update a workshop by ID
  .delete(deleteWorkshop); // Delete a workshop by ID

module.exports = router;
