const schedules = require("../Models/Schedule"); // Import the Schedule model
// Backend (API controller to fetch events, workshops, and seminars by schedule ID)
const events = require("../Models/Event");
const workshops = require("../Models/Workshop");
const seminars = require("../Models/Seminar");
// Create a new schedule
const createSchedule = async (req, res) => {
  try {
    const { start_date, end_date, reserved_for } = req.body;

    // Validate required fields
    if (!start_date || !end_date || !reserved_for) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a schedule already exists for the given date range and reserved_for type
    let existingSchedule = await schedules.findOne({
      start_date: { $lte: new Date(end_date) },
      end_date: { $gte: new Date(start_date) },
    });

    if (existingSchedule) {
      // Customized error messages based on the conflict
      const conflictMessage = `The dates are already booked with a ${existingSchedule.reserved_for.toLowerCase()}.`;
      return res.status(400).json({ message: conflictMessage });
    }

    // Create the new schedule
    const newSchedule = new schedules({ start_date, end_date, reserved_for });
    await newSchedule.save();

    res.status(201).json({
      message: "Schedule created successfully",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create schedule", error: error.message });
  }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const allSchedules = await schedules.find();

    if (allSchedules.length === 0) {
      return res.status(404).json({ message: "No schedules found" });
    }

    res.status(200).json(allSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch schedules", error: error.message });
  }
};
// Get all schedules
const getlatestSchedule = async (req, res) => {
  try {
    const allSchedules = await schedules.findOne().sort({ start_date: 1 }).limit(1);  ;

    if (allSchedules.length === 0) {
      return res.status(404).json({ message: "No schedules found" });
    }

    res.status(200).json(allSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch schedules", error: error.message });
  }
};

// Get a single schedule by ID
const getScheduleById = async (req, res) => {
  try {
    const schedule = await schedules.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch schedule", error: error.message });
  }
};

// Update a schedule
const updateSchedule = async (req, res) => {
  try {
    const { start_date, end_date, reserved_for } = req.body;

    if (!start_date && !end_date && !reserved_for) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    let existingSchedule = await schedules.findOne({
      _id: { $ne: req.params.id },
      start_date: { $lte: new Date(end_date) },
      end_date: { $gte: new Date(start_date) },
    });

    if (existingSchedule) {
      // Customized error messages based on the conflict
      const conflictMessage = `The dates are already booked with a ${existingSchedule.reserved_for.toLowerCase()}.`;
      return res.status(400).json({ message: conflictMessage });
    }

    const updatedSchedule = await schedules.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(start_date && { start_date }), ...(end_date && { end_date }), ...(reserved_for && { reserved_for }) } },
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      message: "Schedule updated successfully",
      schedule: updatedSchedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update schedule", error: error.message });
  }
};

// Delete a schedule
const deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await schedules.findByIdAndDelete(req.params.id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete schedule", error: error.message });
  }
};



// Export CRUD functions
module.exports = {
  createSchedule,
  getAllSchedules,
  getlatestSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
