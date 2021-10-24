import * as admin from "firebase-admin";
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROCESS_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
};

const fireBaseUrl: string = process.env.FIREBASE_URL;

const initFirebaseAdmin = () => {
    console.log("serviceAccount:", serviceAccount);

    const adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: fireBaseUrl
    });

    return adminApp.firestore();
}

const initFirebaseApp = () => {
    console.log("firebaseConfig:", firebaseConfig);

    return initializeApp(firebaseConfig);
}

export const db = initFirebaseAdmin()

export const firebaseApp = initFirebaseApp();