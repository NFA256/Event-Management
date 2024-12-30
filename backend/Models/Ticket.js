const mongoose = require("mongoose");

const Ticket_Schema = mongoose.Schema(
  {
    seminar_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seminars",
    },
    workshop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workshops",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the user collection
      required: [true, "User ID is required"],
    },
    total_price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the Event model
const tickets = mongoose.model("tickets", Ticket_Schema);

module.exports = tickets;
