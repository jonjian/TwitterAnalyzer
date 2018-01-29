const db = require("../");
const Promise = require("bluebird");

const Tweets = db.Model.extend({
  tableName: 'tweets',
  
  storeTweets() {
    
  },
});

module.exports = db.model('Tweets', Tweets);
