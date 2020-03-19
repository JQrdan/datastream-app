import React from 'react';
import kafka from 'kafka-node';
import config from '../config.js';

let client = new kafka.KafkaClient({ kafkaHost: config.KAFKA_SERVER });
let topics = [{ topic: 'averages' }];
let options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

let consumer = new kafka.Consumer(client, topics, options);

let ratings = {};

consumer.on('message', function (message) {
    json = JSON.parse(message);
    genre = json.genre;
    ratings.genre = {
        averageRating: json.averageRating,
        numRatings: json.numRatings
    };
    console.log(ratings);
});

consumer.on('error', function (err) {
  console.log(err);
});

export default PopularGenres = (props) => {
    let jsx = [];

    ratings.entries((key, value) => {
        jsx.push(
            <div>
                <h1>{key}</h1>
                <p>{value.averageRating}</p>
                <p>{value.numRatings}</p>
            </div>
        );
    });

    return jsx;
};