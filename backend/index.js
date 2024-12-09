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





//----------------------  EXHIBITOR CONTROLLER ROUTING   ---------------
const {
   createExhibitor,
  getAllExhibitors,
  getExhibitorById,
  updateExhibitor,
  deleteExhibitor,
} = require("./Controllers/ExhibitorController");



// Create role
app.route("/exhibitors").post(createExhibitor);

// Get all roles
app.route("/exhibitors").get(getAllExhibitors);

// Get single role by ID
app.route("/exhibitors/:id").get(getExhibitorById);

// Update role by ID
app.route("/exhibitors/:id").put(updateExhibitor);

// Delete role by ID
app.route("/exhibitors/:id").delete(deleteExhibitor);




//----------------------  EVENT CONTROLLER ROUTING   ---------------
const {
 createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("./Controllers/EventController");



// Create role
app.route("/events").post(createEvent);

// Get all roles
app.route("/events").get(getAllEvents);

// Get single role by ID
app.route("/events/:id").get(getEventById);

// Update role by ID
app.route("/events/:id").put(updateEvent);

// Delete role by ID
app.route("/events/:id").delete(deleteEvent);




//--------server listen

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectionDB() // invoking DB
})
