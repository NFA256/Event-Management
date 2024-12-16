const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  createFloor,
  getAllFloors,
  getFloorById,
  updateFloor,
  deleteFloor,
} = require("../Controllers/FloorController");

// Define routes for Floors
router.route("/floors")
  .post(createFloor)
  .get(getAllFloors);

router.route("/floors/:id")
  .get(getFloorById)
  .put(updateFloor)
  .delete(deleteFloor);

module.exports = router;
