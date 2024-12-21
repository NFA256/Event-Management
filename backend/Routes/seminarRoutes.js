const express = require("express");
const router = express.Router();
const { createSeminar, getAllSeminars, getSeminarById, updateSeminar, deleteSeminar } = require("../Controllers/SeminarController");
const { ImageUpload } = require("../Middlewares/ImageUploading");
const upload = ImageUpload("seminars"); // Image upload middleware
const upload2 = ImageUpload("seminars"); // Image upload middleware

// Create seminar with image upload
router.route("/seminars")
  .post(upload.single('seminarImage'), createSeminar)
  .get(getAllSeminars);

// Update and delete seminar
router.route("/seminars/:id")
  .get(getSeminarById)
  .put(upload2.single('seminarImage'), updateSeminar)
  .delete(deleteSeminar);

module.exports = router;
