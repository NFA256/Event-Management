const express = require("express");
const router = express.Router();
const { createWorkshop, getAllWorkshops, getWorkshopById, updateWorkshop, deleteWorkshop } = require("../Controllers/WorkshopController");
const { ImageUpload } = require("../Middlewares/WorkshopImages");
const upload = ImageUpload(); // Image upload middleware

// Create workshop with image upload
router.route("/workshops")
  .post(upload.single('workshopImage'), createWorkshop)
  .get(getAllWorkshops);

// Update and delete workshop
router.route("/workshops/:id")
  .get(getWorkshopById)
  .put(upload.single('workshopImage'), updateWorkshop)
  .delete(deleteWorkshop);

module.exports = router;
