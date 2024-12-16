const mongoose = require("mongoose");
const contacts = require("../Models/Contact"); // Adjust the path to your model

// Create a new contact message
const createContact = async (req, res) => {
  try {
    const { user_id, subject, message } = req.body;

    // Validate the data
    if (!user_id || !subject || !message) {
      return res.status(400).json({ message: "All fields (user_id, subject, message) are required" });
    }

    // Create a new contact message
    const newContact = new contacts({
      user_id,
      subject,
      message,
    });

    // Save the contact message to the database
    await newContact.save();
    res.status(201).json({
      message: "Contact message created successfully",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact message", error: error.message });
  }
};

// Get all contact messages
const getAllContacts = async (req, res) => {
  try {
    const allContacts = await contacts.find().populate("user_id");
    res.status(200).json(allContacts.length ? allContacts : { message: "No contact messages found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact messages", error: error.message });
  }
};

// Get a specific contact message by ID
const getContactById = async (req, res) => {
  try {
    const contact = await contacts.findById(req.params.id).populate("user_id");

    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact message", error: error.message });
  }
};

// Update a contact message by ID
const updateContact = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Contact ID" });
    }

    const updatedContact = await contacts.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(subject && { subject }),
          ...(message && { message }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    res.status(200).json({
      message: "Contact message updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact message", error: error.message });
  }
};

// Delete a contact message by ID
const deleteContact = async (req, res) => {
  try {
    const contact = await contacts.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    res.status(200).json({ message: "Contact message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact message", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
