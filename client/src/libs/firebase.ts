import { FirebaseApp, FirebaseOptions, initializeApp } from '@firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROCESS_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const initFirebaseApp = () => { 
    return initializeApp(firebaseConfig);
};

export const firebaseApp: FirebaseApp = initFirebaseApp();