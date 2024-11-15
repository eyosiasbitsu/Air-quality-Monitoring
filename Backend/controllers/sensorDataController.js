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

// Helper function to calculate distance between two points (lat, lng)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
  
const getSensorDataByTimeFrame = async (req, res) => {
    try {
      const { lat, lng, timeFrame } = req.body;
  
      // Check that required parameters are provided
      if (!lat || !lng || !timeFrame) {
        return res.status(400).json({ message: "Please provide latitude, longitude, and timeFrame" });
      }
  
      const reqLatitude = parseFloat(lat);
      const reqLongitude = parseFloat(lng);
      const proximity = 0.027; // Initial proximity range in degrees
  
      // Step 1: Find sensors within the initial proximity
      let sensors = await Sensor.find({
        lat: { $gte: reqLatitude - proximity, $lte: reqLatitude + proximity },
        lng: { $gte: reqLongitude - proximity, $lte: reqLongitude + proximity }
      });
  
      // Step 2: If no sensors are found, find the closest sensor by calculating distances
      if (!sensors.length) {
        const allSensors = await Sensor.find();
        let closestSensor = null;
        let minDistance = Infinity;
  
        for (let sensor of allSensors) {
          const distance = calculateDistance(
            reqLatitude,
            reqLongitude,
            parseFloat(sensor.lat),
            parseFloat(sensor.lng)
          );
  
          if (distance < minDistance) {
            minDistance = distance;
            closestSensor = sensor;
          }
        }
  
        // If no sensor is found at all, return an error
        if (!closestSensor) {
          return res.status(404).json({ message: "No nearby sensor found" });
        }
  
        // Use the closest sensor found
        sensors = [closestSensor];
      }
  
      const nearestSensor = sensors[0];
  
      // Step 3: Determine the time range based on the timeFrame parameter
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
  
      // Step 4: Fetch the sensor data for the specified sensor and time range
      const sensorData = await SensorData.find({
        sensorId: nearestSensor._id,
        date: { $gte: startDate, $lte: now }
      }).sort({ date: 1 }); // Sort in ascending order by date
  
      res.json(sensorData);
    } catch (error) {
      console.error(error);
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
    getSensorDataByTimeFrame
};