
import * as admin from "firebase-admin";
import { serviceAccount, fireBaseUrl } from "./firebaseConfig";

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fireBaseUrl
});

export const db = adminApp.firestore();
