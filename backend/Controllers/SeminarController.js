const seminars = require('../Models/Seminar'); // Import the Seminar model
const { ImageDelete } = require("../Middlewares/SeminarImages"); // Image middleware

// Create a new seminar
const createSeminar = async (req, res) => {
  try {
    const { date, title, purpose, start_time, end_time, capacity, price, is_paid, speaker_id, hall_id } = req.body;
    const seminarImage = req.file; // Getting the uploaded image

    if (!seminarImage) {
      return res.status(400).json({ message: "Seminar image is required" });
    }

    // Create a new seminar document
    const newSeminar = new seminars({
      date,
      title,
      purpose,
      start_time,
      end_time,
      capacity,
      price,
      is_paid,
      speaker_id,
      hall_id,
      image: seminarImage.path, // Save the image path
      ImageID: seminarImage.filename, // Save the image filename for future deletion
    });

    // Save the seminar
    await newSeminar.save();
    res.status(201).json({
      message: "Seminar created successfully",
      seminar: newSeminar,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create seminar", error: error.message });
  }
};

// Get all seminars
const getAllSeminars = async (req, res) => {
  try {
    const getSeminars = await seminars.find().populate('speaker_id').populate('hall_id');
    res.status(200).json(getSeminars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seminars", error: error.message });
  }
};

// Get a single seminar by ID
const getSeminarById = async (req, res) => {
  try {
    const getSeminar = await seminars.findById(req.params.id).populate('speaker_id').populate('hall_id');
    if (!getSeminar) {
      return res.status(404).json({ message: "Seminar not found" });
    }
    res.status(200).json(getSeminar);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seminar", error: error.message });
  }
};

// Update a seminar by ID
const updateSeminar = async (req, res) => {
  try {
    const { date, title, purpose, start_time, end_time, capacity, price, is_paid, speaker_id, hall_id, oldImage, Imagefilename } = req.body;
    const seminarImage = req.file; // Check if a new image is uploaded
    let seminarImagePath = oldImage;
    let fileID = Imagefilename;

    // Ensure at least one field is provided for update
    if (!date && !title && !purpose && !start_time && !end_time && !capacity && !speaker_id && !hall_id) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const seminarToUpdate = await seminars.findById(req.params.id);
    if (!seminarToUpdate) {
      return res.status(404).json({ message: "Seminar not found" });
    }

    // If a new image is uploaded, delete the old one from Cloudinary
    if (seminarImage) {
      seminarImagePath = seminarImage.path;
      fileID = seminarImage.filename;

      // Delete the old image from Cloudinary
      try {
        if (seminarToUpdate.ImageID) {
          await ImageDelete({ OLDimageID: seminarToUpdate.ImageID });
        }
      } catch (error) {
        console.error("Error deleting old image:", error.message);
        return res.status(500).json({ message: "Failed to delete old image", error: error.message });
      }
    }

    // Update the seminar
    const updatedSeminar = await seminars.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(date && { date }),
          ...(title && { title }),
          ...(purpose && { purpose }),
          ...(start_time && { start_time }),
          ...(end_time && { end_time }),
          ...(capacity && { capacity }),
          ...(price && { price }),
          ...(is_paid && { is_paid }),
          ...(speaker_id && { speaker_id }),
          ...(hall_id && { hall_id }),
          ...(seminarImagePath && { image: seminarImagePath }),
          ...(fileID && { ImageID: fileID }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedSeminar) {
      return res.status(404).json({ message: "Seminar not found" });
    }

    res.status(200).json({
      message: "Seminar updated successfully",
      seminar: updatedSeminar,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update seminar", error: error.message });
  }
};

// Delete a seminar by ID
const deleteSeminar = async (req, res) => {
  try {
    const seminarToDelete = await seminars.findById(req.params.id);
    if (!seminarToDelete) {
      return res.status(404).json({ message: "Seminar not found" });
    }

    // Delete the image from Cloudinary if it exists
    if (seminarToDelete.ImageID) {
      try {
        await ImageDelete({ OLDimageID: seminarToDelete.ImageID });
      } catch (error) {
        console.error("Error deleting image:", error.message);
        return res.status(500).json({ message: "Failed to delete image", error: error.message });
      }
    }

    // Delete the seminar from the database
    await seminars.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Seminar deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete seminar", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createSeminar,
  getAllSeminars,
  getSeminarById,
  updateSeminar,
  deleteSeminar,
};
