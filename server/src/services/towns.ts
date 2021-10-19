import { Cache } from "../libs/cache";
import { ITownBase, SortDirection } from "../libs/interfaces";
import { townsRepository } from "../repositories/towns";
import { sorterCreator } from "../libs/utils";

const townsCache: Cache<Promise<ITownBase[]>> = new Cache<Promise<ITownBase[]>>();

const listAndSortTowns = () => townsRepository.list().then(r => r.sort(sorterCreator(SortDirection.ASC)));

const getTownsKey = () => "towns";

export const listTowns = townsCache.useCache(getTownsKey, listAndSortTowns);
