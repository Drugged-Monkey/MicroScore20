import { loadTownsFromDb } from '../libs/firebase';

import * as express from 'express';

export const getTownsRouteHandler = (request: express.Request, response: express.Response) => {
  loadTownsFromDb()
    .then(r => {
      response.status(200).json(r);
    })
    .catch(err => {
      response.status(500).json({ error: err });
    })
}