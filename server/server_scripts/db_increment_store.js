// file is used to fetch twitter table info and average 5 minute increments
// this will speed up client side rendering and help with data visualization

const knex = require('knex')(require('../../knexfile'));

// query: fetch all tweets from tweets table for a given time period for keyword, sentiment, timestamp
// iterate over array for 5 minute increments
// when find the arrays that have 5 minute increments, average values
// store in increment table

// need to get the last timestamp of the increment table (account for no value)
// use this to tell the script what timestamp to continue from
let timestamp = '2018-02-05 18:02:54.189138-08';
let tweetArray = [];
let sortedTweets = {};
let storage = [];
let finalTweet;
// make sure to reset tweet array and sortedTweets
const incrementStore = () => knex.raw('SELECT timestamp FROM tweet_increments ORDER BY timestamp DESC LIMIT 1')
  .then((data) => {
    console.log(data.rows[0].timestamp)
    if (data.rows[0].timestamp !== null || data.rows[0].timestamp !== undefined) {
      timestamp = data.rows[0].timestamp;
    }
  })
  // select all tweets after last tweets timestamp and push into tweetArr for processing
  .then(() => knex.raw(`SELECT * from tweets WHERE created_at > '${timestamp}' ORDER BY created_at ASC`))
  .then((data) => {
    data.rows.forEach((tweet) => {
      tweetArray.push([tweet.keyword, tweet.sentiment, tweet.created_at, tweet.geo]);
    });
    // console.log(tweetArray);
    // cache length for better time complexity
    let { length } = tweetArray;
    for (let x = 0; x < length; x += 1) {
      // for each array within tweetArr [keyword, sentiment, created_at, geo]
      // if keyword isn't there in obj
      if (!sortedTweets.hasOwnProperty(tweetArray[x][0])) {
        // make a key value pair, where the key is the keyword and value is []
        sortedTweets[tweetArray[x][0]] = [];
      }
      sortedTweets[tweetArray[x][0]].push([tweetArray[x][1], tweetArray[x][2], tweetArray[x][3]]);
      // then push [sentiment, created_at, geo] to each relative keyword key
    }
    // console.log(sortedTweets);
    // run this for loop on each key withing the obj of keywords
    for (let key in sortedTweets) {
      let arraylength = sortedTweets[key].length;
      let markerTweet = null;
      for (let i = 0; i < arraylength; i += 1) {
        if (markerTweet === null) {
          markerTweet = sortedTweets[key][i];
        }
        if (sortedTweets[key][i][1] < (new Date(markerTweet[1].getTime() + 300000))) {
        //  push to storage sortedTweets[key][i]
          storage.push(sortedTweets[key][i]);
        }
        if (sortedTweets[key][i][1] > (new Date(markerTweet[1].getTime() + 300000))) {
          let time = sortedTweets[key][i - 1][1];
          // TODO: come back and use google API for averaging location of tweets
          let loc = sortedTweets[key][i - 1][2];
          let sentimentSum = storage.reduce((total, value) => total + value[0], 0);
          let averageSentiment = Math.round((sentimentSum / storage.length) * 10);
          if (Number.isNaN(averageSentiment)) {
            averageSentiment = 0;
          }
          if (loc === null || loc === undefined) {
            loc = 'United States';
          }
          finalTweet = [key, averageSentiment, time, loc];
          // insert values to knex table
          knex('tweet_increments').insert({
            keyword: finalTweet[0],
            timestamp: finalTweet[2],
            sentiment: finalTweet[1],
            location: finalTweet[3],
            // set marker tweet to next tweet created_at
          })
            .then();
          console.log('successful increment store :', finalTweet);
          storage = [];
          markerTweet = sortedTweets[key][i];
        }
      }
    }
    tweetArray = [];
    sortedTweets = {};
  })
  .then(setTimeout(incrementStore, 300000));

incrementStore();
