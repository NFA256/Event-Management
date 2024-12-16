const mongoose = require("mongoose");
const booths = require("../Models/Booth"); // Adjust path as needed

// Create a new booth
const createBooth = async (req, res) => {
  try {
    const { hall_id, floor_id, exhibitor_id, reserved_bool } = req.body;

    // Validate the data
    if (!hall_id || !floor_id || !exhibitor_id) {
      return res.status(400).json({ message: "All fields (hall_id, floor_id, exhibitor_id) are required" });
    }

    // Check if the booth already exists with the same combination of hall, floor, and exhibitor
    const existingBooth = await booths.findOne({ hall_id, floor_id, exhibitor_id });
    if (existingBooth) {
      return res.status(400).json({ message: "Booth already exists with this combination of hall, floor, and exhibitor" });
    }

    // Create the new booth
    const newBooth = new booths({
      hall_id,
      floor_id,
      exhibitor_id,
      reserved_bool: reserved_bool || false, // default to false if not provided
    });

    // Save the booth to the database
    await newBooth.save();
    res.status(201).json({
      message: "Booth created successfully",
      booth: newBooth,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booth", error: error.message });
  }
};

// Get all booths
const getAllBooths = async (req, res) => {
  try {
    const getbooths = await booths.find().populate("hall_id floor_id exhibitor_id");
    res.status(200).json(getbooths.length ? getbooths : { message: "No booths found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booths", error: error.message });
  }
};

// Get a specific booth by ID
const getBoothById = async (req, res) => {
  try {
    const booth = await booths.findById(req.params.id).populate("hall_id floor_id exhibitor_id");

    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }
    res.status(200).json(booth);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booth", error: error.message });
  }
};

// Update a booth by ID (including reserved_bool update)
const updateBooth = async (req, res) => {
  try {
    const { hall_id, floor_id, exhibitor_id, reserved_bool } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Booth ID" });
    }

    // Check if the combination of hall, floor, and exhibitor already exists for another booth
    const duplicateBooth = await booths.findOne({
      hall_id,
      floor_id,
      exhibitor_id,
      _id: { $ne: req.params.id }, // Exclude the current booth being updated
    });
    if (duplicateBooth) {
      return res.status(400).json({ message: "A booth with the same hall, floor, and exhibitor already exists" });
    }

    const updatedBooth = await booths.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(hall_id && { hall_id }),
          ...(floor_id && { floor_id }),
          ...(exhibitor_id && { exhibitor_id }),
          ...(reserved_bool !== undefined && { reserved_bool }), // Update only if provided
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedBooth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json({
      message: "Booth updated successfully",
      booth: updatedBooth,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booth", error: error.message });
  }
};

// Delete a booth by ID
const deleteBooth = async (req, res) => {
  try {
    const booth = await booths.findByIdAndDelete(req.params.id);

    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json({ message: "Booth deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booth", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createBooth,
  getAllBooths,
  getBoothById,
  updateBooth,
  deleteBooth,
};
