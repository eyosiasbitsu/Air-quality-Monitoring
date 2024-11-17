const admin = require("firebase-admin");
const fs = require('fs');

// const serviceAccount = require('../cleanair.json');

const serviceAccount = JSON.parse(fs.readFileSync("/etc/secrets/FIREBASE_CONFIG", "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cleanair-a01ff-default-rtdb.firebaseio.com/",
  });
}

const firestoreDb = admin.firestore();
const realtimeDb = admin.database();

module.exports = {
  firestoreDb,
  realtimeDb,
};
