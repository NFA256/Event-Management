exhibitor = require("../Models/Exhibitor"); 

// Method -------  GET
// API   --------  http://localhost:5000/exhibitors
// Description --  CREATE EXHIBITOR FUNCTION
const createExhibitor = async (req, res) => {
  try {
    const { company_id, image, contact ,rating , user_id, event_id } = req.body;

    // Validate required fields
    if (!company_id || !image || !contact ||  !user_id || !event_id) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create new exhibitor
    const newExhibitor = new exhibitor({ company_id, image, contact,rating, user_id, event_id });
    const savedExhibitor = await newExhibitor.save();

    return res.status(201).json({ success: true, data: savedExhibitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating exhibitor", error: error.message });
  }
};


// Method -------  POST
// API   --------  http://localhost:5000/users
// Description --  GET EXHIBITOR FUNCTION
// Get all exhibitors
const getAllExhibitors = async (req, res) => {
  try {
    const getexhibitors = await exhibitor.find()
      .populate("user_id", "name email") // Populate user details
      .populate("event_id", "title date"); // Populate booth details

    return res.status(200).json({ success: true, data: getexhibitors });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching exhibitors", error: error.message });
  }
};


// Method -------  GET
// API   --------  http://localhost:5000/exhibitors/:id
// Description --  GET  EXHIBITOR BY ID FUNCTION
// Get a single exhibitor by ID
const getExhibitorById = async (req, res) => {
  try {
    const { id } = req.params;

    const exhibitor = await exhibitor.findById(id)
      .populate("user_id", "name email")
      .populate("event_id", "title date");

    if (!exhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    return res.status(200).json({ success: true, data: exhibitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching exhibitor", error: error.message });
  }
};


// Method -------  PUT
// API   --------  http://localhost:5000/exhibitors/:id
// Description --  UPDATE EXHIBITOR BY ID FUNCTION
// Update an exhibitor by ID
const updateExhibitor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedExhibitor = await exhibitor.findByIdAndUpdate(id, updates, { new: true })
      .populate("user_id", "name email")
      .populate("event_id", "title date");

    if (!updatedExhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    return res.status(200).json({ success: true, data: updatedExhibitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating exhibitor", error: error.message });
  }
};


// Method -------  DELETE
// API   --------  http://localhost:5000/exhibitors/:id
// Description --  DELETE EXHIBITOR FUNCTION
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
