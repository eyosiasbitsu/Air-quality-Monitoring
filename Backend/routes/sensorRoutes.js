const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// Get all sensors
router.get('/', sensorController.getAllSensors);

// Get a single sensor by ID
router.get('/:id', sensorController.getSensorById);

// Create a new sensor
router.post('/', sensorController.createSensor);

// Update a sensor by ID
router.put('/:id', sensorController.updateSensor);

// Delete a sensor by ID
router.delete('/:id', sensorController.deleteSensor);

module.exports = router;