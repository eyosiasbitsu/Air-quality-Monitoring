const SensorData = require('../models/sensorDataModel');
const Sensor = require('../models/sensorModel');
const mongoose = require("mongoose");

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
// Controller function to get sensor data by location
const getSensorDataByLocation = async (req, res) => {
    try {
        // Ensure latitude and longitude are provided
        const { lng, lat } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ message: "Please provide both latitude and longitude" });
        }

        const reqLatitude = parseFloat(lat);
        const reqLongitude = parseFloat(lng);
        const proximity = 0.027; // Define proximity bounds for latitude and longitude

        // Fetch nearby sensors within a specified latitude and longitude range
        const sensors = await Sensor.find({
            lat: { $gte: reqLatitude - proximity, $lte: reqLatitude + proximity },
            lng: { $gte: reqLongitude - proximity, $lte: reqLongitude + proximity }
        });

        // Check if any nearby sensors were found
        if (!sensors.length) {
            return res.status(404).json({ message: "There is no nearby sensor" });
        }

        // Assuming you are interested in data from the first nearby sensor found
        const nearbySensor = sensors[0]; // Consider closest sensor, for example

        // Ensure nearbySensor._id is a valid ObjectId
        if (!nearbySensor._id || !mongoose.Types.ObjectId.isValid(nearbySensor._id)) {
            return res.status(400).json({ message: "Invalid sensor ID" });
        }

        // Find the sensor data for the matching sensor
        const sensorData = await SensorData.find({ sensorId: nearbySensor._id });

        // Return the sensor data
        if (sensorData && sensorData.length > 0) {
            return res.json(sensorData);
        } else {
            return res.status(404).json({ message: "No sensor data found for this location" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message); // Return the error message
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
    getAllSensorData,
    getSensorDataByLocation
};