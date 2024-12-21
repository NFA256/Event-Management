const express = require("express");
const router = express.Router();
const { createSpeaker, getAllSpeakers, getSpeakerById, updateSpeaker, deleteSpeaker } = require("../Controllers/SpeakerController");
const { ImageUpload } = require("../Middlewares/ImageUploading");
const uploadSpeakerImage = ImageUpload("speakers");// Image upload middleware // Specify 'speakers' folder
const uploadSpeakerImage2 = ImageUpload("speakers");// Image upload middleware // Specify 'speakers' folder

// Create speaker with image upload
router.route("/speakers")
  .post(uploadSpeakerImage.single('image'), createSpeaker)
  .get(getAllSpeakers);

// Update and delete speaker
router.route("/speakers/:id")
  .get(getSpeakerById)
  .put(uploadSpeakerImage2.single('image'), updateSpeaker)
  .delete(deleteSpeaker);

module.exports = router;
