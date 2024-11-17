/**
 * @swagger
 * tags:
 *   name: SensorData
 *   description: API for sensor data operations
 */

const express = require('express');
const router = express.Router();
const {
    getAllSensorData,
    getSensorDataById,
    createSensorData,
    updateSensorData,
    deleteSensorData,
    getSensorDataByLocation,
    getSensorDataByTimeFrame,
} = require('../controllers/sensorDataController.js');

/**
 * @swagger
 * /sensorData:
 *   get:
 *     summary: Retrieve all sensor data
 *     tags: [SensorData]
 *     responses:
 *       200:
 *         description: List of all sensor data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "63f2c8f4e4b0f1c21d123abc"
 *                   temperature:
 *                     type: string
 *                     example: "25.3"
 *                   humidity:
 *                     type: string
 *                     example: "60.0"
 *                   latitude:
 *                     type: string
 *                     example: "38.74"
 *                   longitude:
 *                     type: string
 *                     example: "9.03"
 *                   pm25:
 *                     type: string
 *                     example: "15.5"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-16T11:35:00Z"
 *                   sensorTag:
 *                     type: string
 *                     example: "sensor-001"
 */
router.get('/', getAllSensorData);

/**
 * @swagger
 * /sensorData/{id}:
 *   get:
 *     summary: Retrieve sensor data by its ID
 *     tags: [SensorData]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the sensor data
 *         example: "63f2c8f4e4b0f1c21d123abc"
 *     responses:
 *       200:
 *         description: Details of the sensor data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "63f2c8f4e4b0f1c21d123abc"
 *                 temperature:
 *                   type: string
 *                   example: "25.3"
 *                 humidity:
 *                   type: string
 *                   example: "60.0"
 *                 latitude:
 *                   type: string
 *                   example: "38.74"
 *                 longitude:
 *                   type: string
 *                   example: "9.03"
 *                 pm25:
 *                   type: string
 *                   example: "15.5"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T11:35:00Z"
 *                 sensorTag:
 *                   type: string
 *                   example: "sensor-001"
 *       404:
 *         description: Sensor data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sensor data not found"
 */
router.get('/:id', getSensorDataById);

/**
 * @swagger
 * /sensorData/locate:
 *   get:
 *     summary: Retrieve sensor data by location
 *     tags: [SensorData]
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *         required: true
 *         description: Latitude for the location
 *         example: "38.74"
 *       - in: query
 *         name: lng
 *         schema:
 *           type: string
 *         required: true
 *         description: Longitude for the location
 *         example: "9.03"
 *     responses:
 *       200:
 *         description: Sensor data for the specified location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "63f2c8f4e4b0f1c21d123abc"
 *                   temperature:
 *                     type: string
 *                     example: "25.3"
 *                   humidity:
 *                     type: string
 *                     example: "60.0"
 *                   latitude:
 *                     type: string
 *                     example: "38.74"
 *                   longitude:
 *                     type: string
 *                     example: "9.03"
 *                   pm25:
 *                     type: string
 *                     example: "15.5"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-16T11:35:00Z"
 *                   sensorTag:
 *                     type: string
 *                     example: "sensor-001"
 *       404:
 *         description: No nearby sensors found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No nearby sensors found"
 */

router.get('/locate', getSensorDataByLocation);

/**
 * @swagger
 * /sensorData/search:
 *   post:
 *     summary: Retrieve sensor data by location and time frame
 *     tags: [SensorData]
 *     description: Retrieve sensor data for the nearest sensor based on the provided latitude, longitude, and time frame from the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: string
 *                 description: Latitude for the location
 *                 example: "38.74"
 *               lng:
 *                 type: string
 *                 description: Longitude for the location
 *                 example: "9.03"
 *               timeFrame:
 *                 type: string
 *                 description: Time frame for filtering sensor data
 *                 enum: [daily, weekly, monthly]
 *                 example: "weekly"
 *     responses:
 *       200:
 *         description: Sensor data within the time frame for the location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "63f2c8f4e4b0f1c21d123abc"
 *                   temperature:
 *                     type: string
 *                     example: "25.3"
 *                   humidity:
 *                     type: string
 *                     example: "60.0"
 *                   latitude:
 *                     type: string
 *                     example: "38.74"
 *                   longitude:
 *                     type: string
 *                     example: "9.03"
 *                   pm25:
 *                     type: string
 *                     example: "15.5"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-16T11:35:00Z"
 *                   sensorTag:
 *                     type: string
 *                     example: "sensor-001"
 *       400:
 *         description: Invalid parameters or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide latitude, longitude, and timeFrame"
 *       404:
 *         description: No nearby sensors or sensor data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No nearby sensors found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/search', getSensorDataByTimeFrame);

/**
 * @swagger
 * /sensorData:
 *   post:
 *     summary: Create new sensor data
 *     tags: [SensorData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: string
 *                 example: "25.3"
 *               humidity:
 *                 type: string
 *                 example: "60.0"
 *               latitude:
 *                 type: string
 *                 example: "38.74"
 *               longitude:
 *                 type: string
 *                 example: "9.03"
 *               pm25:
 *                 type: string
 *                 example: "15.5"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-11-16T11:35:00Z"
 *               sensorTag:
 *                 type: string
 *                 example: "sensor-001"
 *     responses:
 *       201:
 *         description: Sensor data created successfully
 */

router.post('/', createSensorData);

module.exports = router;
