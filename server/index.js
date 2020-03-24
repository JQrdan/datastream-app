const express = require('express');
const axios = require('axios');
const top_songs = require('./SongConsumer.js');
const genre_ratings = require('./GenreConsumer.js');
const app = express();
const port = 3000;

const KAKFA_REST_ENDPOINT = 'http://kafkarest:8082'

var allowCrossDomain = function(_, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain);

app.get('/topics', (_, res) => {
  axios.get(`${KAKFA_REST_ENDPOINT}/topics`).then(topics => {
    res.send(topics.data);
  }).catch(error => {
    console.log(error);
  });
});

app.get('/genres', (_, res) => {
  res.send(genre_ratings);
})

app.get('/songs', (_, res) => {
  res.send(top_songs);
})

app.listen(port, () => console.log(`UI proxy listening on port ${port}!`));