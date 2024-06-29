const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController.js');

// Get all sensor data
router.get('/', sensorDataController.getAllSensorData);

// Get sensor data by ID
router.get('/:id', sensorDataController.getSensorDataById);

// Create new sensor data
router.post('/', sensorDataController.createSensorData);

// Update sensor data by ID
router.put('/:id', sensorDataController.updateSensorData);

// Delete sensor data by ID
router.delete('/:id', sensorDataController.deleteSensorData);

module.exports = router;
