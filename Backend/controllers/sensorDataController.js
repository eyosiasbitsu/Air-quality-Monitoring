const SensorData = require('../models/sensorDataModel');

const getAllSensorData = async (req, res) => {
    try {
        const data = await SensorData.find().populate('sensorId');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getSensorDataById = async (req, res) => {
    try {
        const data = await SensorData.findById(req.params.id).populate('sensorId');
        if (!data) {
            return res.status(404).send('Sensor data not found');
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createSensorData = async (req, res) => {
    try {
        const newData = new SensorData(req.body);
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateSensorData = async (req, res) => {
    try {
        const updatedData = await SensorData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) {
            return res.status(404).send('Sensor data not found');
        }
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteSensorData = async (req, res) => {
    try {
        const deletedData = await SensorData.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).send('Sensor data not found');
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    deleteSensorData,
    updateSensorData,
    createSensorData,
    getSensorDataById,
    getAllSensorData
};