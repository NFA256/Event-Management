const mongoose = require("mongoose");

const Feedback_Schema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review is required"],
      minlength: [10, "Review should be at least 10 characters long"],
    },
    service: {
      type: String,
      required: [true, "Service is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Assuming you have a Registration model
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model
const feedbacks = mongoose.model("feedbacks", Feedback_Schema);

module.exports = feedbacks;
