// services/firebaseSync.js

require('dotenv').config();
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require("../credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL // Make sure to set this in your .env file
});

const firebaseDB = admin.database();

// Define Mongoose Schema and Model (adjust as per your existing models)
const sensorDataSchema = new mongoose.Schema({
  id: String,
  temp: String,
  humidity: String,
  particleAmount: String,
  timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

// Synchronization Function
async function syncData(snapshot) {
  const data = snapshot.val();
  const id = snapshot.key;

  const sensorData = {
    id,
    temp: data.temp,
    humidity: data.humidity,
    particleAmount: data.particleAmount
  };

  try {
    const doc = await SensorData.findOneAndUpdate(
      { id },
      sensorData,
      { upsert: true, new: true }
    );
    console.log('Data synced:', doc);
  } catch (err) {
    console.error('Error syncing data:', err);
  }
}

// Initialize Synchronization
function initFirebaseSync() {
  // Connect to MongoDB Atlas
  mongoose.connect(process.env.dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected for Firebase Sync'))
  .catch(err => console.error('MongoDB connection error:', err));

  // Reference to your Firebase data node
  const dataRef = firebaseDB.ref('sensorData');

  // Listen for child_added events
  dataRef.on('child_added', snapshot => {
    console.log('Child added event detected');
    syncData(snapshot).catch(err => console.error('Error in syncData:', err));
  });

  // Listen for child_changed events
  dataRef.on('child_changed', snapshot => {
    console.log('Child changed event detected');
    syncData(snapshot).catch(err => console.error('Error in syncData:', err));
  });

  
  //  Handle initial data load
  dataRef.once('value', snapshot => {
    snapshot.forEach(childSnapshot => {
      syncData(childSnapshot).catch(err => console.error('Error in syncData:', err));
    });
  });
}

module.exports = initFirebaseSync;
