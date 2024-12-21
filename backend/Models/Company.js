const mongoose = require("mongoose");

const Company_Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    ImageID: { 
      type:String 
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the Company model
const Company = mongoose.model("Company", Company_Schema);

module.exports = Company;
