const admin = require("firebase-admin");

// Load the `cleanair.json` content from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cleanair-a01ff-default-rtdb.firebaseio.com",
});

const db = admin.database();

module.exports = {
  db,
};
