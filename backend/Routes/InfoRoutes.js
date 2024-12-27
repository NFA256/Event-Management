const express = require("express");
const router = express.Router();
const {
  createInformation,
  getAllInformation,
  getInformationById,
  updateInformation,
  deleteInformation,
} = require("../Controllers/InformationController");

// Create a new Information entry
router.post("/info", createInformation);

// Get all Information entries
router.get("/info", getAllInformation);

// Get a specific Information entry by ID
router.get("/info/:id", getInformationById);

// Update a specific Information entry by ID
router.put("/info/:id", updateInformation);

// Delete a specific Information entry by ID
router.delete("/delete/:id", deleteInformation);

module.exports = router;
