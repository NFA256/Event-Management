const express = require("express");
const router = express.Router();

const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  deleteSessionsByWorkshopID
} = require("../Controllers/SessionController");

// Routes for sessions
router.route("/sessions")
  .post(createSession)
  .get(getAllSessions);

router.route("/sessions/:id")
  .get(getSessionById)
  .put(updateSession)
  .delete(deleteSession);
router.route("/sessions-by-workshop-id/:workshop_id")
  .delete(deleteSessionsByWorkshopID);

module.exports = router;
