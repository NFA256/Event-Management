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
  getEventByScheduleId
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
router.route("/events/:scheduleId")
  .get(getEventByScheduleId)

module.exports = router;
