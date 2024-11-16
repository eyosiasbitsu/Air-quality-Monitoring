const Sensor = require("../models/sensorModel");
const SensorData = require("../models/sensorDataModel");
const { firestore } = require("../config/firebaseConfig"); // Firebase config file

// Controller function to sync sensor data
const syncSensorData = async (req, res) => {
  try {
    // Fetch sensor data from Firebase
    const sensorsSnapshot = await firestore.ref("sensorData").once("value");

    if (!sensorsSnapshot.exists()) {
      return res.status(404).send("No sensor data found in Firebase.");
    }

    const sensorDataMap = sensorsSnapshot.val();

    // Loop through each sensorTag in Firebase data
    for (const sensorTag in sensorDataMap) {
      console.log(`Processing sensor with sensorTag: ${sensorTag}`);

      // Check if the sensor exists in MongoDB using sensorTag
      const sensor = await Sensor.findOne({ sensorTag });

      if (!sensor) {
        console.error(`Sensor with sensorTag ${sensorTag} does not exist in the database.`);
        continue; // Skip to the next sensorTag if the sensor doesn't exist
      }

      // Loop through sensorData entries for this sensorTag
      const sensorDataEntries = sensorDataMap[sensorTag];
      for (const dataId in sensorDataEntries) {
        const data = sensorDataEntries[dataId];

        // Check if the sensorData already exists in MongoDB to avoid duplication
        const existingData = await SensorData.findOne({
          sensorTag,
          createdAt: new Date(data.createdAt), // Ensure unique data based on timestamp
        });

        if (!existingData) {
          // If it doesn't exist, create new sensor data
          const newSensorData = new SensorData({
            temperature: data.temperature,
            humidity: data.humidity,
            pm25: data.pm25,
            latitude: data.latitude,
            longitude: data.longitude,
            createdAt: new Date(data.createdAt),
            sensorTag, // Link sensor data to sensor using sensorTag
          });

          await newSensorData.save();
          console.log(`New sensor data created for sensorTag: ${sensorTag}`);

          // Push the new sensorData reference to the sensor document
          sensor.sensorData.push(newSensorData._id);
        } else {
          console.log(`Sensor data already exists for sensorTag: ${sensorTag}`);
        }
      }

      // Save the updated sensor with linked sensorData
      await sensor.save();
      console.log(`Sensor ${sensorTag} updated successfully.`);
    }

    res.status(200).send("Data synced successfully.");
  } catch (error) {
    console.error("Error syncing data:", error);
    res.status(500).send("Error syncing data.");
  }
};

module.exports = {
  syncSensorData,
};
