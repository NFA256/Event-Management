const express = require("express");
const router = express.Router();
const {ImageUpload,ImageDelete} = require("../Middlewares/EventImages");
const upload = ImageUpload();
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


const upload2 = ImageUpload();

router.route("/events/:id")
  .get(getEventById)
  .put(upload2.single('eventImage'),updateEvent)
  .delete(deleteEvent);

module.exports = router;
