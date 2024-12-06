const express = require("express");
const app = express();
const cors =require("cors")

//----------env connect
require("dotenv").config();

// --- MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//-----db connect
const {connectionDB} = require("./Config/Database");

//--- CONTROLLER IMPORT-----ROLES TABLE------



//----------------------  ROLES CONTROLLER ROUTING   ---------------
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} = require("./Controllers/RolesController");



// Create role
app.route("/roles").post(createRole);

// Get all roles
app.route("/roles").get(getAllRoles);

// Get single role by ID
app.route("/roles/:id").get(getRoleById);

// Update role by ID
app.route("/roles/:id").put(updateRole);

// Delete role by ID
app.route("/roles/:id").delete(deleteRole);


//----------------------  USER ACCOUNT CONTROLLER ROUTING   ---------------
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./Controllers/UserController");



// Create role
app.route("/users").post(createUser);

// Get all roles
app.route("/users").get(getAllUsers);

// Get single role by ID
app.route("/users/:id").get(getUserById);

// Update role by ID
app.route("/users/:id").put(updateUser);

// Delete role by ID
app.route("/users/:id").delete(deleteUser);




//--------server listen

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectionDB() // invoking DB
})
