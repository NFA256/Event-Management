const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");

// Define routes for Users
router.route("/users")
  .post(createUser)
  .get(getAllUsers);

router.route("/users/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
