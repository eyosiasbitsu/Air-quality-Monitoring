const express = require('express');
const router = express.Router();
const { getAllSensorData, getSensorDataById, createSensorData, updateSensorData, deleteSensorData, getSensorDataByLocation } = require('../controllers/sensorDataController.js');

// Get all sensor data
router.get('/', getAllSensorData);

router.get('/locate' , getSensorDataByLocation)
// Get sensor data by ID
router.get('/:id', getSensorDataById);

// Create new sensor data
router.post('/', createSensorData);

// Update sensor data by ID
router.put('/:id', updateSensorData);

// Delete sensor data by ID
router.delete('/:id', deleteSensorData);


module.exports = router;
