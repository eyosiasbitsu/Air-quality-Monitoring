/**
 * @swagger
 * tags:
 *   name: Sensor
 *   description: API for sensor operations
 */

const express = require('express');
const router = express.Router();
const { 
    getAllSensors, 
    getSensorById, 
    getSensorByTag, 
    createSensor, 
    updateSensor, 
    deleteSensor 
} = require('../controllers/sensorController');

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Get all sensors
 *     tags: [Sensor]
 *     description: Retrieves all sensors
 *     responses:
 *       200:
 *         description: A list of all sensors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Sensor ID
 *                     example: "638fcfdbc56f1a2789e1f23e"
 *                   lat:
 *                     type: string
 *                     description: Latitude of the sensor location
 *                     example: "9.03"
 *                   lng:
 *                     type: string
 *                     description: Longitude of the sensor location
 *                     example: "38.74"
 *                   streetAddress:
 *                     type: string
 *                     description: Address of the sensor location
 *                     example: "123 Main St"
 *                   sensorTag:
 *                     type: string
 *                     description: Sensor unique identifier
 *                     example: "SN-001"
 *                   city:
 *                     type: string
 *                     description: City where the sensor is located
 *                     example: "Addis Ababa"
 *                   sensorData:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: List of associated sensorData IDs
 *                       example: ["638fcfdbc56f1a2789e1f24e", "638fcfdbc56f1a2789e1f25e"]
 */
router.get('/', getAllSensors);

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Get a sensor by ID
 *     tags: [Sensor]
 *     description: Retrieves a sensor based on its unique MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique MongoDB ID for the sensor.
 *         example: "638fcfdbc56f1a2789e1f23e"
 *     responses:
 *       200:
 *         description: Sensor details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Sensor ID
 *                   example: "638fcfdbc56f1a2789e1f23e"
 *                 lat:
 *                   type: string
 *                   description: Latitude of the sensor location
 *                   example: "9.03"
 *                 lng:
 *                   type: string
 *                   description: Longitude of the sensor location
 *                   example: "38.74"
 *                 streetAddress:
 *                   type: string
 *                   description: Address of the sensor location
 *                   example: "123 Main St"
 *                 sensorTag:
 *                   type: string
 *                   description: Sensor unique identifier
 *                   example: "SN-001"
 *                 city:
 *                   type: string
 *                   description: City where the sensor is located
 *                   example: "Addis Ababa"
 *                 sensorData:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of associated sensorData IDs
 *                     example: ["638fcfdbc56f1a2789e1f24e", "638fcfdbc56f1a2789e1f25e"]
 */
router.get('/:id', getSensorById);

/**
 * @swagger
 * /sensors/tag/{sensorTag}:
 *   get:
 *     summary: Get a sensor by sensorTag
 *     tags: [Sensor]
 *     description: Retrieves a sensor based on its unique sensorTag
 *     parameters:
 *       - in: path
 *         name: sensorTag
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique sensorTag for the sensor.
 *         example: "SN-001"
 *     responses:
 *       200:
 *         description: Sensor details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Sensor ID
 *                   example: "638fcfdbc56f1a2789e1f23e"
 *                 lat:
 *                   type: string
 *                   description: Latitude of the sensor location
 *                   example: "9.03"
 *                 lng:
 *                   type: string
 *                   description: Longitude of the sensor location
 *                   example: "38.74"
 *                 streetAddress:
 *                   type: string
 *                   description: Address of the sensor location
 *                   example: "123 Main St"
 *                 sensorTag:
 *                   type: string
 *                   description: Sensor unique identifier
 *                   example: "SN-001"
 *                 city:
 *                   type: string
 *                   description: City where the sensor is located
 *                   example: "Addis Ababa"
 *                 sensorData:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of associated sensorData IDs
 *                     example: ["638fcfdbc56f1a2789e1f24e", "638fcfdbc56f1a2789e1f25e"]
 */
router.get('/tag/:sensorTag', getSensorByTag);

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Create a new sensor
 *     tags: [Sensor]
 *     description: Adds a new sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: string
 *                 description: Latitude of the sensor location
 *                 example: "9.03"
 *               lng:
 *                 type: string
 *                 description: Longitude of the sensor location
 *                 example: "38.74"
 *               streetAddress:
 *                 type: string
 *                 description: Address of the sensor location
 *                 example: "123 Main St"
 *               sensorTag:
 *                 type: string
 *                 description: Unique sensorTag
 *                 example: "SN-001"
 *               city:
 *                 type: string
 *                 description: City where the sensor is located
 *                 example: "Addis Ababa"
 *     responses:
 *       201:
 *         description: Sensor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Sensor ID
 *                   example: "638fcfdbc56f1a2789e1f23e"
 *                 lat:
 *                   type: string
 *                   description: Latitude of the sensor location
 *                   example: "9.03"
 *                 lng:
 *                   type: string
 *                   description: Longitude of the sensor location
 *                   example: "38.74"
 *                 streetAddress:
 *                   type: string
 *                   description: Address of the sensor location
 *                   example: "123 Main St"
 *                 sensorTag:
 *                   type: string
 *                   description: Unique sensorTag
 *                   example: "SN-001"
 *                 city:
 *                   type: string
 *                   description: City where the sensor is located
 *                   example: "Addis Ababa"
 */
router.post('/', createSensor);

/**
 * @swagger
 * /sensors/{id}:
 *   put:
 *     summary: Update a sensor by ID
 *     tags: [Sensor]
 *     description: Updates sensor details based on its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique MongoDB ID for the sensor.
 *         example: "638fcfdbc56f1a2789e1f23e"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: string
 *                 description: Latitude of the sensor location
 *                 example: "9.05"
 *               lng:
 *                 type: string
 *                 description: Longitude of the sensor location
 *                 example: "38.76"
 *               streetAddress:
 *                 type: string
 *                 description: Updated address of the sensor location
 *                 example: "456 Elm St"
 *               sensorTag:
 *                 type: string
 *                 description: Updated unique sensorTag
 *                 example: "SN-002"
 *               city:
 *                 type: string
 *                 description: Updated city where the sensor is located
 *                 example: "Addis Ababa"
 *     responses:
 *       200:
 *         description: Sensor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Sensor ID
 *                   example: "638fcfdbc56f1a2789e1f23e"
 *                 lat:
 *                   type: string
 *                   description: Latitude of the sensor location
 *                   example: "9.05"
 *                 lng:
 *                   type: string
 *                   description: Longitude of the sensor location
 *                   example: "38.76"
 *                 streetAddress:
 *                   type: string
 *                   description: Updated address of the sensor location
 *                   example: "456 Elm St"
 *                 sensorTag:
 *                   type: string
 *                   description: Updated unique sensorTag
 *                   example: "SN-002"
 *                 city:
 *                   type: string
 *                   description: Updated city where the sensor is located
 *                   example: "Addis Ababa"
 */
router.put('/:id', updateSensor);

/**
 * @swagger
 * /sensors/{id}:
 *   delete:
 *     summary: Delete a sensor by ID
 *     tags: [Sensor]
 *     description: Removes a sensor based on its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique MongoDB ID for the sensor.
 *         example: "638fcfdbc56f1a2789e1f23e"
 *     responses:
 *       204:
 *         description: Sensor deleted successfully
 */
router.delete('/:id', deleteSensor);

module.exports = router;
