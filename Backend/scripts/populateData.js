// const SensorData = require("../models/sensorDataModel"); // Importing SensorData model
// const Sensor = require("../models/sensorModel"); // Importing Sensor model
// const User = require("../models/userModel"); // Importing User model

// // Predefined sensor locations in Addis Ababa, Ethiopia
// const locations = [
//   { location: "Piassa", streetAddress: "Piassa Main Road", city: "Addis Ababa" },
//   { location: "Bole", streetAddress: "Bole Road", city: "Addis Ababa" },
//   { location: "Sar Bet", streetAddress: "Sar Bet Road", city: "Addis Ababa" },
//   { location: "Merkato", streetAddress: "Merkato Market", city: "Addis Ababa" },
//   { location: "Cazanchis", streetAddress: "Cazanchis Road", city: "Addis Ababa" },
//   { location: "Megenagna", streetAddress: "Megenagna Circle", city: "Addis Ababa" },
//   { location: "Kazanchis", streetAddress: "Kazanchis Road", city: "Addis Ababa" },
//   { location: "Addis Ketema", streetAddress: "Addis Ketema District", city: "Addis Ababa" },
//   { location: "Kera", streetAddress: "Kera Road", city: "Addis Ababa" },
//   { location: "Gotera", streetAddress: "Gotera Junction", city: "Addis Ababa" }
// ];

// // Helper function to generate sensor data based on provided ranges
// function generateSensorData(sensorId, numberOfEntries = 20) {
//   const sensorDataEntries = [];
  
//   // Simulate 20 entries over the past 20 hours
//   for (let i = 0; i < numberOfEntries; i++) {
//     const timestamp = new Date();
//     timestamp.setHours(timestamp.getHours() - i); // Data for previous hours

//     const sensorData = {
//       temperature: (22.4 + Math.random() * (24.5 - 22.4)).toFixed(2), // Temperature between 22.4°C and 24.5°C
//       humidity: (47 + Math.random() * (67 - 47)).toFixed(2),          // Humidity between 47% and 67%
//       pm25: (19 + Math.random() * (23 - 19)).toFixed(2),              // PM2.5 between 19 and 23 µg/m³
//       spi: (Math.random() * 100).toFixed(2),                          // Random spi value between 0 and 100
//       sensorId,                                                       // Reference to the sensor
//       createdAt: timestamp                                             // Timestamp for each entry
//     };

//     sensorDataEntries.push(sensorData);
//   }

//   return sensorDataEntries;
// }

// async function registerSensorsAndInsertData() {
//   try {
//     // Step 1: Check if the user "Fetsum Abyu" exists, create if not
//     let user = await User.findOne({ email: "eyosiasbitsu@gmail.com" });

//     if (!user) {
//       user = new User({
//         fullname: "Fetsum Abyu",
//         email: "eyosiasbitsu@gmail.com",
//         password: "dummyPassword123" // Placeholder password, should be hashed in real scenarios
//       });
//       await user.save();
//       console.log("User created:", user._id);
//     } else {
//       console.log("User already exists:", user._id);
//     }

//     // Step 2: Loop through the locations array and create sensors
//     for (let i = 0; i < locations.length; i++) {
//       const location = locations[i];
//       const sensorId = `SENSOR${i + 1}`; // Generating sensorId for each sensor

//       // Check if sensor exists, create it if not
//       let sensor = await Sensor.findOne({ sensorId });

//       if (!sensor) {
//         sensor = new Sensor({
//           location: location.location,
//           streetAddress: location.streetAddress,
//           city: location.city,
//           sensorId: sensorId, // Unique sensorId
//           user: user._id      // Associate with the user
//         });
//         await sensor.save();
//         console.log(`Sensor created at ${location.location}:`, sensor._id);
//       }

//       // Step 3: Generate sensor data for this sensor based on your friend's data ranges
//       const sensorDataEntries = generateSensorData(sensor._id);

//       // Step 4: Insert each sensor data entry
//       for (const entry of sensorDataEntries) {
//         const sensorData = new SensorData(entry);
//         await sensorData.save();
//         sensor.sensorData.push(sensorData._id); // Associate sensorData with the sensor
//       }

//       // Step 5: Save the sensor with its associated sensorData
//       await sensor.save();
//       console.log(`Inserted 20 sensor data entries for sensor at ${location.location}`);
//     }

//     console.log("All sensors and sensor data entries have been inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting sensor data:", error);
//   }
// }

// // Run the script
// registerSensorsAndInsertData();
