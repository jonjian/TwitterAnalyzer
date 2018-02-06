// file is used to fetch twitter table info and average 5 minute increments
// this will speed up client side rendering and help with data visualization

const knex = require('knex')(require('../../knexfile'));

// query: fetch all tweets from tweets table for a given time period for keyword, sentiment, timestamp
// iterate over array for 5 minute increments
// when find the arrays that have 5 minute increments, average values
// store in increment table

// need to get the last timestamp of the increment table (account for no value)
// use this to tell the script what timestamp to continue from
let timestamp = null;
let tweetArray = [];

knex.raw('SELECT timestamp FROM tweet_increments ORDER BY timestamp DESC LIMIT 1')
  .then((data) => {
    console.log('last timestamp:', data);
    timestamp = data;
  })
  // select all tweets after last tweets timestamp and push into tweetArr for processing
  .then(() => knex.raw(`SELECT * from tweets WHERE created_at > '${timestamp}'`))
  .then((data) => {
    data.rows.forEach((tweet) => {
      tweetArray.push([tweet.keyword, tweet.sentiment, tweet.created_at, tweet.geo]);
    });
    // cache length for better time complexity
    let { length } = tweetArray;
    for (let x = 0; x < length; x += 1) {
      // for each array within tweetArr
      // average values of 5 min increments

    }
  })
  .then(() => knex('tweet_increments').insert({
    // store averaged values into table
    // insert timestamp created_at of original first tweet

  }))
  .then();
