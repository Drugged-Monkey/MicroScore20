import {
    ITown,
    ISeason,
    ITeamResultDetailed,
    ITownBase,
    IMM,
    IMMCrossTableMatch,
    ITeam,
    ITeamResultLight,
    ITourLight,
    IMMTableTeam,
    ITour,
} from "./interfaces";
import { appSettings } from "./settings";
import { Cache } from "./cache";

const FAKE_DELAY: number = 500;

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
        .then((res) => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.error(error);
            }
        );
};

let townsCache: Promise<ITownBase[]>;
export const loadTowns = (): Promise<ITownBase[]> => {
    if (!!townsCache) return townsCache;

    return (townsCache = fetch("/api/towns")
        .then((res) => res.json())
        .then((body) => {
            console.log(body);
            return body;
        })
        .catch((err) => console.error(err)));
};

let seasonsCache: Cache<Promise<ISeason[]>> = new Cache<Promise<ISeason[]>>();
export const loadSeasons = (townId: string): Promise<ISeason[]> => {
    const key = townId;
    let result = seasonsCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/seasons?townId=${townId}`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body);
            return body;
        })
        .catch((err) => console.error(err));

    seasonsCache.put(key, result);
    return seasonsCache.get(key);
};

let toursCache: Cache<Promise<ITour[]>> = new Cache<Promise<ITour[]>>();
export const loadTours = (townId: string, seasonId: string): Promise<ITour[]> => {
    const key = `${townId}-${seasonId}`;
    let result = toursCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/tours?townId=${townId}&seasonId=${seasonId}`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body);
            return body;
        })
        .catch((err) => console.error(err));

    toursCache.put(key, result);
    return toursCache.get(key);
}


let mmCache: Cache<Promise<IMM>> = new Cache<Promise<IMM>>();
export const loadMM = (townId: string, seasonId: string): Promise<IMM> => {
    const key = `${townId}-${seasonId}`;
    let result = mmCache.get(key);

    if (!!result) return result;

    result = fetch(`/api/mm?townId=${townId}&seasonId=${seasonId}`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body);
            return body;
        })
        .catch((err) => console.error(err));

    mmCache.put(key, result);
    return mmCache.get(key);
};

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/*
export const loadFakeTowns = (): Promise<ITownBase[]> => {
    const cities = appSettings.cities;

    return new Promise<ITownBase[]>((resolve, reject) => {
        try {
            delay(FAKE_DELAY).then(() => {
                const towns = cities.map((c) => {
                    return { name: c.name, id: c.id } as ITownBase;
                });
                resolve(towns);
            });
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
};

export const loadFakeSeasons = (id: string): Promise<ISeason[]> => {
    const cities = appSettings.cities;

    return new Promise<ISeason[]>((resolve, reject) => {
        try {
            delay(FAKE_DELAY).then(() => {
                const seasons = cities
                    .find((c) => c.id === id)
                    ?.seasons.map((c) => {
                        return { name: c.name, id: c.id } as ISeason;
                    });
                resolve(seasons);
            });
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
};

export const loadFakeMM = (townId: string, seasonId: string): Promise<IMM> => {
    const teamsCount = 10;
    const tourCount = 7;
    const questions = 36;

    const teams = new Array(teamsCount).fill(undefined).map((item, i) => {
        return {
            name: grs(10),
            id: (i + 1).toString(),
        } as ITeam;
    });

    const tours = new Array(tourCount).fill(undefined).map((item, i) => {
        const results = teams.map((team) => {
            return {
                id: team.id,
                score: grn(0, questions),
            } as ITeamResultLight;
        });

        return {
            id: (i + 1).toString(),
            results: results,
        } as ITourLight;
    });

    let crossTable: IMMCrossTableMatch[] = [];

    teams.forEach((host) =>
        teams.forEach((guest) => {
            if (
                host.id !== guest.id &&
                !!!crossTable.find(
                    (m) =>
                        (m.gId === guest.id && m.hId === host.id) ||
                        (m.gId === host.id && m.hId === guest.id)
                )
            ) {
                let hs = 0;
                let gs = 0;

                tours.forEach((t) => {
                    const hr = t.results.find((r) => r.id === host.id)?.score || 0;
                    const gr = t.results.find((r) => r.id === guest.id)?.score || 0;
                    if (hr > gr) hs += 1;
                    if (gr > hr) gs += 1;
                });

                crossTable.push({
                    hId: host.id,
                    gId: guest.id,
                    hs: hs,
                    gs: gs,
                } as IMMCrossTableMatch);
            }
        })
    );

    let table: IMMTableTeam[] = [];

    crossTable.forEach((ct) => {
        let team = table.find((t) => t.id === ct.hId);

        const { w, d, l, s } = calcScore(ct.hs, ct.gs);

        if (!!team) {
            team = {
                ...team,
                ...{
                    score: team.s + s,
                    win: team.w + w,
                    draw: team.d + d,
                    lose: team.l + l,
                },
            };
            table = table.map((t) => (t.id === team.id ? team : t));
        } else {
            table.push({
                id: ct.hId,
                n: teams.find((t) => t.id === ct.hId)?.name,
                s: s,
                w: w,
                d: d,
                l: l,
                p: 0,
            });
        }
    });

    table = table.sort((a, b) => b.s - a.s);
    let seasonName: string;

    return loadSeasons(townId)
        .then(seasons => {
            const season = seasons.find(s => s.id === seasonId);
            seasonName = season?.name;
        })
        .then(() => {
            return {
                townId: townId,
                seasonName: seasonName,
                seasonId: seasonId,
                table: table,
                crossTable: crossTable,
            } as IMM;
        })
        .catch(err => {
            console.error(err);
            return null;
        });
};

const calcScore = (
    a: number,
    b: number
): { w: number; d: number; l: number; s: number } => {
    switch (true) {
        case a > b:
            return { w: 1, d: 0, l: 0, s: 2 };
        case a == b:
            return { w: 0, d: 1, l: 0, s: 1 };
        case a < b:
            return { w: 0, d: 0, l: 1, s: 0 };
    }
};



const grs = (length: number): string => {
    return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, length);
};

const grn = (min?: number, max?: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

*/
