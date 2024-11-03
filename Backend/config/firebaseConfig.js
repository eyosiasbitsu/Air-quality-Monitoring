const admin = require("firebase-admin");
const serviceAccount = require("../cleanair.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://air-quality-monitor-9777f-default-rtdb.firebaseio.com/sensorData.json?auth=KcTdDDTEihwvKSZXrlViKQheB6QzmCo1R25OPWeR",
});

const firestore = admin.firestore();

module.exports = {
    firestore
};
