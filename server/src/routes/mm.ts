
import * as express from 'express';
import { IMM, IMMCrossTableMatch, IMMTableTeam, ITeam } from '../libs/interfaces';
import { listTours } from '../services/tours';
import { listTowns } from '../services/towns';
import { listSeasons } from '../services/seasons';

export const getMMRouteHandler = (request: express.Request, response: express.Response) => {
    const townId = request.query.townId as string;
    const seasonId = request.query.seasonId as string;

    listTowns()
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
        .then((data) => {
            const season = data.season;
            const town = data.town;
            const exclude = season.exclude || [];

            return listTours(town.id, season.id)
                .then(tours => {
                    let table: IMMTableTeam[] = [];
                    const crossTable: IMMCrossTableMatch[] = [];

                    let teams: ITeam[] = [...new Set(tours.flatMap(t => t.results).map(item => item.name))].map((name, i) => { return { id: (i+1).toString(), name } as ITeam });

                    teams = teams.filter(t => !!!exclude.find(e => e.name === t.name || e.id === t.id || (!!e.ratingId &&  t.ratingId && e.ratingId === t.ratingId)));

                    tours = tours.map(tour => {
                        return { ...tour, ...{
                                results: tour.results.map(r => {
                                        return { ...r, ...{ id: teams.find(t => t.name === r.name)?.id } }
                                    })
                                }
                            }
                        }
                    );

                    teams.forEach((host) =>
                        teams.forEach((guest) => {
                            if (host.id !== guest.id) {
                                let hs = 0;
                                let gs = 0;

                                tours.forEach((t) => {
                                    const hr = t.results.find(result => result.id === host.id)?.score || 0;
                                    const gr = t.results.find(result => result.id === guest.id)?.score || 0;
                                    if (hr > gr) hs += 1;
                                    if (gr > hr) gs += 1;
                                });

                                crossTable.push({
                                    hId: host.id,
                                    gId: guest.id,
                                    hs,
                                    gs,
                                } as IMMCrossTableMatch);
                            }
                        })
                    );

                    crossTable.forEach((ct) => {
                        let team = table.find((t) => t.id === ct.hId);

                        const { w, d, l, s } = calcScore(ct.hs, ct.gs);

                        if (!!team) {
                            team = {
                                ...team,
                                ...{
                                    s: team.s + s,
                                    w: team.w + w,
                                    d: team.d + d,
                                    l: team.l + l,
                                },
                            };
                            table = table.map((t) => (t.id === team.id ? team : t));
                        } else {
                            table.push({
                                id: ct.hId,
                                n: teams.find((t) => t.id === ct.hId)?.name,
                                s,
                                w,
                                d,
                                l,
                                p: 0,
                            } as IMMTableTeam);
                        }
                    });

                    table = table.sort((a, b) => b.s - a.s);

                    const mm = {
                        townId: town.id,
                        seasonId: season.id,
                        seasonName: season.name,
                        table,
                        crossTable
                    } as IMM;

                    response.status(200).json(mm);
                })
                .catch(err => {
                    throw err;
                })
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: err });
        });
};

const calcScore = ( a: number, b: number): { w: number; d: number; l: number; s: number } => {
    switch (true) {
        case a > b:
            return { w: 1, d: 0, l: 0, s: 2 };
        case a === b:
            return { w: 0, d: 1, l: 0, s: 1 };
        case a < b:
            return { w: 0, d: 0, l: 1, s: 0 };
    }
};