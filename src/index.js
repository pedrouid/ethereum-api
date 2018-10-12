const express = require('express');
// const redisClient = require('./redis');

const EXPRESS_PORT = process.env.EXPRESS_PORT || 3040;

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(EXPRESS_PORT, () =>
  console.log(`Express app listening on port ${EXPRESS_PORT}!`)
);
