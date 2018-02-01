// paths: 'FETCH_TWEETS', 'ADD_TWEETS':

export const fetchTweets = tweets => ({
  type: 'FETCH_TWEETS',
  payload: tweets,
});

export const addTweet = tweet => ({
  type: 'ADD_TWEETS',
  payload: tweet,
});

export const addSentiment = sentiment => ({
  type: 'ADD_SENTIMENT',
  payload: sentiment,
});
