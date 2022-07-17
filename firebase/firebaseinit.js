const admin = require("firebase-admin");

// Firebase config import from dotenv
const serviceAccount = require("../service-account.json");

// Initialize Firebase
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = app;
