import * as express from 'express';
import { ITourBase } from '../libs/interfaces';
import { listTours, saveTour } from '../services/tours';

export const getToursRouteHandler = (request: express.Request, response: express.Response) => {
    const townId = request.query.townId as string;
    const seasonId = request.query.seasonId as string;

    listTours(townId, seasonId)
        .then(tours => {
            response.status(200).json(tours);
        })
        .catch((err: Error) => {
            console.error("getToursRouteHandler: ", err);
            response.status(500).json({ error: err.message });
        });
}


export const postTourRouteHandler = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    const tour = request.body as ITourBase;

    saveTour(tour)
        .then(r => response.status(201).json(r))
        .catch((err: Error) => {
            console.error("postTourRouteHandler: ", err);
            response.status(500).json({ error: err.message });
        });
}

export const putTourRouteHandler = (request: express.Request, response: express.Response) => {
    const tour = request.body as ITourBase;

    saveTour(tour)
        .then(r => response.status(200).json(r))
        .catch((err: Error) => {
            console.error("putTourRouteHandler: ", err);
            response.status(500).json({ error: err.message });
        });
}
