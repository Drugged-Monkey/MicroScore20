import { listTowns } from '../services/towns';

import * as express from 'express';

export const getTownsRouteHandler = (request: express.Request, response: express.Response) => {
  listTowns()
    .then(r => {
      response.status(200).json(r);
    })
    .catch(err => {
      response.status(500).json({ error: err });
    })
}