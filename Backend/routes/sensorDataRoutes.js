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
    getSensorDataByTimeFrame
} = require('../controllers/sensorDataController.js');

/**
 * @swagger
 * /sensorData:
 *   get:
 *     summary: Get all sensor data
 *     tags: [SensorData]
 *     description: Retrieves all sensor data records
 *     responses:
 *       200:
 *         description: A list of sensor data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6390c0bfbcf86cd799439011"
 *                   temperature:
 *                     type: string
 *                     example: "23.5"
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
 *                     example: "15.0"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-13T08:30:00.000Z"
 *                   sensorId:
 *                     type: string
 *                     example: "638fcfdbc56f1a2789e1f23e"
 */
router.get('/', getAllSensorData);

/**
 * @swagger
 * /sensorData/locate:
 *   get:
 *     summary: Get sensor data by location
 *     tags: [SensorData]
 *     description: Retrieve sensor data based on location
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *         required: true
 *         example: "9.03"
 *       - in: query
 *         name: lng
 *         schema:
 *           type: string
 *         required: true
 *         example: "38.74"
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
 *                     example: "6390c0bfbcf86cd799439011"
 *                   temperature:
 *                     type: string
 *                     example: "23.5"
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
 *                     example: "15.0"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-13T08:30:00.000Z"
 *                   sensorId:
 *                     type: string
 *                     example: "638fcfdbc56f1a2789e1f23e"
 */
router.get('/locate', getSensorDataByLocation);

/**
 * @swagger
 * /sensorData/search:
 *   get:
 *     summary: Get sensor data by location and time frame
 *     tags: [SensorData]
 *     description: Retrieve sensor data for the closest sensor based on specified latitude, longitude, and time frame
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *         required: true
 *         example: "9.03"
 *       - in: query
 *         name: lng
 *         schema:
 *           type: string
 *         required: true
 *         example: "38.74"
 *       - in: query
 *         name: timeFrame
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         required: true
 *         example: "weekly"
 *     responses:
 *       200:
 *         description: Sensor data for the specified location and time frame
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6390c0bfbcf86cd799439011"
 *                   temperature:
 *                     type: string
 *                     example: "23.5"
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
 *                     example: "15.0"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-13T08:30:00.000Z"
 *                   sensorId:
 *                     type: string
 *                     example: "638fcfdbc56f1a2789e1f23e"
 */
router.get('/search', getSensorDataByTimeFrame);

/**
 * @swagger
 * /sensorData/{id}:
 *   get:
 *     summary: Get sensor data by ID
 *     tags: [SensorData]
 *     description: Retrieve sensor data by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "6390c0bfbcf86cd799439011"
 *     responses:
 *       200:
 *         description: Sensor data details for the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6390c0bfbcf86cd799439011"
 *                 temperature:
 *                   type: string
 *                   example: "23.5"
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
 *                   example: "15.0"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-13T08:30:00.000Z"
 *                 sensorId:
 *                   type: string
 *                   example: "638fcfdbc56f1a2789e1f23e"
 */
router.get('/:id', getSensorDataById);

/**
 * @swagger
 * /sensorData:
 *   post:
 *     summary: Create new sensor data
 *     tags: [SensorData]
 *     description: Adds a new sensor data record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: string
 *                 example: "23.5"
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
 *                 example: "15.0"
 *               sensorId:
 *                 type: string
 *                 example: "638fcfdbc56f1a2789e1f23e"
 *     responses:
 *       201:
 *         description: Sensor data created successfully
 */
router.post('/', createSensorData);

/**
 * @swagger
 * /sensorData/{id}:
 *   put:
 *     summary: Update sensor data by ID
 *     tags: [SensorData]
 *     description: Updates sensor data based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "6390c0bfbcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: string
 *                 example: "25.0"
 *               humidity:
 *                 type: string
 *                 example: "55.0"
 *               latitude:
 *                 type: string
 *                 example: "38.74"
 *               longitude:
 *                 type: string
 *                 example: "9.03"
 *               pm25:
 *                 type: string
 *                 example: "12.0"
 *     responses:
 *       200:
 *         description: Sensor data updated successfully
 */
router.put('/:id', updateSensorData);

/**
 * @swagger
 * /sensorData/{id}:
 *   delete:
 *     summary: Delete sensor data by ID
 *     tags: [SensorData]
 *     description: Removes sensor data based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "6390c0bfbcf86cd799439011"
 *     responses:
 *       204:
 *         description: Sensor data deleted successfully
 */
router.delete('/:id', deleteSensorData);

module.exports = router;
