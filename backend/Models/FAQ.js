const mongoose = require("mongoose");

const FAQ_Schema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model
const FAQs = mongoose.model("FAQs", FAQ_Schema);

module.exports = FAQs;
