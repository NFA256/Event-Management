// Import required modules
const express = require("express");

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../Controllers/TestimonialController");

// Define CRUD routes
// Initialize router
const router = express.Router();
// Create a testimonial
router.post("/testimonials", createTestimonial);

// Get all testimonials
router.get("/testimonials", getAllTestimonials);

// Get a specific testimonial by ID
router.get("/testimonials/:id", getTestimonialById);

// Update a testimonial
router.put("/testimonials/:id", updateTestimonial);

// Delete a testimonial
router.delete("/testimonials/:id", deleteTestimonial);

// Export the router
module.exports = router;
