const sessions = require("../Models/Session"); // Import the Session model
const workshops = require("../Models/Workshop"); // Import the Workshop model

// Helper function to check for time conflicts
const checkTimeConflict = async (workshop_id, day_no, date, start_time, end_time) => {
  const conflictingSession = await sessions.findOne({
    workshop_id,
    day_no,
    date,
    $or: [
      { start_time: { $lt: end_time }, end_time: { $gt: start_time } }, // Times overlap
    ],
  });
  return conflictingSession;
};

// Create a new session
const createSession = async (req, res) => {
  try {
    const { workshop_id,title, day_no,duration, date, start_time, end_time } = req.body;

    // Validate the input data
    if (!workshop_id ||!title || !day_no || !date || !start_time || !end_time ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the workshop exists
    const workshop = await workshops.findById(workshop_id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Check for time conflicts with the same workshop and day
    const timeConflict = await checkTimeConflict(workshop_id, day_no, date, start_time, end_time);
    if (timeConflict) {
      return res.status(400).json({ message: "Time conflict with another session" });
    }

    const newSession = new sessions({
      workshop_id,
      title,
      day_no,
      date,
      start_time,
      end_time,
      duration,
    });

    await newSession.save();
    res.status(201).json({
      message: "Session created successfully",
      session: newSession,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to create session", error: error.message });
  }
};

// Get all sessions
const getAllSessions = async (req, res) => {
  try {
    const allSessions = await sessions.find().populate('workshop_id');
    res.status(200).json(allSessions.length ? allSessions : { message: "No sessions found" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch sessions", error: error.message });
  }
};

// Get a single session by ID
const getSessionById = async (req, res) => {
  try {
    const session = await sessions.findById(req.params.id).populate('workshop_id');
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch session", error: error.message });
  }
};

// Update a session
const updateSession = async (req, res) => {
  try {
    const {  workshop_id,title, day_no,duration, date, start_time, end_time } = req.body;

    if (!day_no && !date && !start_time && !end_time ) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    // Check for time conflicts with the same workshop and day
    const sessionToUpdate = await sessions.findById(req.params.id);
    if (!sessionToUpdate) {
      return res.status(404).json({ message: "Session not found" });
    }

    const timeConflict = await checkTimeConflict(
      sessionToUpdate.workshop_id,
      day_no || sessionToUpdate.day_no,
      date || sessionToUpdate.date,
      start_time || sessionToUpdate.start_time,
      end_time || sessionToUpdate.end_time
    );
    if (timeConflict) {
      return res.status(400).json({ message: "Time conflict with another session" });
    }

    const updatedSession = await sessions.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(title && { title }),
          ...(date && { date }),
          ...(start_time && { start_time }),
          ...(end_time && { end_time }),
          ...(duration && { duration }),
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Session updated successfully",
      session: updatedSession,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to update session", error: error.message });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  try {
    const deletedSession = await sessions.findByIdAndDelete(req.params.id);

    if (!deletedSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to delete session", error: error.message });
  }
};
// Delete a session
const deleteSessionsByWorkshopID = async (req, res) => {
  const { workshop_id } = req.params;  // Correctly destructure from req.params

  try {
    // Delete all sessions associated with the given workshop_id
    const result = await sessions.deleteMany({ workshop_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No sessions found to delete" });
    }

    res.status(200).json({ message: `${result.deletedCount} session(s) deleted successfully` });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to delete sessions", error: error.message });
  }
};
// Export CRUD functions
module.exports = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  deleteSessionsByWorkshopID,
};
