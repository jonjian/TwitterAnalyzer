require('dotenv').config();
const express = require('express');
const sentiment = require('sentiment');

const router = express.Router();
const Twit = require('twit');
const knex = require('knex')(require('../../knexfile'));

let T = new Twit({
  consumer_key: process.env.CONSUMERKEY,
  consumer_secret: process.env.CONSUMERSECRET,
  access_token: process.env.ACCESSTOKEN,
  access_token_secret: process.env.ACCESSTOKENSECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});

let counter = 0;
let keywords = [];
let stream;

const updateStream = () => {
  stream = T.stream('statuses/filter', { track: keywords });
  stream.on('connected', (response) => {
    console.log('***********');
  });
  stream.on('disconnect', (disconnectMessage) => {
    console.log('disconnect: ', disconnectMessage);
  });
  stream.on('reconnect', (request, response, connectInterval) => {
    console.log('reconnect: ');
  });
  stream.on('warning', (warning) => {
    console.log('warning: ', warning);
  });
  stream.on('error', (event) => {
    console.log('error: ', event);
  });
  stream.on('limit', (limitMessage) => {
    console.log('limit: ', limitMessage);
  });
  stream.on('tweet', (eventMsg) => {
    let keyword;
    const score = sentiment(eventMsg.text);
    for (let i = 0; i < keywords.length; i += 1) {
      if (eventMsg.text.toLowerCase().search(keywords[i]) !== -1) {
        keyword = keywords[i];
      }
    }
    if (keyword) {
      knex('tweets')
        .insert({
          tweet_id: eventMsg.id_str,
          timestamp: eventMsg.created_at,
          username: eventMsg.user.name,
          profile_picture: eventMsg.user.profile_image_url,
          text: eventMsg.text,
          keyword,
          sentiment: score.score,
          favourites: eventMsg.user.favourites_count,
          retweets: eventMsg.user.statuses_count,
          language: eventMsg.user.lang,
          geo: eventMsg.user.location,
          coordinates: eventMsg.coordinates,
          timezone: eventMsg.user.time_zone,
        })
        .then(console.log('success store ', keyword, ' tweet #', counter += 1));
    }
  });

  setTimeout(() => {
    updateStream();
  }, 240000);

  console.log('*********** UPDATE *******************', keywords);
};

knex.raw('select distinct keyword from tweet_increments')
  .then((data) => {
    data.rows.forEach(keyword => keywords.push(keyword.keyword.toLowerCase()));
  })
  .then(updateStream);

router.post('/fetchKeyword', (req, res) => {
  let keyword;
  // set keyword equal to query from client side
  keyword = req.body.query;
  if (!keywords.includes(keyword)) {
    keywords.push(keyword.toLowerCase());
  }
  // send tweet data from db back to client
  knex.raw(`select * from tweet_increments where keyword = '${keyword}' ORDER BY timestamp ASC`)
    .then(data => res.status(200).send(data.rows));
});

// knex.raw(`select sentiment from tweets where keyword = '${keyword}'`)
// knex.raw(`select sentiment, timestamp, location from tweet_increments where keyword = '${keyword}'`)

//  get request to search twitter for all tweets containing the word 'apple' since 2018
// T.get('search/tweets', { q: 'google', q: 'twitter', count: 5 }, (err, data, response) => {
//   const tweets = data.statuses;
//   const length = tweets.length;
//   for (let i = 0; i < length; i += 1) {
//     // const score = sentiment(tweets[i].text);
//     // knex('tweets')
//     //   .insert({
//     //     tweet_id: tweets[i].id_str,
//     //     timestamp: tweets[i].created_at,
//     //     username: tweets[i].user.name,
//     //     profile_picture: tweets[i].user.profile_image_url,
//     //     text: tweets[i].text,
//     //     keyword: 'apple',
//     //     sentiment: score.score,
//     //     favourites: tweets[i].user.favourites_count,
//     //     retweets: tweets[i].user.statuses_count,
//     //     language: tweets[i].user.lang,
//     //     geo: tweets[i].user.location,
//     //     coordinates: tweets[i].coordinates,
//     //     timezone: tweets[i].user.time_zone,
//     //   })
//     //   .then();
// console.log('TEXT: ', tweets[i].text);
//   }
// });

module.exports = router;
