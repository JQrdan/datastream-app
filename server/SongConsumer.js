const kafka = require('kafka-node');
const config = require('../config/config.js')

let client = new kafka.KafkaClient({ kafkaHost: config.KAFKA_BOOTSTRAP });
let songs_topic = [{ topic: 'top-songs' }];
let options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

let songs = new kafka.Consumer(client, songs_topic, options);

let top_songs = {
  songList: []
};

songs.on('message', message => {
  let json = JSON.parse(message.value);
  top_songs.songList = [];
  top_songs.songList = json.songList;
});

songs.on('error', err => {
  console.log(err);
});

module.exports = {
  top_songs
};