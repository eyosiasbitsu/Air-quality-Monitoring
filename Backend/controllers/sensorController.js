const Sensor = require('../models/sensorModel');
const SensorData = require('../models/sensorDataModel');

// Fetch all sensors
const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find().populate({ path: "sensorData" });
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Fetch sensor by ID
const getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id).populate({ path: "sensorData" });
        if (!sensor) {
            return res.status(404).send('Sensor not found');
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Fetch sensor by sensorTag
const getSensorByTag = async (req, res) => {
    try {
        const { sensorTag } = req.params;
        const sensor = await Sensor.findOne({ sensorTag }).populate({ path: "sensorData" });
        if (!sensor) {
            return res.status(404).send('Sensor not found');
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a new sensor
const createSensor = async (req, res) => {
    try {
        const { sensorTag } = req.body;

        // Check if the sensorTag is already in use
        const existingSensor = await Sensor.findOne({ sensorTag });
        if (existingSensor) {
            return res.status(400).json({ message: 'Sensor with this sensorTag already exists' });
        }

        const newSensor = new Sensor(req.body);
        const savedSensor = await newSensor.save();
        res.status(201).json(savedSensor);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Update sensor by ID
const updateSensor = async (req, res) => {
    try {
        const { sensorTag } = req.body;

        // If updating sensorTag, ensure it remains unique
        if (sensorTag) {
            const existingSensor = await Sensor.findOne({ sensorTag });
            if (existingSensor && existingSensor._id.toString() !== req.params.id) {
                return res.status(400).json({ message: 'Sensor with this sensorTag already exists' });
            }
        }

        const updatedSensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSensor) {
            return res.status(404).send('Sensor not found');
        }
        res.status(200).json(updatedSensor);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete sensor by ID
const deleteSensor = async (req, res) => {
    try {
        const deletedSensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!deletedSensor) {
            return res.status(404).send('Sensor not found');
        }

        // Remove all associated sensorData
        await SensorData.deleteMany({ sensorTag: deletedSensor.sensorTag });

        res.status(204).send(); // No content to send back after a delete
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllSensors,
    getSensorById,
    getSensorByTag,
    createSensor,
    updateSensor,
    deleteSensor
};
