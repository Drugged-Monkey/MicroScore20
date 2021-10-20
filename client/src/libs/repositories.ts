import {
    ISeason,
    ITeamResultDetailed,
    ITownBase,
    IMM,
    ITour,
} from "./interfaces";

import { Cache } from "./cache";

export const loadTournamentFromRating = async (
    id: number
): Promise<ITeamResultDetailed[]> => {
    const key = id.toString();

    return await fetch(
        `https://api.rating.chgk.net/tournaments/${key}/results?includeTeamMembers=0&includeMasksAndControversials=0&includeTeamFlags=0&includeRatingB=0`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    .then((res) => { if(res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
    .catch((err) => { console.error(err); return null; });
};

let townsCache: Promise<ITownBase[]>;
export const loadTowns = (): Promise<ITownBase[]> => {
    if (!!townsCache) return townsCache;

    return townsCache = fetch("/api/towns")
        .then((res) => { if(res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
        .catch((err) => { console.error(err); return null; });
};

let seasonsCache: Cache<Promise<ISeason[]>> = new Cache<Promise<ISeason[]>>();
export const loadSeasons = (townId: string): Promise<ISeason[]> => {
    const key = townId;
    let result = seasonsCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/seasons?townId=${townId}`)
        .then((res) => { if(res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
        .catch((err) => { console.error(err); return null; });

    seasonsCache.put(key, result);
    return seasonsCache.get(key);
};

let toursCache: Cache<Promise<ITour[]>> = new Cache<Promise<ITour[]>>();
export const loadTours = (townId: string, seasonId: string): Promise<ITour[]> => {
    const key = `${townId}-${seasonId}`;
    let result = toursCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/tours?townId=${townId}&seasonId=${seasonId}`)
        .then((res) => { if(res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
        .catch((err) => { console.error(err); return null; });

    toursCache.put(key, result);
    return toursCache.get(key);
}


let mmCache: Cache<Promise<IMM>> = new Cache<Promise<IMM>>();
export const loadMM = (townId: string, seasonId: string): Promise<IMM> => {
    const key = `${townId}-${seasonId}`;
    let result = mmCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/mm?townId=${townId}&seasonId=${seasonId}`)
        .then((res) => { if(res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
        .catch((err) => { console.error(err); return null; });

    mmCache.put(key, result);
    return mmCache.get(key);
};