const floors = require("../Models/Floor"); // Assuming the Floor model is in Models/Floor.js

// Create a new floor
const createFloor = async (req, res) => {
  try {
    const { floor_name, total_booths } = req.body;

    if (!floor_name || !total_booths) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFloor = new floors({
      floor_name,
      total_booths,
    });

    await newFloor.save();
    res.status(201).json({
      message: "Floor created successfully",
      floor: newFloor,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to create floor", error: error.message });
  }
};

// Get all floors
const getAllFloors = async (req, res) => {
  try {
    const getFloors = await floors.find()// Populate hall_id for more details from halls collection
    res.status(200).json(getFloors.length ? getFloors : { message: "No floors found" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch floors", error: error.message });
  }
};

// Get a single floor by ID
const getFloorById = async (req, res) => {
  try {
    const getFloor = await floors.findById(req.params.id).populate('hall_id');
    if (!getFloor) {
      return res.status(404).json({ message: "Floor not found" });
    }
    res.status(200).json(getFloor);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch floor", error: error.message });
  }
};

// Update a floor
const updateFloor = async (req, res) => {
  try {
    const { floor_name, total_booths } = req.body;

    if (!floor_name && !total_booths) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const updatedFloor = await floors.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(floor_name && { floor_name }),
          ...(total_booths && { total_booths }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedFloor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    res.status(200).json({
      message: "Floor updated successfully",
      floor: updatedFloor,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to update floor", error: error.message });
  }
};

// Delete a floor
const deleteFloor = async (req, res) => {
  try {
    const deletedFloor = await floors.findByIdAndDelete(req.params.id);

    if (!deletedFloor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    res.status(200).json({ message: "Floor deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to delete floor", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createFloor,
  getAllFloors,
  getFloorById,
  updateFloor,
  deleteFloor,
};
