import { listSeasons } from '../services/seasons';

import * as express from 'express';

export const getSeasonsRouteHandler = (request: express.Request, response: express.Response) => {
    const townId = request.query.townId as string;

    listSeasons(townId)
        .then((seasons) => {
            response.status(200).json(seasons);
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: err });
        });
}