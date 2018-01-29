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

// creating a connection to twitter stream API
const keyword = 'tesla';
const stream = T.stream('statuses/filter', { track: [keyword] });
let counter = 0;

const storeTweets = (eventMsg) => {
  // use sentiment package to evauluate the text of each tweet
  const score = sentiment(eventMsg.text);
  // shows the sentiment return of each tweet
  // use score.score to get the actual score
  // console.log(score.score);
  // console.log('success store: tweet #', counter += 1);
  // knex('tweets').insert({
  //   tweet_id: eventMsg.id_str,
  //   timestamp: eventMsg.created_at,
  //   username: eventMsg.user.name,
  //   profile_picture: eventMsg.user.profile_image_url,
  //   text: eventMsg.text,
  //   keyword,
  //   sentiment: score.score,
  //   favourites: eventMsg.user.favourites_count,
  //   retweets: eventMsg.user.statuses_count,
  //   language: eventMsg.user.lang,
  //   geo: eventMsg.user.location,
  //   coordinates: eventMsg.coordinates,
  //   timezone: eventMsg.user.time_zone,
  // })
  //   .then();
};

stream.on('tweet', storeTweets);


//  get request to search twitter for all tweets containing the word 'apple' since 2018
// T.get('search/tweets', { q: 'apple since:2018-01-01', count: 5 }, (err, data, response) => {
//   const tweets = data.statuses;
//   const length = tweets.length;
//   for (let i = 0; i < length; i += 1) {
//     console.log(tweets[i]);
// console.log('ID: ', tweets[i].user.screen_name, 'TEXT: ', tweets[i].text);
//   }
// });

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });


module.exports = router;
