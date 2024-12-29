const events = require("../Models/Event");
const { ImageDelete } = require("../Middlewares/ImageUploading");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, time, date, no_of_visitors, status, schedule_id } = req.body;
    const eventImage = req.file;

    // Check if event image is provided
    if (!eventImage) {
      return res.status(400).json({ message: "Event image is required" });
    }

    const Event_Image = eventImage.path;
    const fileID = eventImage.filename;

    // Check if all required fields are provided
    if (!title || !description || !time || !date || !no_of_visitors || !status || !schedule_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new events({
      title,
      description,
      time,
      date,
      no_of_visitors,
      image: Event_Image,
      ImageID: fileID,
      status,
      schedule_id, // Add schedule_id to the event
    });

    await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const getevents = await events.find();
    res.status(200).json(getevents.length ? getevents : { message: "No events found" });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Failed to fetch event", error: error.message });
  }
};
// Get a single event by ID
const getEventByScheduleId = async (req, res) => {
  try {
    const events = await events.find({ schedule_id: req.params.scheduleId });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { title, description, time, date, no_of_visitors, oldImage, Imagefilename, status, schedule_id } = req.body;
    const eventImage = req.file;
    let Event_Image;
    let fileID;

    // Find the event by ID
    const eventToUpdate = await events.findById(req.params.id);
    if (!eventToUpdate) {
      return res.status(404).json({ message: "Event not found" });
    }

    // If a new image is uploaded, handle old image deletion
    if (eventImage) {
      Event_Image = eventImage.path;
      fileID = eventImage.filename;

      if (eventToUpdate.ImageID) {
        try {
          req.body.OLDimageID = eventToUpdate.ImageID;
          await ImageDelete(req, res, () => {});
        } catch (error) {
          console.error("Error deleting old image:", error.message);
          return res.status(500).json({ message: "Failed to delete old image", error: error.message });
        }
      }
    } else {
      // If no new image is uploaded, retain the old image
      Event_Image = oldImage;
      fileID = Imagefilename;
    }

    // Ensure at least one field is provided for update
    if (!title && !description && !time && !date && !no_of_visitors && !status && !schedule_id && !eventImage) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    // Update the event with new data
    const updatedEvent = await events.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(time && { time }),
          ...(date && { date }),
          ...(no_of_visitors && { no_of_visitors }),
          ...(Event_Image && { image: Event_Image }),
          ...(fileID && { ImageID: fileID }),
          ...(status && { status }),
          ...(schedule_id && { schedule_id }), // Include schedule_id in update
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
    console.error(error);
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await events.findById(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete the associated image from Cloudinary
    if (deletedEvent.ImageID) {
      try {
        req.body.OLDimageID = deletedEvent.ImageID;
        await ImageDelete(req, res, () => {});
      } catch (error) {
        console.error("Error deleting old image:", error.message);
        return res.status(500).json({ message: "Failed to delete old image", error: error.message });
      }
    }

    await events.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
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
  getEventByScheduleId
};
