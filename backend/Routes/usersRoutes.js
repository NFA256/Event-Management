const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  updateUserRole,
  login,
} = require("../Controllers/UserController");

// Define routes for Users
router.route("/users")
  .post(createUser)
  .get(getAllUsers);

router.route("/users/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
router.route("/userRole/:id")
.put(updateUserRole);
  
  router.route("/users/email/:email").get(getUserByEmail);
  router.route("/user-login").post(login);

module.exports = router;
