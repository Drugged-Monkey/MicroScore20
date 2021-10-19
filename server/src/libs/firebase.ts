
import * as admin from "firebase-admin";

import { Cache } from "./cache";
import { serviceAccount, fireBaseUrl } from "./firebaseConfig";
import { ITownBase, ISeasonBase, ITour, ISortable, SortDirection, IMM } from "./interfaces";

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fireBaseUrl
});

const db = adminApp.firestore();

let townsCache: Promise<ITownBase[]>;
export const listTowns = (): Promise<ITownBase[]> => {
  if (!!townsCache) return townsCache;
  const q = db.collection("towns");

  townsCache = q.get()
    .then((docs) => {
      const data: ITownBase[] = [] as ITownBase[];
      docs.forEach((doc) => {
        const town = doc.data() as ITownBase;
        data.push({ name: town.name, id: doc.id, order: town.order });
      });
      return data.sort(sorterCreator(SortDirection.ASC));
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

  return townsCache;
};

const seasonsCache: Cache<Promise<ISeasonBase[]>> = new Cache<Promise<ISeasonBase[]>>();
export const listSeasons = (townId: string): Promise<ISeasonBase[]> => {
  const key = townId;

  let result = seasonsCache.get(key)

  if (!!result) return result;

  const q = db.collection("seasons")
    .where("townId", "==", townId);

  result = q.get()
    .then(docs => {
      const data: ISeasonBase[] = [];
      docs.forEach((doc) => {
        const season = doc.data() as ISeasonBase;
        data.push({...season, ...{  id: doc.id }} as ISeasonBase);
      });
      return data.sort(sorterCreator(SortDirection.ASC));
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

  seasonsCache.put(key, result);
  return seasonsCache.get(key);
}

const toursCache: Cache<Promise<ITour[]>> = new Cache<Promise<ITour[]>>();
export const listTours = (townId: string, seasonId: string): Promise<ITour[]> => {
  const key = `${townId}-${seasonId}`;

  let result = toursCache.get(key)

  if (!!result) return result;

  const q = db.collection("tours")
    .where("townId", "==", townId)
    .where("seasonId", "==", seasonId);

  result = q.get()
    .then(docs => {
      let data: ITour[] = [] as ITour[];
      docs.forEach((doc) => {
        const d = doc.data() as ITour;
        data.push({ ...d, ...{ id: doc.id, results: d.results.sort((a, b) => a.score - b.score) } } as ITour);
        // data.push({ ...d, ...{ id: doc.id } } as ITour);
      });
      data = data.sort(sorterCreator(SortDirection.ASC));
      return data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

  toursCache.put(key, result);
  return toursCache.get(key);
}


export const getTour = (id: string): Promise<ITour> => {
  return db.collection("tours").doc(id).get()
    .then(doc => {
      const data: ITour = doc.data() as ITour;
      return data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

export const updateTour = (tour: ITour): Promise<ITour> => {
  const id = tour.id;
  return getTour(id)
    .then(tourFromDb => {
      const tourToSave = { ...tourFromDb, ...tour};

      return db.collection("tours")
        .add(tourToSave)
        .then(r => {
          return r.get();
        })
        .then(r => {
          const result = { ...r.data(), ...{ id: r.id } };
          return result;
        });
    })
    .catch(err => {
      console.error("db: ", err);
      throw new Error(err);
    });
}

export const saveTour = (tour: ITour): Promise<ITour> => {
  return db.collection("tours")
    .add(tour)
    .then(r => {
      return r.get();
    })
    .then(r => {
      const result = { ...r.data(), ...{ id: r.id } };
      return result;
    })
    .catch(err => {
      console.error("db: ", err);
      throw new Error(err);
    });
}

const sorterCreator = (direction: SortDirection) => {
  switch (direction) {
    case SortDirection.ASC: return (a: ISortable, b: ISortable) => (a.order || 0) - (b.order || 0);
    case SortDirection.DESC: return (a: ISortable, b: ISortable) => (b.order || 0) - (a.order || 0);
  }
}