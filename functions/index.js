const functions = require("firebase-functions");
const app = require("./app"); // Assurez-vous que ce chemin est correct

exports.app = functions.https.onRequest(app);
