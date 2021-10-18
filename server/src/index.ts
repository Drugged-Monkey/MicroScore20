import express from 'express';

import { dotenvConfig } from './libs/dotenv';
import { loadTownsFromDb } from './libs/firebase';

const app = express();
const port = process.env.PORT || 5000;

console.log(dotenvConfig);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.get('/api/towns', (req, res) => {
  loadTownsFromDb()
    .then(r => {
      res.status(200).json(r);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
});
