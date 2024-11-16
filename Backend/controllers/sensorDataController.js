const SensorData = require('../models/sensorDataModel');
const Sensor = require('../models/sensorModel');

// Fetch all sensor data
const getAllSensorData = async (req, res) => {
    try {
        const data = await SensorData.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Fetch sensor data by ID
const getSensorDataById = async (req, res) => {
    try {
        const data = await SensorData.findById(req.params.id);
        if (!data) {
            return res.status(404).send('Sensor data not found');
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Fetch sensor data by location
const getSensorDataByLocation = async (req, res) => {
    try {
        const { lng, lat } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ message: "Please provide both latitude and longitude" });
        }

        const reqLatitude = lat.toString();
        const reqLongitude = lng.toString();
        const proximity = 0.027; // Approximate proximity in degrees

        // Find sensors near the provided location
        const sensors = await Sensor.find({
            lat: { $gte: (parseFloat(reqLatitude) - proximity).toString(), $lte: (parseFloat(reqLatitude) + proximity).toString() },
            lng: { $gte: (parseFloat(reqLongitude) - proximity).toString(), $lte: (parseFloat(reqLongitude) + proximity).toString() },
        });

        if (!sensors.length) {
            return res.status(404).json({ message: "No nearby sensors found" });
        }

        const nearbySensor = sensors[0]; // Consider the first sensor as the closest
        console.log(`Nearby sensor found: ${nearbySensor.sensorTag}`);

        // Retrieve sensor data linked to this sensor
        const sensorData = await SensorData.find({ sensorTag: nearbySensor.sensorTag });

        if (sensorData.length > 0) {
            res.status(200).json(sensorData);
        } else {
            res.status(404).json({ message: "No sensor data found for this location" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create new sensor data
const createSensorData = async (req, res) => {
    try {
        const { sensorTag } = req.body;

        // Find the sensor using the sensorTag
        const sensor = await Sensor.findOne({ sensorTag: sensorTag });
        if (!sensor) {
            return res.status(404).json({ message: "Sensor not found for the provided sensorTag" });
        }

        // Create and save new sensor data
        const newSensorData = new SensorData(req.body);
        const savedData = await newSensorData.save();

        // Append the new sensor data's _id to the sensor's sensorData array
        sensor.sensorData.push(savedData._id);
        await sensor.save();

        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Update sensor data
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

// Delete sensor data
const deleteSensorData = async (req, res) => {
    try {
        const deletedData = await SensorData.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).send('Sensor data not found');
        }

        // Remove the reference from the corresponding sensor
        await Sensor.updateOne(
            { sensorData: req.params.id },
            { $pull: { sensorData: req.params.id } }
        );

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Fetch sensor data by time frame
const getSensorDataByTimeFrame = async (req, res) => {
    try {
        const { lat, lng, timeFrame } = req.body;

        if (!lat || !lng || !timeFrame) {
            return res.status(400).json({ message: "Please provide latitude, longitude, and timeFrame" });
        }

        const reqLatitude = lat.toString();
        const reqLongitude = lng.toString();
        const proximity = 0.027; // Approximate proximity in degrees

        // Find nearby sensors
        const sensors = await Sensor.find({
            lat: { $gte: (parseFloat(reqLatitude) - proximity).toString(), $lte: (parseFloat(reqLatitude) + proximity).toString() },
            lng: { $gte: (parseFloat(reqLongitude) - proximity).toString(), $lte: (parseFloat(reqLongitude) + proximity).toString() },
        });

        if (!sensors.length) {
            return res.status(404).json({ message: "No nearby sensors found" });
        }

        const nearestSensor = sensors[0]; // Consider the first sensor as the closest
        console.log(`Nearest sensor: ${nearestSensor.sensorTag}`);

        let startDate;
        const now = new Date();
        if (timeFrame === 'daily') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        } else if (timeFrame === 'weekly') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        } else if (timeFrame === 'monthly') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        } else {
            return res.status(400).json({ message: "Invalid timeFrame. Use 'daily', 'weekly', or 'monthly'" });
        }

        // Retrieve sensor data for the specified time frame
        const sensorData = await SensorData.find({
            sensorTag: nearestSensor.sensorTag,
            createdAt: { $gte: startDate, $lte: now },
        }).sort({ createdAt: 1 });

        res.status(200).json(sensorData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    deleteSensorData,
    updateSensorData,
    createSensorData,
    getSensorDataById,
    getAllSensorData,
    getSensorDataByLocation,
    getSensorDataByTimeFrame,
};
