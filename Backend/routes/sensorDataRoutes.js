const express = require('express');
const router = express.Router();
const { getAllSensorData, getSensorDataById, createSensorData, updateSensorData, deleteSensorData, getSensorDataBYLocation } = require('../controllers/sensorDataController.js');

// Get all sensor data
router.get('/', getAllSensorData);

// Get sensor data by ID
router.get('/:id', getSensorDataById);

// Create new sensor data
router.post('/', createSensorData);

// Update sensor data by ID
router.put('/:id', updateSensorData);

// Delete sensor data by ID
router.delete('/:id', deleteSensorData);

router.get('/locate' , getSensorDataBYLocation)

module.exports = router;
