const mongoose = require('mongoose');
const SensorData = require('./sensorDataModel');

const sensorSchema = new mongoose.Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    sensorData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SensorData'
    }]
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
