const admin = require("firebase-admin");
const serviceAccount = require("../cleanair.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "",
});

const firestore = admin.firestore();

module.exports = {
    firestore
};
