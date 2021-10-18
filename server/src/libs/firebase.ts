
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
  const q = admin
    .firestore()
    .collection("towns");

   townsCache = q.get()
    .then((docs) => {
      const data: ITownBase[] = [] as ITownBase[];
      docs.forEach((doc) => data.push({ name: (doc.data() as ITownBase).name, id: doc.id }));
      return data.sort((a, b) => (a.order || 0) - (b.order || 0));
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

    return townsCache;
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
      docs.forEach((doc) => {
        const season = (doc.data() as ISeasonBase)
        data.push({ name: season.name, id: doc.id, order: season.order });
      });
      return data.sort((a, b) => (a.order || 0) - (b.order || 0));
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

  seasonsCache.put(key, result);
  return seasonsCache.get(key);
}