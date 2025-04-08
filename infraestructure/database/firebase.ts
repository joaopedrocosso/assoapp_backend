import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeApp as initializeAdminApp } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { cert } from 'firebase-admin/app';
import dotenv from "dotenv";

dotenv.config();

// Regular Firebase config for client operations
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Admin SDK config for server operations
const adminConfig = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

// Initialize both apps
const appFirebase = initializeApp(firebaseConfig);
const adminApp = initializeAdminApp({
  credential: cert(adminConfig as any),
  storageBucket: process.env.STORAGE_BUCKET
});

// Get Firestore instances
const db = getFirestore(appFirebase);
const adminDb = getAdminFirestore(adminApp);

export const database = { app: appFirebase, db, adminApp, adminDb };