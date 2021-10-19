import { db } from "../libs/firebase";
import { Cache } from "../libs/cache";
import { ITourBase, SortDirection } from "../libs/interfaces";
import { toursRepository } from "../repositories/tours";
import { sorterCreator } from "../libs/utils";
import { listTowns } from "./towns";
import { listSeasons } from "./seasons";

const toursCache: Cache<Promise<ITourBase[]>> = new Cache<Promise<ITourBase[]>>();

const listAndSortTours = (townId: string, seasonId: string) => () => {
    return listTowns()
        .then(towns => {
            const town = towns.find(t => t.id === townId);
            if (!!town) {
                return town;
            } else {
                throw new Error(`Town '${townId}' not found`);
            }
        })
        .then((town) => {
            return listSeasons(town.id)
                .then(r => {
                    const season = r.find(s => s.id === seasonId);
                    if (!!season) {
                        return { town, season };
                    } else {
                        throw new Error(`Season '${seasonId}' not found`);
                    }
                });
        })
        .then((composit) => toursRepository.listByTownAndSeason(composit.town.id, composit.season.id).then(r => r.sort(sorterCreator(SortDirection.ASC))));
};

const getToursKey = (townId: string, seasonId: string) => () => `townId:${townId}:seasonId:${seasonId}`;

export const listTours = (townId: string, seasonId: string) => toursCache.useCache(getToursKey(townId, seasonId), listAndSortTours(townId, seasonId))();



// TODO: DM: REFACTOR


export const getTour = (id: string): Promise<ITourBase> => {
    return db.collection("tours").doc(id).get()
      .then(doc => {
        const data: ITourBase = doc.data() as ITourBase;
        return data;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  export const updateTour = (tour: ITourBase): Promise<ITourBase> => {
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

  export const saveTour = (tour: ITourBase): Promise<ITourBase> => {
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

