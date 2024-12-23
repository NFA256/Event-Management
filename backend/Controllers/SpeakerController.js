const speakers = require("../Models/Speaker"); // Import the Speaker model
const { ImageDelete } = require("../Middlewares/ImageUploading"); // Image upload and delete middleware

// Create a new speaker
const createSpeaker = async (req, res) => {
  try {
    const { name, description } = req.body;
    const speakerImage = req.file; // Get the uploaded image

    if (!speakerImage) {
      return res.status(400).json({ message: "Speaker image is required" });
    }

    // Create a new speaker document
    const newSpeaker = new speakers({
      name,
      description,
      image: speakerImage.path, // Save image path
      ImageID: speakerImage.filename, // Save image filename
    });

    await newSpeaker.save();
    res.status(201).json({
      message: "Speaker created successfully",
      speaker: newSpeaker,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create speaker", error: error.message });
  }
};

// Get all speakers
const getAllSpeakers = async (req, res) => {
  try {
    const allSpeakers = await speakers.find();
    res
      .status(200)
      .json(
        allSpeakers.length ? allSpeakers : { message: "No speakers found" }
      );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch speakers", error: error.message });
  }
};

// Get a speaker by ID
const getSpeakerById = async (req, res) => {
  try {
    const speaker = await speakers.findById(req.params.id);

    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    res.status(200).json(speaker);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch speaker", error: error.message });
  }
};

// Update a speaker
const updateSpeaker = async (req, res) => {
  try {
    const { name, description, oldImage, Imagefilename } = req.body;
    const speakerImage = req.file; // Get the uploaded image if any
    let imagePath = oldImage;
    let imageID = Imagefilename;

    if (!name && !description && !speakerImage) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const speakerToUpdate = await speakers.findById(req.params.id);
    if (!speakerToUpdate) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    // If a new image is uploaded, delete the old one from Cloudinary
    if (speakerImage) {
      imagePath = speakerImage.path;
      imageID = speakerImage.filename;

      try {
        if (speakerToUpdate.ImageID) {
          req.body.OLDimageID = speakerToUpdate.ImageID; // Pass the ImageID to the next middleware
          await ImageDelete(req, res, () => {});
        }
      } catch (error) {
        console.error("Error deleting old image:", error.message);
        return res
          .status(500)
          .json({
            message: "Failed to delete old image",
            error: error.message,
          });
      }
    }

    // Update speaker details
    const updatedSpeaker = await speakers.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(name && { name }),
          ...(description && { description }),
          ...(imagePath && { image: imagePath }),
          ...(imageID && { ImageID: imageID }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedSpeaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    res.status(200).json({
      message: "Speaker updated successfully",
      speaker: updatedSpeaker,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update speaker", error: error.message });
  }
};

// Delete a speaker
const deleteSpeaker = async (req, res) => {
  try {
    const speakerToDelete = await speakers.findById(req.params.id);
    if (!speakerToDelete) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    // Delete the image from Cloudinary if it exists
    if (speakerToDelete.ImageID) {
      try {
        req.body.OLDimageID = speakerToDelete.ImageID; // Pass the ImageID to the next middleware
        await ImageDelete(req, res, () => {});
      } catch (error) {
        console.error("Error deleting image:", error.message);
        return res
          .status(500)
          .json({ message: "Failed to delete image", error: error.message });
      }
    }

    // Delete the speaker
    await speakers.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Speaker deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete speaker", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
};
