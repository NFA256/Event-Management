const informations = require("../Models/Information");

// Create a new Information entry
const createInformation = async (req, res) => {
  try {
    const { phone, contact, address, email } = req.body;

    // Validate input fields
    if (!phone || !contact || !address || !email) {
      return res
        .status(400)
        .json({ message: "All fields (phone, contact, address, email) are required" });
    }

    // Create and save the new information entry
    const newInfo = new informations({ phone, contact, address, email });
    await newInfo.save();

    res.status(201).json({
      message: "Information created successfully",
      information: newInfo,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create information", error: error.message });
  }
};

// Get all Information entries
const getAllInformation = async (req, res) => {
  try {
    const infos = await informations.find();
    if (infos.length === 0) {
      return res.status(404).json({ message: "No information found" });
    }
    res.status(200).json(infos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch information", error: error.message });
  }
};

// Get a specific Information entry by ID
const getInformationById = async (req, res) => {
  try {
    const info = await informations.findById(req.params.id);
    if (!info) {
      return res.status(404).json({ message: "Information not found" });
    }
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch information", error: error.message });
  }
};

// Update Information entry by ID
const updateInformation = async (req, res) => {
  try {
    const { phone, contact, address, email } = req.body;

    const updatedInfo = await informations.findByIdAndUpdate(
      req.params.id,
      { phone, contact, address, email },
      { new: true, runValidators: true }
    );

    if (!updatedInfo) {
      return res.status(404).json({ message: "Information not found" });
    }

    res.status(200).json({
      message: "Information updated successfully",
      information: updatedInfo,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update information", error: error.message });
  }
};

// Delete Information entry by ID
const deleteInformation = async (req, res) => {
  try {
    const deletedInfo = await Information.findByIdAndDelete(req.params.id);
    if (!deletedInfo) {
      return res.status(404).json({ message: "Information not found" });
    }
    res.status(200).json({ message: "Information deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete information", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createInformation,
  getAllInformation,
  getInformationById,
  updateInformation,
  deleteInformation,
};
