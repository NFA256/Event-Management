const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  createSeminar,
  getAllSeminars,
  getSeminarById,
  updateSeminar,
  deleteSeminar,
} = require("../Controllers/SeminarController");

// Define routes for Seminars
router.route("/seminars")
  .post(createSeminar)
  .get(getAllSeminars);

router.route("/seminars/:id")
  .get(getSeminarById)
  .put(updateSeminar)
  .delete(deleteSeminar);

module.exports = router;
