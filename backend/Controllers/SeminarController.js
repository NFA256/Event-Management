const seminars = require('../Models/Seminar');  // Import the Seminar model

// Create a new seminar
const createSeminar = async (req, res) => {
  try {
    const { date, title, purpose, start_time, end_time, capacity,price,is_paid, speaker_id, hall_id } = req.body;

    if (!date || !title || !purpose || !start_time || !end_time || !capacity || !speaker_id || !hall_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSeminar = new seminars({
      date,
      title,
      purpose,
      start_time,
      end_time,
      capacity,
      speaker_id,
      hall_id,
      price,
      is_paid,
    });

    await newSeminar.save();
    res.status(201).json({
      message: "Seminar created successfully",
      seminar: newSeminar,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create seminar", error: error.message });
  }
};

// Get all seminars
const getAllSeminars = async (req, res) => {
  try {
    const getSeminars = await seminars.find().populate('speaker_id').populate('hall_id');
    res.status(200).json(getSeminars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seminars", error: error.message });
  }
};

// Get a single seminar by ID
const getSeminarById = async (req, res) => {
  try {
    const getSeminar = await seminars.findById(req.params.id).populate('speaker_id').populate('hall_id');
    if (!seminar) {
      return res.status(404).json({ message: "Seminar not found" });
    }
    res.status(200).json(getSeminar);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seminar", error: error.message });
  }
};

// Update a seminar
const updateSeminar = async (req, res) => {
  try {
    const { date, title, purpose, start_time, end_time, capacity, price,is_paid, speaker_id, hall_id  } = req.body;

    // Ensure at least one field is provided for update
    if (!date && !title && !purpose && !start_time && !end_time && !capacity && !speaker_id && !hall_id) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const updatedSeminar = await seminars.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(date && { date }),
          ...(title && { title }),
          ...(purpose && { purpose }),
          ...(start_time && { start_time }),
          ...(end_time && { end_time }),
          ...(capacity && { capacity }),
          ...(speaker_id && { speaker_id }),
          ...(hall_id && { hall_id }),
          ...(is_paid && { is_paid }),
          ...(price && { price }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedSeminar) {
      return res.status(404).json({ message: "Seminar not found" });
    }

    res.status(200).json({
      message: "Seminar updated successfully",
      seminar: updatedSeminar,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update seminar", error: error.message });
  }
};

// Delete a seminar
const deleteSeminar = async (req, res) => {
  try {
    const deletedSeminar = await seminars.findByIdAndDelete(req.params.id);

    if (!deletedSeminar) {
      return res.status(404).json({ message: "Seminar not found" });
    }

    res.status(200).json({ message: "Seminar deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete seminar", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createSeminar,
  getAllSeminars,
  getSeminarById,
  updateSeminar,
  deleteSeminar,
};
