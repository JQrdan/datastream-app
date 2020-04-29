const express = require('express');
const axios = require('axios');
const { searchViaRating, searchViaID } = require('./Elastic.js');
const app = express();
const port = 3000;

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

app.get('/elastic/:index/rating', async (req, res) => {
  console.log(req.params);
  searchViaRating(
    `${req.params.index}-averages`,
    req.query.minRating ? req.query.minRating : 0,
    req.query.maxRating ? req.query.maxRating : 5,
    req.query.minRatingCount ? req.query.minRatingCount : 0,
    req.query.maxRatingCount ? req.query.maxRatingCount : 1000,
    req.query.page ? req.query.page : 0,
    result => {
      res.send(result)
    }
  );
});

app.get('/elastic/:index/:id', async (req, res) => {
  console.log(req.params);
  searchViaID(
    `${req.params.index}`,
    req.params.id,
    result => {
      res.send(result)
    }
  );
});

app.listen(port, () => console.log(`UI proxy listening on port ${port}!`));