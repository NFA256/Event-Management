const workshops = require("../Models/Workshop"); // Import the Workshop model
const { ImageDelete } = require("../Middlewares/ImageUploading"); // Image upload and delete middleware

// Create a new workshop
const createWorkshop = async (req, res) => {
  try {
    const {
      title,
      description,
      total_sessions,
      start_date,
      end_date,
      hall_id,
      no_of_attendees,
      price,
      speaker_id,
    } = req.body;
    const workshopImage = req.file; // Get the uploaded image

    if (!workshopImage) {
      return res.status(400).json({ message: "Workshop image is required" });
    }

    if (isNaN(total_sessions) || total_sessions <= 0) {
      return res
        .status(400)
        .json({ message: "Total sessions must be a positive number" });
    }

    if (new Date(start_date) > new Date(end_date)) {
      return res
        .status(400)
        .json({ message: "Start date cannot be after end date" });
    }

    // Create new workshop
    const newWorkshop = new workshops({
      title,
      description,
      image: workshopImage.path, // Save image path
      ImageID: workshopImage.filename, // Save image filename
      total_sessions,
      start_date,
      end_date,
      hall_id,
      no_of_attendees,
      price,
      speaker_id,
    });

    await newWorkshop.save();
    res.status(201).json({
      message: "Workshop created successfully",
      data: newWorkshop,
    });
  } catch (error) {
    console.error(error);
    console.error(err.stack); // Logs the error
    res
      .status(500)
      .json({ message: "Failed to create workshop", error: error.message });
  }
};

// Get all workshops
const getAllWorkshops = async (req, res) => {
  try {
    const getWorkshops = await workshops.find().populate("hall_id speaker_id");
    res
      .status(200)
      .json(
        getWorkshops.length ? getWorkshops : { message: "No workshops found" }
      );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch workshops", error: error.message });
  }
};

// Get a single workshop by ID
const getWorkshopById = async (req, res) => {
  try {
    const workshop = await workshops
      .findById(req.params.id)
      .populate("hall_id speaker_id");
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    res.status(200).json(workshop);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch workshop", error: error.message });
  }
};

// Update a workshop
const updateWorkshop = async (req, res) => {
  try {
    const {
      title,
      description,
      total_sessions,
      start_date,
      end_date,
      hall_id,
      no_of_attendees,
      price,
      speaker_id,
      oldImage,
      Imagefilename,
    } = req.body;
    const workshopImage = req.file; // Get the uploaded image if any
    let imagePath = oldImage;
    let imageID = Imagefilename;

    if (total_sessions && (isNaN(total_sessions) || total_sessions <= 0)) {
      return res
        .status(400)
        .json({ message: "Total sessions must be a positive number" });
    }

    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
      return res
        .status(400)
        .json({ message: "Start date cannot be after end date" });
    }

    const workshopToUpdate = await workshops.findById(req.params.id);
    if (!workshopToUpdate) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // If a new image is uploaded, delete the old one from Cloudinary
    if (workshopImage) {
      imagePath = workshopImage.path;
      imageID = workshopImage.filename;

      try {
        if (workshopToUpdate.ImageID) {
          req.body.OLDimageID = workshopToUpdate.ImageID; // Pass the ImageID to the next middleware
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

    const updatedWorkshop = await workshops.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(imagePath && { image: imagePath }),
          ...(imageID && { ImageID: imageID }),
          ...(total_sessions && { total_sessions }),
          ...(start_date && { start_date }),
          ...(end_date && { end_date }),
          ...(hall_id && { hall_id }),
          ...(no_of_attendees && { no_of_attendees }),
          ...(price && { price }),
          ...(speaker_id && { speaker_id }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json({
      message: "Workshop updated successfully",
      workshop: updatedWorkshop,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update workshop", error: error.message });
  }
};

// Delete a workshop
const deleteWorkshop = async (req, res) => {
  try {
    const workshopToDelete = await workshops.findById(req.params.id);
    if (!workshopToDelete) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Delete the image from Cloudinary if it exists
    if (workshopToDelete.ImageID) {
      try {
        req.body.OLDimageID = workshopToDelete.ImageID; // Pass the ImageID to the next middleware
        await ImageDelete(req, res, () => {});
      } catch (error) {
        console.error("Error deleting image:", error.message);
        return res
          .status(500)
          .json({ message: "Failed to delete image", error: error.message });
      }
    }

    // Delete the workshop
    await workshops.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Workshop deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete workshop", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createWorkshop,
  getAllWorkshops,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
};
