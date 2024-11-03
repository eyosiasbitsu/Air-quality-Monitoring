const express = require("express");
const { syncSensorData } = require("../controllers/syncController");

const router = express.Router();

// Route to sync sensor data from Firebase to MongoDB
router.get("/", syncSensorData);

module.exports = router;
