// Import the Testimonial model
const testimonials = require("../Models/Testimonial");
const { ImageDelete } = require("../Middlewares/ImageUploading");

// Create a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { username, feedback } = req.body;
    const imageFile = req.file;

    if (!username || !feedback || !imageFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = imageFile.path;
    const ImageID = imageFile.filename;

    const newTestimonial = new testimonials({
      username,
      feedback,
      image,
      ImageID,
    });

    await newTestimonial.save();
    res.status(201).json({
      message: "Testimonial created successfully",
      testimonial: newTestimonial,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create testimonial", error: error.message });
  }
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const allTestimonials = await testimonials.find();
    if (allTestimonials.length > 0) {
      res.status(200).json(allTestimonials);
    } else {
      res.status(404).json({ message: "No testimonials found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials", error: error.message });
  }
};

// Get a specific testimonial by ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonials.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonial", error: error.message });
  }
};

// Update a testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { username, feedback, oldImage, oldImageID } = req.body;
    const imageFile = req.file;

    let updatedImage;
    let updatedImageID;
 // Find the event by ID
 const testimonialToUpdate = await testimonials.findById(req.params.id);
 if (!testimonialToUpdate) {
   return res.status(404).json({ message: "Event not found" });
 }
    if (imageFile) {
      updatedImage = imageFile.path;
      updatedImageID = imageFile.filename;

      // Delete the old image from Cloudinary
      if (testimonialToUpdate.ImageID) {
        try {
          req.body.OLDimageID = testimonialToUpdate.ImageID;  // Pass the ImageID to the next middleware
          await ImageDelete(req, res, () => {});  // Call ImageDelete with the updated req.body
        } catch (error) {
          console.error("Error deleting old image:", error.message);
          return res.status(500).json({ message: "Failed to delete old image", error: error.message });
        }
      }
    } else {
      updatedImage = oldImage;
      updatedImageID = oldImageID;
    }

    const updatedTestimonial = await testimonials.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(username && { username }),
          ...(feedback && { feedback }),
          ...(updatedImage && { image: updatedImage }),
          ...(updatedImageID && { ImageID: updatedImageID }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      message: "Testimonial updated successfully",
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update testimonial", error: error.message });
  }
};

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
  try {

    const deletedTestimonial = await testimonials.findById(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Delete the associated image from Cloudinary
    if (deletedTestimonial.ImageID) {
      try {
        req.body.OLDimageID = deletedTestimonial.ImageID;  // Pass the ImageID to the next middleware
        await ImageDelete(req, res, () => {});  // Call ImageDelete with the updated req.body
      } catch (error) {
        console.error("Error deleting old image:", error.message);
        return res.status(500).json({ message: "Failed to delete old image", error: error.message });
      }
    }
    await testimonials.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
