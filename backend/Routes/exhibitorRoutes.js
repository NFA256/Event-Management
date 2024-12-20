const express = require("express");
const router = express.Router();
const { ImageUpload, ImageDelete } = require("../Middlewares/ExhibitorImages");
const upload = ImageUpload(); // Middleware for handling image uploads
const upload2 = ImageUpload();
// Import controller methods for exhibitors
const {
  createExhibitor,
  getAllExhibitors,
  getExhibitorById,
  updateExhibitor,
  deleteExhibitor,
} = require("../Controllers/ExhibitorController");

// Define routes
router.post("/exhibitors", upload.single("exhibitorImage"), createExhibitor); // Create a new exhibitor with image upload
router.get("/exhibitors", getAllExhibitors); // Get all exhibitors
router.get("/exhibitors/:id", getExhibitorById); // Get exhibitor by ID
router.put("/exhibitors/:id", upload2.single("exhibitorImage"), updateExhibitor); // Update exhibitor with image upload
router.delete("/exhibitors/:id",ImageDelete, deleteExhibitor); // Delete exhibitor by ID

// Export the router to be used in index.js
module.exports = router;
