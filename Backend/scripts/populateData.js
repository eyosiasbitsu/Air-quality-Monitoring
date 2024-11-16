const mongoose = require("mongoose");
const Sensor = require("../models/sensorModel");
const SensorData = require("../models/sensorDataModel");

// Predefined real locations in Addis Ababa, Ethiopia
const locations = [
  { lat: "9.037", lng: "38.763", streetAddress: "Piassa Main Road", city: "Addis Ababa" },
  { lat: "9.000", lng: "38.789", streetAddress: "Bole Road", city: "Addis Ababa" },
  { lat: "9.012", lng: "38.736", streetAddress: "Sar Bet Road", city: "Addis Ababa" },
  { lat: "8.980", lng: "38.757", streetAddress: "Merkato Market", city: "Addis Ababa" },
  { lat: "9.033", lng: "38.760", streetAddress: "Cazanchis Road", city: "Addis Ababa" },
  { lat: "9.045", lng: "38.770", streetAddress: "Megenagna Circle", city: "Addis Ababa" },
  { lat: "9.035", lng: "38.765", streetAddress: "Kazanchis Road", city: "Addis Ababa" },
  { lat: "9.025", lng: "38.741", streetAddress: "Addis Ketema District", city: "Addis Ababa" },
  { lat: "8.995", lng: "38.750", streetAddress: "Kera Road", city: "Addis Ababa" },
  { lat: "8.970", lng: "38.740", streetAddress: "Gotera Junction", city: "Addis Ababa" },
];

// Helper function to generate sensor data
function generateSensorData(sensorTag, numberOfEntries = 20) {
  const sensorDataEntries = [];
  for (let i = 0; i < numberOfEntries; i++) {
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - i);

    const sensorData = {
      temperature: (22 + Math.random() * (30 - 22)).toFixed(2), // Temperature between 22°C and 30°C
      humidity: (40 + Math.random() * (70 - 40)).toFixed(2),     // Humidity between 40% and 70%
      pm25: (15 + Math.random() * (25 - 15)).toFixed(2),         // PM2.5 between 15 and 25 µg/m³
      latitude: locations[Math.floor(Math.random() * locations.length)].lat,
      longitude: locations[Math.floor(Math.random() * locations.length)].lng,
      createdAt: timestamp,
      sensorTag, // Use sensorTag here
    };

    sensorDataEntries.push(sensorData);
  }

  return sensorDataEntries;
}

async function populateDatabase() {
  try {
    console.log("Populating database with new data...");
    for (let i = 0; i < 20; i++) {
      const location = locations[i % locations.length]; // Cycle through locations
      const sensorTag = `000000${i + 1}`; // Unique sensorTag for each sensor

      // Create a new sensor
      const sensor = new Sensor({
        lat: location.lat,
        lng: location.lng,
        streetAddress: location.streetAddress,
        city: location.city,
        sensorTag,
        sensorData: [], // Initialize empty sensorData array
      });
      await sensor.save();

      // Generate and link sensor data
      const sensorDataEntries = generateSensorData(sensorTag);
      for (const entry of sensorDataEntries) {
        const sensorData = new SensorData(entry);
        await sensorData.save();

        // Push sensor data's `_id` into the sensor's `sensorData` array
        sensor.sensorData.push(sensorData._id);
      }

      // Save the updated sensor document
      await sensor.save();
      console.log(`Created sensor and data for: ${sensorTag}`);
    }

    console.log("Database population complete.");
  } catch (error) {
    console.error("Error populating the database:", error.message);
  }
}

// Export the function
module.exports = {
  populateDatabase,
};
