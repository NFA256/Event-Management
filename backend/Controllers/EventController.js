const events = require("../Models/Event");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, time, date, no_of_visitors, image ,status } = req.body;

    if (!title || !description || !time || !date || !no_of_visitors || !image , !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new events({
      title,
      description,
      time,
      date,
      no_of_visitors,
      image,
      status
    });

    await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const getevents = await events.find();
    res.status(200).json(getevents.length ? getevents : { message: "No events found" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch events", error: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const getevent = await events.findById(req.params.id);
    if (!getevent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(getevent);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to fetch event", error: error.message });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { title, description, time, date, no_of_visitors, image,status } = req.body;

    // Ensure at least one field is provided for update
    if (!title && !description && !time && !date && !no_of_visitors && !image && !status) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const updatedEvent = await events.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(time && { time }),
          ...(date && { date }),
          ...(no_of_visitors && { no_of_visitors }),
          ...(image && { image }),
          ...(status && { status }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await events.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
