const Sensor = require('../models/sensorModel');

const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).send('Sensor not found');
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createSensor = async (req, res) => {
    try {
        const newSensor = new Sensor(req.body);
        const savedSensor = await newSensor.save();
        res.status(201).json(savedSensor);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateSensor = async (req, res) => {
    try {
        const updatedSensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSensor) {
            return res.status(404).send('Sensor not found');
        }
        res.status(200).json(updatedSensor);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteSensor = async (req, res) => {
    try {
        const deletedSensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!deletedSensor) {
            return res.status(404).send('Sensor not found');
        }
        res.status(204).send(); // No content to send back after a delete
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor
};
