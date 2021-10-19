import { listTowns, listSeasons } from '../libs/firebase';

import * as express from 'express';

export const getSeasonsRouteHandler = (request: express.Request, response: express.Response) => {
    const townId = request.query.townId as string;

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
                    response.status(200).json(r);
                });
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: err });
        });
}