
import * as admin from "firebase-admin";

import { firebaseConfig, serviceAccount } from "./firebaseConfig";
import { ITownBase } from "./interfaces";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://microscore-2-0-default-rtdb.europe-west1.firebasedatabase.app"
});

let townsCache: Promise<ITownBase[]>;
export const loadTownsFromDb = async () => {
  if(!!townsCache) return townsCache;

   return townsCache = admin
      .firestore()
      .collection("towns")
      .get()
      .then((docs) => {
        const data: ITownBase[] = [] as ITownBase[];
        docs.forEach((doc) => data.push({ name: doc.data().name , id: doc.id }));
        return data;
      })
      .catch((e) => {
        throw e;
      });
};



