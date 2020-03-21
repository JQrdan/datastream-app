const kafka = require('kafka-node');
const config = require('../config/config.js')

let client = new kafka.KafkaClient({ kafkaHost: config.KAFKA_BOOTSTRAP });
let songs_topic = [{ topic: 'song-averages' }];
let options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

let songs = new kafka.Consumer(client, songs_topic, options);

let song_ratings = {};

// songs.on('message', message => {
//   json = JSON.parse(message.value);
//   song_ratings[json.name] = {
//       averageRating: json.averageRating,
//       numRatings: json.numRatings
//   };
// });

songs.on('error', err => {
  console.log(err);
});

module.exports = {
  song_ratings
};