const Sensor = require("../models/sensorModel");
const SensorData = require("../models/sensorDataModel");
const {firestore} = require("../config/firebaseConfig"); // Firebase config file

// Controller function to sync sensor data
const syncSensorData = async (req, res) => {
  try {
    // Fetch sensor data from Firebase
    const sensorsSnapshot = await firestore.collection("sensors").get();
    
    if (sensorsSnapshot.empty) {
      return res.status(404).send("No sensors found in Firestore.");
    }

    // Loop through each sensor document in Firestore
    for (const sensorDoc of sensorsSnapshot.docs) {
      const sensorData = sensorDoc.data();

      console.log(`Processing sensor: ${sensorData.location}`); // Log sensor being processed

      // Check if the sensor already exists in MongoDB
      let sensor = await Sensor.findOne({ location: sensorData.location });

      if (!sensor) {
        // If sensor does not exist, create a new sensor
        sensor = new Sensor({
          location: sensorData.location,
          streetAddress: sensorData.streetAddress,
          city: sensorData.city,
        });
        await sensor.save();
      }

      // Check if the sensorData array exists and has IDs
      if (!sensorData.sensorData || sensorData.sensorData.length === 0) {
        console.log(`No sensor data IDs found for sensor ${sensorData.location}`);
        continue; // Skip to the next sensor if no sensor data IDs are found
      }

      // Log the sensorData array of IDs
      console.log(`Found sensor data IDs for sensor ${sensorData.location}: ${sensorData.sensorData}`);

      // Fetch related sensor data documents based on the array of IDs in sensorData
      for (const sensorDataId of sensorData.sensorData) {
        const sensorDataDoc = await firestore.collection("sensorData").doc(sensorDataId).get();

        if (!sensorDataDoc.exists) {
          console.log(`No sensor data found for ID ${sensorDataId} for sensor ${sensorData.location}`);
          continue; // Skip if no sensor data found for the given ID
        }

        const data = sensorDataDoc.data();
        console.log(`Processing sensor data: ${JSON.stringify(data)}`); // Log the sensor data being processed

        // Check if the sensorData already exists in MongoDB to avoid duplication
        const existingData = await SensorData.findOne({
          sensorId: sensor._id,
          createdAt: data.createdAt || sensorDataDoc.createTime.toDate(), // Ensure unique data based on timestamp
        });

        if (!existingData) {
          // If it doesn't exist, create new sensor data
          const newSensorData = new SensorData({
            temperature: data.temperature,
            humidity: data.humidity,
            spi: data.spi,
            pm25: data.pm25,
            sensorId: sensor._id, // Link sensor data to sensor in MongoDB
            createdAt: data.createdAt || sensorDataDoc.createTime.toDate(), // Use createdAt if available or Firestore's createTime
          });

          await newSensorData.save();

          // Push the new sensorData reference to the sensor document
          sensor.sensorData.push(newSensorData._id);
        } else {
          console.log(`Sensor data already exists for sensor ${sensorData.location}`);
        }
      }

      // Save the updated sensor with linked sensorData
      await sensor.save();
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
