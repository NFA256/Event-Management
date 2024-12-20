const express = require("express");
const router = express.Router();
const {ImageUpload,ImageDelete} = require("../Middlewares/ImageUploading");
const upload = ImageUpload("events");
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
  .post(upload.single('eventImage'),createEvent)
  .get(getAllEvents);


const upload2 = ImageUpload("events");

router.route("/events/:id")
  .get(getEventById)
  .put(upload2.single('eventImage'),updateEvent)
  .delete(deleteEvent);

module.exports = router;
