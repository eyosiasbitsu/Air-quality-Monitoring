const mongoose = require("mongoose");
const SensorData = require("./sensorDataModel");

const sensorSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }
});

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;
