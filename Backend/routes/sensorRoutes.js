const express = require('express');
const router = express.Router();
const {getAllSensors, getSensorById, createSensor, updateSensor, deleteSensor} = require('../controllers/sensorController');

// Get all sensors
router.get('/', getAllSensors);

// Get a single sensor by ID
router.get('/:id', getSensorById);

// Create a new sensor
router.post('/', createSensor);

// Update a sensor by ID
router.put('/:id', updateSensor);

// Delete a sensor by ID
router.delete('/:id', deleteSensor);

module.exports = router;