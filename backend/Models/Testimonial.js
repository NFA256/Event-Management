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
<<<<<<< HEAD
   
=======
    ImageID: { 
      type:String 
    },
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: [true, "User ID is required"],
    // },
>>>>>>> a44e02d77bd439f607e7acaabbdeda6051b19448
  },
  { timestamps: true }
);

const testimonials = mongoose.model("testimonials", Testimonial_Schema);

module.exports = testimonials;
