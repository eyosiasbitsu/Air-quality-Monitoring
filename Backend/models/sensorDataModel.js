const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  temperature: {
    type: String,
  },
  humidity: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  pm25: {
    type: String,
  },
  sensorId: {
    type: ObjectId,
    ref: 'Sensor',
    required: true
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;