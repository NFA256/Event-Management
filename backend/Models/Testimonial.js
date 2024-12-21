const mongoose = require("mongoose");

const Testimonial_Schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
   
  },
  { timestamps: true }
);

const testimonials = mongoose.model("testimonials", Testimonial_Schema);

module.exports = testimonials;
