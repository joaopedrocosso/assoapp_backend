import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { FirebaseRepository } from "../../application/services/FirebaseRepository";
import dotenv from "dotenv";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config();
console.log(process.env.API_KEY);
console.log(process.env.AUTH_DOMAIN);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const serviceAccount = {
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

const appFirebase = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
});

const db = getFirestore(appFirebase);

export const database = new FirebaseRepository(appFirebase, db);
