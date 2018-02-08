require('dotenv').config();
const express = require('express');
const sentiment = require('sentiment');

const router = express.Router();
const Twit = require('twit');
const knex = require('knex')(require('../../knexfile'));

const T = new Twit({
  consumer_key: process.env.CONSUMERKEY,
  consumer_secret: process.env.CONSUMERSECRET,
  access_token: process.env.ACCESSTOKEN,
  access_token_secret: process.env.ACCESSTOKENSECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});

let keyword = 'tesla';
let stream;
let counter = 0;


const storeTweets = (eventMsg) => {
  // use sentiment package to evauluate the text of each tweet
  const score = sentiment(eventMsg.text);
  // shows the sentiment return of each tweet
  // use score.score to get the actual score
  // // // console.log(score.score);
  // console.log(score.score, keyword, eventMsg.text);
  // console.log('success store: tweet #', counter += 1);
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
    .then();
};

// use to keep in background to load data
let backgroundLoad = T.stream('statuses/filter', { track: [keyword] });
backgroundLoad.on('tweet', storeTweets);

router.post('/fetchKeyword', (req, res) => {
  // set keyword equal to query from client side
  keyword = req.body.query;
  // open tweet stream with filter to keyword
  stream = T.stream('statuses/filter', { track: [keyword] });
  // store in DB
  stream.on('tweet', storeTweets);
  // send tweet data from db back to client
  knex.raw(`select sentiment, timestamp, location from tweet_increments where keyword = '${keyword}'`)
    .then(data => res.status(200).send(data.rows));
});

// get only sentiment for keyword:
// knex.raw(`select sentiment from tweets where keyword = '${keyword}'`)

//  get request to search twitter for all tweets containing the word 'apple' since 2018
// T.get('search/tweets', { q: 'apple since:2018-01-01', count: 100 }, (err, data, response) => {
//   const tweets = data.statuses;
//   const length = tweets.length;
//   for (let i = 0; i < length; i += 1) {
//     const score = sentiment(tweets[i].text);
//     knex('tweets')
//       .insert({
//         tweet_id: tweets[i].id_str,
//         timestamp: tweets[i].created_at,
//         username: tweets[i].user.name,
//         profile_picture: tweets[i].user.profile_image_url,
//         text: tweets[i].text,
//         keyword: 'apple',
//         sentiment: score.score,
//         favourites: tweets[i].user.favourites_count,
//         retweets: tweets[i].user.statuses_count,
//         language: tweets[i].user.lang,
//         geo: tweets[i].user.location,
//         coordinates: tweets[i].coordinates,
//         timezone: tweets[i].user.time_zone,
//       })
//       .then();
// console.log('ID: ', tweets[i].user.screen_name, 'TEXT: ', tweets[i].text);
//   }
// });

module.exports = router;
