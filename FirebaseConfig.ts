// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
//ENV
import {
  APIKEY,
  APPID,
  AUTHDOMAIN,
  DATABASEURL,
  MEASUREMENTID,
  MESSAGINGSENDERID,
  PROJECTID,
  STORAGEBUCKET,
} from "@env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: APIKEY,
//   authDomain: AUTHDOMAIN,
//   projectId: PROJECTID,
//   databaseURL: DATABASEURL,
//   storageBucket: STORAGEBUCKET,
//   messagingSenderId: MESSAGINGSENDERID,
//   appId: APPID,
//   measurementId: MEASUREMENTID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyAp575lFXIKATg2n6Qc-5MP0gi6QUoDA74",
  authDomain: "plantcare-4b96e.firebaseapp.com",
  projectId: "plantcare-4b96e",
  databaseURL:
    "https://plantcare-4b96e-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "plantcare-4b96e.appspot.com",
  messagingSenderId: "234786594498",
  appId: "1:234786594498:web:d568755722d70afa74255b",
  measurementId: "G-PWGHVVT2VB",
};
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
