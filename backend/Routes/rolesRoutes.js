const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} = require("../Controllers/RolesController");

// Define routes for Roles
router.route("/roles")
  .post(createRole)
  .get(getAllRoles);

router.route("/roles/:id")
  .get(getRoleById)
  .put(updateRole)
  .delete(deleteRole);

module.exports = router;
