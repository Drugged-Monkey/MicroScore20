import { loadSeasonsFromDb } from '../libs/firebase';

import * as express from 'express';

export const getSeasonsRouteHandler = (request: express.Request, response: express.Response) => {
    const townId = request.query.townId as string;

    loadSeasonsFromDb(townId)
        .then(r => {
            response.status(200).json(r);
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: err });
        });
}