import { Cache } from "../libs/cache";
import { ISeasonBase, SortDirection } from "../libs/interfaces";
import { seasonsRepository } from "../repositories/seasons";
import { listTowns } from "./towns";
import { sorterCreator } from "../libs/utils";

const seasonsCache: Cache<Promise<ISeasonBase[]>> = new Cache<Promise<ISeasonBase[]>>();

const listAndSortSeasons = (townId: string) => () => {
    return listTowns()
        .then(towns => {
            const town = towns.find(t => t.id === townId);
            if (!!town) {
                return town;
            } else {
                throw new Error(`Town '${townId}' not found`);
            }
        })
        .then((town) => seasonsRepository.listByTown(town.id).then(r => r.sort(sorterCreator(SortDirection.ASC))))
};

const getSeasonsKey = (townId: string) => () => `townId:${townId}`;

export const listSeasons = (townId: string) => seasonsCache.useCache(getSeasonsKey(townId), listAndSortSeasons(townId))();
