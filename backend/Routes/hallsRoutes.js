const express = require("express");
const router = express.Router();

// Import controller methods for halls
const {
  createHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
} = require("../Controllers/HallController");

// Define routes
router.post("/halls", createHall); // Create a new hall
router.get("/halls", getAllHalls); // Get all halls
router.get("/halls/:id", getHallById); // Get hall by ID
router.put("/halls/:id", updateHall); // Update hall by ID
router.delete("/halls/:id", deleteHall); // Delete hall by ID

// Export the router to be used in index.js
module.exports = router;
