// The Cloud Functions for Firebase SDK to setup triggers and logging.
const {onValueUpdated} = require("firebase-functions/v2/database");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

exports.triggerTDSUpdate = onValueUpdated(
    "farm/{farmID}/arduinoBoard/{arduinoBoardID}/currentTDS",
    (event:any)=> {
        const tds = event.data.after.val();
        console.log(tds)
});