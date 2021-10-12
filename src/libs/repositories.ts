import { ITown, ISeason, ITeamResult, ITownBase, IMM, IMMCrossTableMatch, ITeam, ITeamResultLight, ITourLight, IMMTableTeam } from "./interfaces";
import { appSettings } from './settings';

const FAKE_DELAY: number = 500;

export const loadTournament = async (id: number): Promise<ITeamResult[]> => {
    const key = id.toString();

    return await fetch(
        `https://api.rating.chgk.net/tournaments/${key}/results?includeTeamMembers=0&includeMasksAndControversials=0&includeTeamFlags=0&includeRatingB=0`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.error(error);
            }
        );
}


export const loadTowns = (): Promise<ITownBase[]> => {
    const cities = appSettings.cities;

    return new Promise<ITownBase[]>((resolve, reject) => {
        try {
            delay(FAKE_DELAY).then(() => {
                const towns = cities.map(c => { return { name: c.name, id: c.id } as ITownBase });
                resolve(towns);
            });
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export const loadSeasons = (id: string): Promise<ISeason[]> => {
    const cities = appSettings.cities;

    return new Promise<ISeason[]>((resolve, reject) => {
        try {
            delay(FAKE_DELAY).then(() => {
                const seasons = cities.find(c => c.id === id)?.seasons.map(c => { return { name: c.name, id: c.id } as ISeason });
                resolve(seasons);
            });
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export const loadMM = (townId: string, seasonId: string): Promise<IMM> => {
    const teamsCount = 10;
    const tourCount = 7;
    const questions = 36;

    const teams = new Array(teamsCount).fill(undefined).map((item, i) => {
        return {
            name: grs(10),
            id: (i + 1).toString()
        } as ITeam;
    });

    const tours = new Array(tourCount).fill(undefined).map((item, i) => {
        const results = teams.map(team => {
            return {
                id: team.id,
                score: grn(0, questions)
            } as ITeamResultLight
        });

        return {
            id: (i + 1).toString(),
            results: results
        } as ITourLight;
    });

    let crossTable: IMMCrossTableMatch[] = [];

    teams.forEach((host) => teams.forEach((guest) => {
        if (host.id !== guest.id
            && !!!crossTable.find(m =>
                m.guestTeamId === guest.id && m.hostTeamId === host.id
                ||
                m.guestTeamId === host.id && m.hostTeamId === guest.id
            )
        ) {
            let hs = 0;
            let gs = 0;
            tours.forEach(t => {
                const hr = t.results.find(r => r.id === host.id)?.score || 0;
                const gr = t.results.find(r => r.id === guest.id)?.score || 0;
                if (hr > gr) hs += 1;
                if (gr > hr) gs += 1;
            });

            crossTable.push({
                hostTeamId: host.id,
                guestTeamId: guest.id,
                hostScore: hs,
                guestScore: gs
            } as IMMCrossTableMatch)
        }
    }));

    let table: IMMTableTeam[] = [];

    crossTable.forEach(ct => {
        let team = table.find(t => t.id === ct.hostTeamId);

        const {w,d,l,s} = calcScore(ct.hostScore, ct.guestScore);

        if (!!team) {
            team = {
                ...team,
                ...{
                    score: team.score + s,
                    win : team.win + w,
                    draw: team.draw + d,
                    lose: team.lose + l
                }
            }
            table = table.map((t) => t.id === team.id ? team : t);
        } else {
            table.push({
                id: ct.hostTeamId,
                name: teams.find(t => t.id === ct.hostTeamId)?.name,
                score: s,
                win: w,
                draw: d,
                lose: l,
                place: 0
            });
        }
    });

    table = table.sort((a, b) => b.score - a.score);

    return new Promise<IMM>((resolve, reject) => {
        try {
            delay(FAKE_DELAY).then(() => {

                const mm = {
                    townId: townId,
                    seasonId: seasonId,
                    table: table,
                    crossTable: crossTable
                } as IMM;

                resolve(mm);
            });
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}


const calcScore = (a: number, b: number): { w: number, d: number; l: number; s: number; } => {
    switch (true) {
        case a > b: return { w: 1, d: 0, l: 0, s: 2 };
        case a == b: return { w: 0, d: 1, l: 0, s: 1 };
        case a < b: return { w: 0, d: 0, l: 1, s: 0 };
    }
}

const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const grs = (length: number): string => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
}

const grn = (min?: number, max?: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}