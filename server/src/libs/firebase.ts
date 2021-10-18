
import * as admin from "firebase-admin";

import { Cache } from "./cache";
import { firebaseConfig, serviceAccount, fireBaseUrl } from "./firebaseConfig";
import { ITownBase, ISeasonBase } from "./interfaces";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fireBaseUrl
});

let townsCache: Promise<ITownBase[]>;
export const loadTownsFromDb = async (): Promise<ITownBase[]> => {
  if (!!townsCache) return townsCache;
  return townsCache = admin
    .firestore()
    .collection("towns")
    .get()
    .then((docs) => {
      const data: ITownBase[] = [] as ITownBase[];
      docs.forEach((doc) => data.push({ name: (doc.data() as ITownBase).name, id: doc.id }));
      return data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

const seasonsCache: Cache<Promise<ISeasonBase[]>> = new Cache<Promise<ISeasonBase[]>>();
export const loadSeasonsFromDb = async (townId: string): Promise<ISeasonBase[]> => {
  const key = townId;

  let result = seasonsCache.get(key)

  if (!!result) return result;

  const q = admin
    .firestore()
    .collection("seasons")
    .where("townId", "==", townId);

  result = q.get()
    .then(docs => {
      const data: ISeasonBase[] = [] as ISeasonBase[];
      docs.forEach((doc) => data.push({ name: (doc.data() as ISeasonBase).name, id: doc.id }));
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

  seasonsCache.put(key, result);
  return seasonsCache.get(key);
}