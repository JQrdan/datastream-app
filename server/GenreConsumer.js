const kafka = require('kafka-node');
const config = require('../config/config.js')

let client = new kafka.KafkaClient({ kafkaHost: config.KAFKA_BOOTSTRAP });
let genres_topic = [{ topic: 'genre-averages' }];
let options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

let genres = new kafka.Consumer(client, genres_topic, options);

let genre_ratings = {};

genres.on('message', message => {
  json = JSON.parse(message.value);
  genre_ratings[json.name] = {
      averageRating: json.averageRating,
      numRatings: json.numRatings
  };
});

genres.on('error', err => {
  console.log(err);
});

module.exports = {
  genre_ratings
};