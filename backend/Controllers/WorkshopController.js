const workshops = require("../Models/Workshop");  // Import the Workshop model

// Create a new workshop
const createWorkshop = async (req, res) => {
  try {
    const { title, description, image, total_sessions, start_date, end_date, hall_id, no_of_attendees } = req.body;

    // Validate the incoming data
    if (!title || !description || !image || !total_sessions || !start_date || !end_date || !hall_id || !no_of_attendees) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(total_sessions) || total_sessions <= 0) {
      return res.status(400).json({ message: "Total sessions must be a positive number" });
    }

    if (new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({ message: "Start date cannot be after end date" });
    }

    const newWorkshop = new workshops({
      title,
      description,
      image,
      total_sessions,
      start_date,
      end_date,
      hall_id,
      no_of_attendees,
    });

    await newWorkshop.save();
    res.status(201).json({
      message: "Workshop created successfully",
      workshop: newWorkshop,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to create workshop", error: error.message });
  }
};

// Get all workshops
const getAllWorkshops = async (req, res) => {
  try {
    const getworkshops = await workshops.find();
    res.status(200).json(getworkshops.length ? getworkshops : { message: "No workshops found" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch workshops", error: error.message });
  }
};

// Get a single workshop by ID
const getWorkshopById = async (req, res) => {
  try {
    const workshop = await workshops.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    res.status(200).json(workshop);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch workshop", error: error.message });
  }
};

// Update a workshop
const updateWorkshop = async (req, res) => {
  try {
    const { title, description, image, total_sessions, start_date, end_date, hall_id, no_of_attendees } = req.body;

    // Ensure at least one field is provided for update
    if (!title && !description && !image && !total_sessions && !start_date && !end_date && !hall_id && !no_of_attendees) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    if (total_sessions && (isNaN(total_sessions) || total_sessions <= 0)) {
      return res.status(400).json({ message: "Total sessions must be a positive number" });
    }

    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({ message: "Start date cannot be after end date" });
    }

    const updatedWorkshop = await workshops.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(image && { image }),
          ...(total_sessions && { total_sessions }),
          ...(start_date && { start_date }),
          ...(end_date && { end_date }),
          ...(hall_id && { hall_id }),
          ...(no_of_attendees && { no_of_attendees }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json({
      message: "Workshop updated successfully",
      workshop: updatedWorkshop,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to update workshop", error: error.message });
  }
};

// Delete a workshop
const deleteWorkshop = async (req, res) => {
  try {
    const deletedWorkshop = await workshops.findByIdAndDelete(req.params.id);

    if (!deletedWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json({ message: "Workshop deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to delete workshop", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createWorkshop,
  getAllWorkshops,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
};
