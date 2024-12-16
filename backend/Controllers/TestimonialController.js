// Import the Testimonial model
const testimonials = require("../Models/Testimonial");

// Create a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { username, feedback, date, time, image, user_id } = req.body;

    if (!username || !feedback || !date || !time || !image || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const newTestimonial = new testimonials({
      username,
      feedback,
      date,
      time,
      image,
      user_id,
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
    const allTestimonials = await testimonials.find().populate("user_id");
    res.status(200).json(allTestimonials.length ? allTestimonials : { message: "No testimonials found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials", error: error.message });
  }
};

// Get a specific testimonial by ID
const getTestimonialById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Testimonial ID" });
    }

    const testimonial = await testimonials.findById(req.params.id).populate("user_id");
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Testimonial ID" });
    }

    const { username, feedback, date, time, image } = req.body;

    const updatedTestimonial = await testimonials.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(username && { username }),
          ...(feedback && { feedback }),
          ...(date && { date }),
          ...(time && { time }),
          ...(image && { image }),
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Testimonial ID" });
    }

    const deletedTestimonial = await testimonials.findByIdAndDelete(req.params.id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

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
