const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../Controllers/EventController");

// Define routes for Events
router.route("/events")
  .post(createEvent)
  .get(getAllEvents);

router.route("/events/:id")
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;
