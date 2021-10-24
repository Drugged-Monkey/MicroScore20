import { getUser } from '../services/users';

import * as express from 'express';

// TODO: NEEDS PROTECTION
export const getUserRouteHandler = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    getUser(id)
        .then((user) => {
            if (!!user) {
                response.status(200).json(user);
            } else {
                response.status(404).json({ error: `There is no user with id '${id}'` })
            }
        })
        .catch((err: Error) => {
            console.error("getTownsRouteHandler: ", err);
        });
}
