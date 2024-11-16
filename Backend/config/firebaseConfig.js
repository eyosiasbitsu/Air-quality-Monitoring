const admin = require("firebase-admin");

let serviceAccount;

try {
  // Load the `cleanair.json` content from the Render secret file
  serviceAccount = process.env.FIREBASE_CONFIG;

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
