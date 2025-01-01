const mongoose = require("mongoose");

const Booth_Schema = mongoose.Schema(
  {
    // hall_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "halls", // Assuming you have a Halls model
    //   required: [true, "Hall ID is required"],
    // },
    name:{
      type:String ,
      required: [true, "Booth Name  is required"],
    },
    floor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "floors", // Assuming you have a Floors model
      required: [true, "Floor ID is required"],
    },
   
    reserved_bool: {
      type: Boolean,
      default: false, // Defaults to false, meaning not reserved
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model
const booths = mongoose.model("booths", Booth_Schema);

module.exports = booths;
