import express from 'express';

import { dotenvConfig } from './libs/dotenv';
import { getTownsRouteHandler } from './routes/towns';
import { getSeasonsRouteHandler } from './routes/seasons';

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(dotenvConfig);
  console.log(`Listening on port ${port}`)
});

app.get('/api/towns', getTownsRouteHandler);
app.get('/api/seasons', getSeasonsRouteHandler);