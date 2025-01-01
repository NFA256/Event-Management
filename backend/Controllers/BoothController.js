const mongoose = require("mongoose");
const booths = require("../Models/Booth"); // Adjust path as needed
const floors = require("../Models/Floor"); // Adjust path as needed

const createBooth = async (req, res) => {
  try {
    const { floor_id,reserved_bool, name } = req.body;

    // Validate the data
    if (!floor_id) {
      return res
        .status(400)
        .json({ message: "All fields (floor_id) are required" });
    }

    // Find the floor by its ID
    const floor = await floors.findById(floor_id);
    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    // Check if the floor has reached its maximum capacity
    if (floor.no_of_booths >= floor.total_booths) {
      return res
        .status(400)
        .json({ message: "The floor has no available capacity for more booths." });
    }

    // Check if a booth with the same name already exists on the specified floor
    const existingBooth = await booths.findOne({ floor_id, name });
    if (existingBooth) {
      return res.status(400).json({
        message: "A booth with this name already exists on the selected floor.",
      });
    }

    // Increment the `no_of_booths` by 1
    floor.no_of_booths += 1;
    await floor.save(); // Save the updated floor document

    // Create the new booth
    const newBooth = new booths({
      floor_id,
      name,
      reserved_bool: reserved_bool || false, // default to false if not provided
    });

    // Save the booth to the database
    await newBooth.save();
    res.status(201).json({
      message: "Booth created successfully",
      booth: newBooth,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create booth", error: error.message });
  }
};



// Method -------  GET
// API   --------  https://eventsphere-project.vercel.app/booths
// Get all booths
const getAllBooths = async (req, res) => {
  try {
    const getbooths = await booths.find().populate("floor_id");
    res.status(200).json(getbooths.length ? getbooths : { message: "No booths found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booths", error: error.message });
  }
};

// Method -------  GET
// API   --------  https://eventsphere-project.vercel.app/booths/id
// Get a specific booth by ID
const getBoothById = async (req, res) => {
  try {
    const booth = await booths.findById(req.params.id).populate("floor_id ");

    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }
    res.status(200).json(booth);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booth", error: error.message });
  }
};
// Method -------  PUT
// API   --------  https://eventsphere-project.vercel.app/booths

// Update a booth by ID (including reserved_bool update)
const updateBooth = async (req, res) => {
  try {
    const { floor_id, name,reserved_bool } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Booth ID" });
    }

    // Check if the combination of hall, floor, and exhibitor already exists for another booth
    const duplicateBooth = await booths.findOne({
      floor_id,
      name,
      _id: { $ne: req.params.id }, // Exclude the current booth being updated
    });
    if (duplicateBooth) {
      return res.status(400).json({ message: "A booth with the same hall, floor, and exhibitor already exists" });
    }

    const updatedBooth = await booths.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(floor_id && { floor_id }),
          ...(name && { name }),
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

// Method -------  DELEtE
// API   --------  https://eventsphere-project.vercel.app/booths/id
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
