const express = require("express");
const router = express.Router();
const {
  createBooth,
  getAllBooths,
  getBoothById,
  updateBooth,
  deleteBooth,
} = require("../Controllers/BoothController"); // Adjust the path as needed

// Route to create a new booth
router.post("/booths", createBooth);

// Route to get all booths
router.get("/booths", getAllBooths);

// Route to get a booth by ID
router.get("/booths/:id", getBoothById);

// Route to update a booth by ID
router.put("/booths/:id", updateBooth);

// Route to delete a booth by ID
router.delete("/booths/:id", deleteBooth);

module.exports = router;
