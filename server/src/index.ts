import express from 'express';

import { dotenvConfig } from './libs/dotenv';
import { getTownsRouteHandler } from './routes/towns';
import { getSeasonsRouteHandler } from './routes/seasons';
import { getToursRouteHandler, postTourRouteHandler } from './routes/tours';
import { getMMRouteHandler } from './routes/mm';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(dotenvConfig);
  console.log(`Listening on port ${port}`);
});

app.get('/api/towns', getTownsRouteHandler);

app.get('/api/seasons', getSeasonsRouteHandler);

app.get('/api/tours', getToursRouteHandler);
app.post('/api/tours', postTourRouteHandler);

app.get('/api/mm', getMMRouteHandler);


app.get('*', (req, res) => {
  res.status(404).json({ message: 'what???' });
});