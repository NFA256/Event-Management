const express = require("express");
const {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
} = require("../Controllers/faqController");

const router = express.Router();

// Create a new FAQ
router.post("/faq", createFAQ);

// Get all FAQs
router.get("/faq", getAllFAQs);

// Get FAQ by ID
router.get("/faq/:id", getFAQById);

// Update FAQ by ID
router.put("/faq/:id", updateFAQ);

// Delete FAQ by ID
router.delete("/faq/:id", deleteFAQ);

module.exports = router;
