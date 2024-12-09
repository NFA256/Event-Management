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





// Import routes
const rolesRoutes = require("./Routes/rolesRoutes");
const usersRoutes = require("./Routes/usersRoutes");
const exhibitorRoutes = require("./Routes/exhibitorRoutes");
const eventRoutes = require("./Routes/eventRoutes");
const seminarRoutes = require("./Routes/seminarRoutes");
//--- CONTROLLER IMPORT-----ROLES TABLE------

// Use routes
app.use("/", rolesRoutes); // For role-related routes
app.use("/", usersRoutes); // For user-related routes
app.use("/", exhibitorRoutes); // For exhibitor-related routes
app.use("/", eventRoutes); // For event-related routes
app.use("/", seminarRoutes); // For seminar-related routes


//--------server listen

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectionDB() // invoking DB
})
