const halls = require("../Models/Hall");

// Create a new hall
const createHall = async (req, res) => {
  try {
    const { hall_name, seminar_id , workshop_id } = req.body;

    if (!hall_name ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHall = new halls({ hall_name, seminar_id ,  workshop_id });
    await newHall.save();
    res.status(201).json({
      message: "Hall created successfully",
      hall: newHall,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create hall", error: error.message });
  }
};

// Get all halls
const getAllHalls = async (req, res) => {
  try {
    const getHalls = await halls.find();
    res.status(200).json(getHalls.length ? getHalls : { message: "No halls found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch halls", error: error.message });
  }
};

// Get a single hall by ID
const getHallById = async (req, res) => {
  try {
    const getHall = await halls.findById(req.params.id);
    if (!getHall) {
      return res.status(404).json({ message: "Hall not found" });
    }
    res.status(200).json(getHall);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch hall", error: error.message });
  }
};

// Update a hall
const updateHall = async (req, res) => {
  try {
    const { hall_name, seminar_id ,  workshop_id  } = req.body;

    if (!hall_name ) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const updatedHall = await halls.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(hall_name && { hall_name }),
          ...(seminar_id && { seminar_id }),
          ...( workshop_id && {  workshop_id }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedHall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json({
      message: "Hall updated successfully",
      hall: updatedHall,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update hall", error: error.message });
  }
};

// Delete a hall
const deleteHall = async (req, res) => {
  try {
    const deletedHall = await halls.findByIdAndDelete(req.params.id);

    if (!deletedHall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json({ message: "Hall deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete hall", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
};
