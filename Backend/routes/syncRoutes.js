const express = require("express");
const { syncSensorData } = require("../controllers/syncController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sync
 *   description: API for syncing sensor data from Firebase to MongoDB
 */

/**
 * @swagger
 * /sync:
 *   get:
 *     summary: Sync sensor data
 *     tags: [Sync]
 *     description: Fetches sensor data from Firebase Realtime Database and syncs it with the MongoDB database. Only sensors with a matching sensorTag in MongoDB are processed.
 *     responses:
 *       200:
 *         description: Data synced successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Data synced successfully."
 *       404:
 *         description: No sensor data found in Firebase.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "No sensor data found in Firebase."
 *       500:
 *         description: Error syncing data.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error syncing data."
 */
router.get("/", syncSensorData);

module.exports = router;
