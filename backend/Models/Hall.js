const mongoose = require("mongoose");

const Hall_Schema = mongoose.Schema(
  {
    hall_name: {
      type: String,
      required: [true, "Hall name is required"],
      trim: true,
    },
    // total_booths: {
    //   type: Number,
    //   required: [true, "Total booths count is required"],
    //   min: [1, "There must be at least one booth"],
    // },
    seminar_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seminars",
    },
    workshop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workshops",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the Hall model
const halls = mongoose.model("halls", Hall_Schema);

module.exports = halls;
