const exhibitor = require("../Models/Exhibitor");
const { ImageDelete } = require("../Middlewares/ImageUploading");

// Method -------  POST
// API   --------  http://localhost:5000/exhibitors
// Description --  CREATE EXHIBITOR FUNCTION
const createExhibitor = async (req, res) => {
  try {
    const { company_id, contact, rating, user_id, event_id,booth_id } = req.body;
    const exhibitorImage = req.file;

    // Check if image is uploaded
    if (!exhibitorImage) {
      return res.status(400).json({ success: false, message: "Exhibitor image is required." });
    }
    const image = exhibitorImage.path;
    const ImageID = exhibitorImage.filename;

    // Validate required fields
    if (!company_id || !contact || !user_id ) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create new exhibitor
    const newExhibitor = new exhibitor({
      company_id,
      image,
      ImageID,
      contact,
      rating,
      user_id,
      event_id,
      booth_id
    });
    const savedExhibitor = await newExhibitor.save();

    return res.status(201).json({ success: true, data: savedExhibitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error creating exhibitor", error: error.message });
  }
};

// Method -------  GET
// API   --------  http://localhost:5000/exhibitors
// Description --  GET ALL EXHIBITORS FUNCTION
const getAllExhibitors = async (req, res) => {
  try {
    const exhibitors = await exhibitor.find()
      .populate("user_id", "name email") // Populate user details
      .populate("event_id", "title date") // Populate event details
      .populate("booth_id", "name"); // Populate event details
      

    return res.status(200).json({ success: true, data: exhibitors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching exhibitors", error: error.message });
  }
};

// Method -------  GET
// API   --------  http://localhost:5000/exhibitors/:id
// Description --  GET EXHIBITOR BY ID FUNCTION
const getExhibitorById = async (req, res) => {
  try {
    const { id } = req.params;

    const exhibitorData = await exhibitor.findById(id)
      .populate("user_id", "name email")
      .populate("event_id", "title date")
      .populate("booth_id", "name");

    if (!exhibitorData) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    return res.status(200).json({ success: true, data: exhibitorData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching exhibitor", error: error.message });
  }
};

// Method -------  PUT
// API   --------  http://localhost:5000/exhibitors/:id
// Description --  UPDATE EXHIBITOR BY ID FUNCTION
const updateExhibitor = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_id, contact, rating, user_id, event_id, oldImage, Imagefilename,booth_id } = req.body;
    const exhibitorImage = req.file;

    let image;
    let ImageID;
    const exhibitorToUpdate = await exhibitor.findById(id);

    if (exhibitorImage) {
      image = exhibitorImage.path;
      ImageID = exhibitorImage.filename;

      if (exhibitorToUpdate.ImageID) {
        try {
          req.body.OLDimageID = exhibitorToUpdate.ImageID;  // Pass the ImageID to the next middleware
          await ImageDelete(req, res, () => {});  // Call ImageDelete with the updated req.body
        } catch (error) {
          console.error("Error deleting old image:", error.message);
          return res.status(500).json({ message: "Failed to delete old image", error: error.message });
        }
      }
    } else {
      image = oldImage;
      ImageID = Imagefilename;
    }

    const updatedExhibitor = await exhibitor.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(company_id && { company_id }),
          ...(image && { image }),
          ...(ImageID && { ImageID }),
          ...(contact && { contact }),
          ...(rating && { rating }),
          ...(user_id && { user_id }),
          ...(event_id && { event_id }),
          ...(booth_id && { booth_id }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedExhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    return res.status(200).json({ success: true, data: updatedExhibitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error updating exhibitor", error: error.message });
  }
};

// Method -------  DELETE
// API   --------  http://localhost:5000/exhibitors/:id
// Description --  DELETE EXHIBITOR FUNCTION
const deleteExhibitor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExhibitor = await exhibitor.findById(req.params.id);
    if (!deletedExhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }
    if (deletedExhibitor.ImageID) {
      try {
        req.body.OLDimageID = deletedExhibitor.ImageID;  // Pass the ImageID to the next middleware
        await ImageDelete(req, res, () => {});  // Call ImageDelete with the updated req.body
      } catch (error) {
        console.error("Error deleting old image:", error.message);
        return res.status(500).json({ message: "Failed to delete old image", error: error.message });
      }
    }
    await exhibitor.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Exhibitor deleted successfully" });
  } catch (error) {
    console.error(error);
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
