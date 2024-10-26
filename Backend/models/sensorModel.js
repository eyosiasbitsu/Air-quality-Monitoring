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
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

sensorSchema.virtual("sensorData",{
  ref: "SensorData",
  foreignField: "sensorId",
  localField: "_id"
})

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;
