import { listTowns } from '../services/towns';

import * as express from 'express';

export const getTownsRouteHandler = (request: express.Request, response: express.Response) => {
  listTowns()
    .then(towns => {
      response.status(200).json(towns);
    })
    .catch((err: Error) => {
      console.error("getTownsRouteHandler: ", err);
      response.status(500).json({ error: err.message });
    });
}