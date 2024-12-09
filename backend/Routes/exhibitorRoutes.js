const express = require("express");
const router = express.Router();

// Import controller methods for exhibitors
const {
  createExhibitor,
  getAllExhibitors,
  getExhibitorById,
  updateExhibitor,
  deleteExhibitor,
} = require("../Controllers/ExhibitorController");

// Define routes
router.post("/exhibitors", createExhibitor); // Create a new exhibitor
router.get("/exhibitors", getAllExhibitors); // Get all exhibitors
router.get("/exhibitors/:id", getExhibitorById); // Get exhibitor by ID
router.put("/exhibitors/:id", updateExhibitor); // Update exhibitor by ID
router.delete("/exhibitors/:id", deleteExhibitor); // Delete exhibitor by ID

// Export the router to be used in index.js
module.exports = router;
