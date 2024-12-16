
const feedbacks = require("../Models/Feedback"); // Assuming the model is in the Feedback.js file

// Create a new feedback
const createFeedback = async (req, res) => {
  try {
    const { review, service, user_id } = req.body;

    // Validate required fields
    if (!review || !service || !user_id) {
      return res.status(400).json({ message: "Review, Service, and User ID are required" });
    }

    // Validate user_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    // Create a new feedback
    const newFeedback = new feedbacks({
      review,
      service,
      user_id,
    });

    // Save to database
    await newFeedback.save();

    res.status(201).json({
      message: "Feedback created successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create feedback", error: error.message });
  }
};

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const getfeedbacks = await feedbacks.find().populate("user_id");
    res.status(200).json(getfeedbacks.length ? feedbacks : { message: "No feedbacks found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedbacks", error: error.message });
  }
};

// Get a specific feedback by ID
const getFeedbackById = async (req, res) => {
  try {
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Feedback ID" });
    }

    const feedback = await feedbacks.findById(req.params.id).populate("user_id");

    // If feedback is not found
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback", error: error.message });
  }
};

// Update a feedback
const updateFeedback = async (req, res) => {
  try {
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Feedback ID" });
    }

    const { review, service } = req.body;

    const updatedFeedback = await feedbacks.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(review && { review }),
          ...(service && { service }),
        },
      },
      { new: true, runValidators: true }
    );

    // If the feedback is not found
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update feedback", error: error.message });
  }
};

// Delete a feedback
const deleteFeedback = async (req, res) => {
  try {
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Feedback ID" });
    }

    const deletedFeedback = await feedbacks.findByIdAndDelete(req.params.id);

    // If the feedback is not found
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete feedback", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
