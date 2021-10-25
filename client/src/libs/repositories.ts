import {
    ISeasonBase,
    ITeamResultDetailed,
    ITownBase,
    IMM,
    ITour,
    IUserBase,
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
        .then((res) => { if (res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
        .catch((err) => { console.error(err); return null; });
};

let townsCache: Promise<ITownBase[]>;
export const loadTowns = (): Promise<ITownBase[]> => {
    if (!!townsCache) return townsCache;

    return townsCache = fetch("/api/towns")
        .then((res) => {
            if (res.status === 500) {
                throw new Error(res.statusText);
            };
            return res.json();
        })
        .catch((err) => { console.error(err); throw new Error(`Can't load towns: ${err}`); });
};

export const loadTown = (townId: string): Promise<ITownBase> => {
    return loadTowns()
        .then((towns) => {
            if (!!!towns || towns.length === 0) {
                throw new Error("Towns are empty!.");
            };
            const town = towns.find(t => t.id == townId);
            if (!!!town) {
                throw new Error(`Town '${townId}' not found!`);
            }
            return town;
        })
        .catch((err) => {
            console.error(err);
            throw new Error(`Town '${townId}' not found!`);
        });
};

let seasonsCache: Cache<Promise<ISeasonBase[]>> = new Cache<Promise<ISeasonBase[]>>();
export const loadSeasons = (townId: string): Promise<ISeasonBase[]> => {
    const key = townId;
    let result = seasonsCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/seasons?townId=${townId}`)
        .then((res) => { if (res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
        .catch((err) => { console.error(err); return null; });

    seasonsCache.put(key, result);
    return seasonsCache.get(key);
};

export const loadSeason = (townId: string, seasonId: string): Promise<ISeasonBase> => {
    return loadSeasons(townId)
        .then((seasons) => {
            if (!!!seasons || seasons.length === 0) {
                throw new Error("Seasons are empty!.");
            };
            const season = seasons.find(t => t.id == seasonId);
            if (!!!season) {
                throw new Error(`Season '${seasonId}' not found!`);
            }
            return season;
        })
        .catch((err) => {
            console.error(err);
            throw new Error(`Season '${seasonId}' not found!`);
        });
};

let toursCache: Cache<Promise<ITour[]>> = new Cache<Promise<ITour[]>>();
export const loadTours = (townId: string, seasonId: string): Promise<ITour[]> => {
    const key = `${townId}-${seasonId}`;
    let result = toursCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/tours?townId=${townId}&seasonId=${seasonId}`)
        .then((res) => { if (res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
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
        .then((res) => { if (res.status === 500) { throw new Error(res.statusText); }; return res.json(); })
        .catch((err) => { console.error(err); return null; });

    mmCache.put(key, result);
    return mmCache.get(key);
};

export const exchangeGoogleTokens = (idToken: string, accessToken: string): Promise<IUserBase> => {
    return fetch(`/api/google`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken, accessToken })
        })
        .then((res) => {
            if (res.status === 500) {
                throw new Error(res.statusText);
            };
            return res.json();
        })
        .then((body) => {
            return body as IUserBase;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
}

export const getUser = (id: string): Promise<IUserBase> => {
    return fetch(`/api/users/${id}`)
        .then((res) => {
            if (res.status === 500) {
                throw new Error(res.statusText);
            };
            return res.json();
        })        
        .then((body) => {
            return Promise.resolve(body as IUserBase);
        })        
        .catch((err) => {
            console.error(err);
            return null;
        });
}