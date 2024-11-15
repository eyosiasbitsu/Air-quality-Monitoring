const admin = require("firebase-admin");
const serviceAccount = require("../cleanair.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cleanair-a01ff.firebaseio.com"
});

const firestore = admin.firestore();

async function listCollections() {
  try {
    const collections = await firestore.listCollections();
    console.log("Collections in the database:");

    collections.forEach(collection => {
      console.log(`- ${collection.id}`);
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
}

listCollections();
