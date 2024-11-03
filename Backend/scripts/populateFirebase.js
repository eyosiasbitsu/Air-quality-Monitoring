const { firestore } = require("../config/firebaseConfig"); // Import Firebase configuration

// Predefined sensor locations in Addis Ababa, Ethiopia
const locations = [
  { location: "Piassa", streetAddress: "Piassa Main Road", city: "Addis Ababa" },
  { location: "Bole", streetAddress: "Bole Road", city: "Addis Ababa" },
  { location: "Sar Bet", streetAddress: "Sar Bet Road", city: "Addis Ababa" },
  { location: "Merkato", streetAddress: "Merkato Market", city: "Addis Ababa" },
  { location: "Cazanchis", streetAddress: "Cazanchis Road", city: "Addis Ababa" },
  { location: "Megenagna", streetAddress: "Megenagna Circle", city: "Addis Ababa" },
  { location: "Kazanchis", streetAddress: "Kazanchis Road", city: "Addis Ababa" },
  { location: "Addis Ketema", streetAddress: "Addis Ketema District", city: "Addis Ababa" },
  { location: "Kera", streetAddress: "Kera Road", city: "Addis Ababa" },
  { location: "Gotera", streetAddress: "Gotera Junction", city: "Addis Ababa" },
];

// Helper function to generate sensor data based on provided ranges
function generateSensorData(sensorId, numberOfEntries = 20) {
  const sensorDataEntries = [];

  for (let i = 0; i < numberOfEntries; i++) {
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - i); // Generate data for previous hours

    const sensorData = {
      temperature: (22.4 + Math.random() * (24.5 - 22.4)).toFixed(2), // Temperature between 22.4°C and 24.5°C
      humidity: (47 + Math.random() * (67 - 47)).toFixed(2),          // Humidity between 47% and 67%
      pm25: (19 + Math.random() * (23 - 19)).toFixed(2),              // PM2.5 between 19 and 23 µg/m³
      spi: (Math.random() * 100).toFixed(2),                          // Random spi value between 0 and 100
      sensorId: sensorId,                                             // Reference to the sensor
      createdAt: timestamp,                                           // Timestamp for each entry
    };

    sensorDataEntries.push(sensorData);
  }

  return sensorDataEntries;
}

async function registerSensorsAndInsertData() {
  // try {
  //   // Initialize the starting sensor ID
  //   let startingSensorId = 1;

  //   // Step 1: Loop through the locations array and create sensors
  //   for (let i = 0; i < locations.length; i++) {
  //     const location = locations[i];

  //     // Format sensorId as an 8-digit number (e.g., 00000001, 00000002)
  //     const sensorId = String(startingSensorId).padStart(8, '0');
  //     startingSensorId += 1; // Increment sensorId for the next sensor

  //     // Add sensor to Firestore (sensors collection) with the formatted sensorId
  //     const sensorRef = firestore.collection("sensors").doc(sensorId); // Will dynamically create the 'sensors' collection

  //     // Placeholder for storing sensor data references (Array of ObjectIds)
  //     let sensorDataRefs = [];

  //     // Step 2: Generate sensor data for this sensor
  //     const sensorDataEntries = generateSensorData(sensorRef.id);

  //     // Step 3: Add sensor data to Firestore (sensorData collection)
  //     for (const entry of sensorDataEntries) {
  //       const sensorDataRef = firestore.collection("sensorData").doc(); // Will dynamically create the 'sensorData' collection

  //       // Insert sensor data and push its reference to the sensorDataRefs array
  //       await sensorDataRef.set({
  //         ...entry,
  //         sensorId: firestore.collection("sensors").doc(sensorRef.id), // Reference to sensor document
  //         createdAt: entry.createdAt,
  //       });
  //       console.log(`Sensor data added for sensor ${sensorId} at ${location.location}:`, sensorDataRef.id);

  //       // Push the sensorData reference into the array
  //       sensorDataRefs.push(sensorDataRef.id);
  //     }

  //     // Step 4: Add the sensor document with the sensorData array field
  //     const sensorData = {
  //       location: location.location,
  //       streetAddress: location.streetAddress,
  //       city: location.city,
  //       sensorId: sensorId,
  //       sensorData: sensorDataRefs, // Add the array of sensorData references
  //     };

  //     await sensorRef.set(sensorData);
  //     console.log(`Sensor created at ${location.location} with sensorId ${sensorId} and associated sensor data.`);

  //     console.log(`Inserted ${sensorDataEntries.length} sensor data entries for sensor at ${location.location}`);
  //   }

  //   console.log("All sensors and sensor data entries have been inserted successfully.");
  // } catch (error) {
  //   console.error("Error inserting sensor data:", error);
  // }
}

module.exports = {
    registerSensorsAndInsertData
};

