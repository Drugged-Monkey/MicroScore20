import * as express from 'express';
import { ITour } from '../libs/interfaces';

import { listSeasons, listTours, listTowns, saveTour } from '../libs/firebase';

export const getToursRouteHandler = (request: express.Request, response: express.Response) => {
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
        .then((r) => {
            const season = r.season;
            const town = r.town;

            return listTours(town.id, season.id)
                .then(tours => {
                    response.status(200).json(tours);
                })
                .catch(err => {
                    throw err;
                })
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: err });
        });
}

export const postTourRouteHandler = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    const tour = request.body as ITour;

    saveTour(tour)
        .then(r => response.status(201).json(r))
        .catch(err => {
            console.error("handler: ", err);
            response.status(500).json({ error: err });
        });
}

export const putTourRouteHandler = (request: express.Request, response: express.Response) => {
    const tour = request.body as ITour;

    saveTour(tour)
        .then(r => response.status(201).json(r))
        .catch(err => {
            console.error("handler: ", err);
            response.status(500).json({ error: err });
        });
}