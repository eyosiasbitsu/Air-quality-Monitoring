const mongoose = require("mongoose");

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
  sensorTag: {
    type: String,
    required: true,
    unique: true, // Ensures each sensorId is unique
  },
  city: {
    type: String,
    required: true,
  },
  sensorData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SensorData", // References the SensorData collection
    },
  ],
});

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;
