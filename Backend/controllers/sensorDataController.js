const SensorData = require('../models/sensorDataModel');
const Sensor = require('../models/sensorModel');

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
const getSensorDataBYLocation = async (req, res) => {
    try {
      // Ensure latitude and longitude are provided
      const { lng, lat } = req.query;
      if (!lat || !lng) {
        return res.status(400).json({ message: "Please provide both latitude and longitude" });
      }
  
      const reqLatitude = parseFloat(lat);
      const reqLongitude = parseFloat(lng);
  
      // Fetch all sensors
      const sensors = await Sensor.find();
  
      // Find the first nearby sensor
      const nearbySensor = sensors.find(sensor => {
        const sensorLatitude = parseFloat(sensor.lat);
        const sensorLongitude = parseFloat(sensor.lng);
  
        // Check if the absolute difference is less than 0.027 for both latitude and longitude
        return Math.abs(sensorLatitude - reqLatitude) < 0.027 &&
               Math.abs(sensorLongitude - reqLongitude) < 0.027;
      });
  
      // Check if a nearby sensor was found
      if (nearbySensor) {
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
      } else {
        return res.status(404).json({ message: "There is no nearby sensor" }); // No nearby sensor found
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
    getSensorDataBYLocation
};