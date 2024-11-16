
const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  temperature: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  pm25: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  sensorTag: {
    type: String,
    required: true,
  },
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);

module.exports = SensorData;
