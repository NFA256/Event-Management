const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController"); // Adjust path as needed

// Route to create a new contact message
router.post("/contacts", contactController.createContact);

// Route to get all contact messages
router.get("/contacts", contactController.getAllContacts);

// Route to get a contact message by ID
router.get("/contacts/:id", contactController.getContactById);

// Route to update a contact message by ID
router.put("/contacts/:id", contactController.updateContact);

// Route to delete a contact message by ID
router.delete("/contacts/:id", contactController.deleteContact);

module.exports = router;
