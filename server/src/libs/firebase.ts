
import * as admin from "firebase-admin";

import { firebaseConfig, serviceAccountKey } from "./firebaseConfig";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://microscore-2-0-default-rtdb.europe-west1.firebasedatabase.app"
});

export const loadTownsFromDb = async () => {
  return admin
    .firestore()
    .collection("towns")
    .get()
    .then((docs) => {
      const data: any[] = [];
      docs.forEach((doc) => data.push(doc.data()));
      return data;
    })
    .catch((e) => {
      throw e;
    });
};



