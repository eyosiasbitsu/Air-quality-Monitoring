const mongoose = require("mongoose");
const SensorData = require("./sensorDataModel");

const sensorSchema = new mongoose.Schema({
  location: {
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
  },
  sensorData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SensorData",
    },
  ],
});

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;
