// Import required modules
const express = require("express");
const { ImageUpload } = require("../Middlewares/ImageUploading"); // Import image upload middleware
const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../Controllers/TestimonialController");

// Initialize router
const router = express.Router();

// Initialize upload middleware
const upload = ImageUpload("testimonials");
const upload2 = ImageUpload("testimonials");
// Define CRUD routes

// Create a testimonial with image upload
router.post("/testimonials", upload.single("imageFile"), createTestimonial);

// Get all testimonials
router.get("/testimonials", getAllTestimonials);

// Get a specific testimonial by ID
router.get("/testimonials/:id", getTestimonialById);

// Update a testimonial with optional image upload
router.put("/testimonials/:id", upload2.single("imageFile"), updateTestimonial);

// Delete a testimonial
router.delete("/testimonials/:id", deleteTestimonial);

// Export the router
module.exports = router;
