const fs = require("fs");
const admin = require("firebase-admin");

try {
  // Load the `cleanair.json` content from the Render secret file
  const serviceAccount = JSON.parse(fs.readFileSync("/etc/secrets/FIREBASE_CONFIG", "utf8"));

  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cleanair-a01ff-default-rtdb.firebaseio.com",
  });

  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase:", error.message);
  process.exit(1); // Exit the process with failure
}

// Export the Firebase Realtime Database reference
const db = admin.database();

module.exports = {
  db,
};
