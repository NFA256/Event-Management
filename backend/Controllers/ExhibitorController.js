exhibitor = require("../Models/Exhibitor"); // Adjust path as needed

// Create a new exhibitor
const createExhibitor = async (req, res) => {
  try {
    const { company_id, image, contact, product, user_id, booth_id } = req.body;

    // Validate required fields
    if (!company_id || !image || !contact || !product || !user_id || !booth_id) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create new exhibitor
    const newExhibitor = new exhibitor({ company_id, image, contact, product, user_id, booth_id });
    const savedExhibitor = await newExhibitor.save();

    return res.status(201).json({ success: true, data: savedExhibitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating exhibitor", error: error.message });
  }
};

// Get all exhibitors
const getAllExhibitors = async (req, res) => {
  try {
    const getexhibitors = await exhibitor.find()
      .populate("user_id", "name email") // Populate user details
      .populate("booth_id", "booth_name location"); // Populate booth details

    return res.status(200).json({ success: true, data: getexhibitors });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching exhibitors", error: error.message });
  }
};

// Get a single exhibitor by ID
const getExhibitorById = async (req, res) => {
  try {
    const { id } = req.params;

    const exhibitor = await exhibitor.findById(id)
      .populate("user_id", "name email")
      .populate("booth_id", "booth_name location");

    if (!exhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    return res.status(200).json({ success: true, data: exhibitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching exhibitor", error: error.message });
  }
};

// Update an exhibitor by ID
const updateExhibitor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedExhibitor = await exhibitor.findByIdAndUpdate(id, updates, { new: true })
      .populate("user_id", "name email")
      .populate("booth_id", "booth_name location");

    if (!updatedExhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    return res.status(200).json({ success: true, data: updatedExhibitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating exhibitor", error: error.message });
  }
};

// Delete an exhibitor by ID
const deleteExhibitor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExhibitor = await exhibitor.findByIdAndDelete(id);

    if (!deletedExhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    return res.status(200).json({ success: true, message: "Exhibitor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting exhibitor", error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createExhibitor,
  getAllExhibitors,
  getExhibitorById,
  updateExhibitor,
  deleteExhibitor,
};
