const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require("../Controllers/ScheduleController");

// Define routes for Schedules
router
  .route("/schedules")
  .post(createSchedule) // Create a schedule
  .get(getAllSchedules); // Get all schedules

router
  .route("/schedules/:id")
  .get(getScheduleById) // Get a specific schedule by ID
  .put(updateSchedule) // Update a schedule
  .delete(deleteSchedule); // Delete a schedule

module.exports = router;
