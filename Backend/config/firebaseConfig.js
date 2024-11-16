const admin = require("firebase-admin");

try {
  // Check if the FIREBASE_CONFIG environment variable exists
  if (!process.env.FIREBASE_CONFIG) {
    throw new Error("FIREBASE_CONFIG environment variable is not defined.");
  }

  // Parse the JSON string into an object
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cleanair-a01ff-default-rtdb.firebaseio.com",
  });

  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase:", error.message);
  process.exit(1); // Exit the process with failure
}

const db = admin.database();

module.exports = {
  db,
};
