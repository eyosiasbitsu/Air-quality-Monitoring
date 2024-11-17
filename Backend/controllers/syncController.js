const { realtimeDb } = require("../config/firebaseConfig"); // Import the initialized Realtime Database
const Sensor = require("../models/sensorModel");
const SensorData = require("../models/sensorDataModel");

const syncSensorData = async (req, res) => {
  try {
    console.log("Fetching sensor data from Firebase Realtime Database...");

    const sensorDataRef = realtimeDb.ref("sensorData"); // Reference to the 'sensorData' node
    const snapshot = await sensorDataRef.once("value");

    if (!snapshot.exists()) {
      console.log("No sensor data found in Realtime Database.");
      return res.status(404).send("No sensor data found in Realtime Database.");
    }

    const sensorData = snapshot.val();
    console.log("Retrieved sensorData:", sensorData);

    for (const [sensorTag, nestedData] of Object.entries(sensorData)) {
      console.log(`Processing sensorTag: ${sensorTag}`);

      let sensor = await Sensor.findOne({ sensorTag });
      if (!sensor) {
        console.log(`Sensor with sensorTag ${sensorTag} does not exist.`);
        continue;
      }

      for (const [key, data] of Object.entries(nestedData)) {
        if (!data || typeof data !== "object") continue;

        // Save data to MongoDB
        const newSensorData = new SensorData({
          temperature: data.temperature,
          humidity: data.humidity,
          pm25: data.pm25,
          latitude: data.latitude,
          longitude: data.longitude,
          createdAt: new Date(data.createdAt),
          sensorTag,
        });

        await newSensorData.save();
        sensor.sensorData.push(newSensorData._id);
        await sensor.save();

        console.log(`Stored new data for sensorTag: ${sensorTag}`);

        // Remove the data from Firebase
        const dataRef = realtimeDb.ref(`sensorData/${sensorTag}/${key}`);
        await dataRef.remove();
        console.log(`Removed data for key ${key} under sensorTag: ${sensorTag} from Realtime Database.`);
      }
    }

    res.status(200).send("Data synced and removed successfully.");
  } catch (error) {
    console.error("Error syncing data:", error.message);
    res.status(500).send("Error syncing data.");
  }
};

module.exports = {
  syncSensorData,
};
