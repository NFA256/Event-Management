const express = require("express");
const app = express();
const cors = require("cors");

//----------env connect
require("dotenv").config();

// --- MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//-----db connect
const { connectionDB } = require("./Config/Database");

//-----------------------ROUTES------------------------//

// Import routes
const rolesRoutes = require("./Routes/rolesRoutes");
const usersRoutes = require("./Routes/usersRoutes");
const exhibitorRoutes = require("./Routes/exhibitorRoutes");
const eventRoutes = require("./Routes/eventRoutes");
const seminarRoutes = require("./Routes/seminarRoutes");
const hallRoutes = require("./Routes/hallsRoutes");
const floorRoutes = require("./Routes/floorRoutes");
const workshopRoutes = require("./Routes/workshopsRoutes");
const sessionRoutes = require("./Routes/sessionsRoute");
const speakerRoutes = require("./Routes/speakerRoute");
const testimonialRoutes = require("./Routes/testimonialRoutes");
const feedbackRoutes = require("./Routes/feedbackRoutes");
const boothRoutes = require("./Routes/boothRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const companyRoutes = require("./Routes/companyRoutes");
const ticketRoutes = require("./Routes/ticketRoutes");
const informationRoutes = require("./Routes/InfoRoutes");
const faqRoutes = require("./Routes/faqRoutes");
const scheduleRoutes = require("./Routes/scheduleRoutes");
const BookingRoutes = require("./Routes/bookingRoutes");







//--- CONTROLLER IMPORT-----------//

// Use routes
app.use("/", rolesRoutes); // For role-related routes
app.use("/", usersRoutes); // For user-related routes
app.use("/", exhibitorRoutes); // For exhibitor-related routes
app.use("/", eventRoutes); // For event-related routes
app.use("/", seminarRoutes); // For seminar-related routes
app.use("/", hallRoutes); // For halls-related routes
app.use("/", floorRoutes); // For floor-related routes
app.use("/", workshopRoutes); // For worKshop-related routes
app.use("/", sessionRoutes); // For session-related routes
app.use("/", speakerRoutes); // For speaker-related routes
app.use("/", testimonialRoutes); // For testimonial-related routes
app.use("/", feedbackRoutes); // For feedback-related routes
app.use("/", boothRoutes); // For feedback-related routes
app.use("/", contactRoutes); // For contact-related routes
app.use("/", informationRoutes); // For info-related routes
app.use("/", faqRoutes); // For faq-related routes
app.use("/", scheduleRoutes); // For schedule-related routes
app.use("/", boothRoutes); // For BooK-related routes





//--------server listen

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectionDB(); // invoking DB
});
