"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
const firestore_1 = require("firebase/firestore");
const FirebaseRepository_1 = require("../../application/services/FirebaseRepository");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
dotenv_1.default.config();
console.log(process.env.API_KEY);
console.log(process.env.AUTH_DOMAIN);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: `${process.env.API_KEY}`,
    authDomain: `${process.env.AUTH_DOMAIN}`,
    projectId: `${process.env.PROJECT_ID}`,
    storageBucket: `${process.env.STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
    appId: `${process.env.APP_ID}`,
    measurementId: `${process.env.MEASUREMENT_ID}`,
};
// Initialize Firebase
const appFirebase = (0, app_1.initializeApp)(firebaseConfig);
//const analytics = getAnalytics(appFirebase);
const db = (0, firestore_1.getFirestore)(appFirebase);
exports.database = new FirebaseRepository_1.FirebaseRepository(appFirebase, db);
