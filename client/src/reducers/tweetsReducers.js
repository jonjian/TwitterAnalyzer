// tweets will have a default state of: array of tweets, array of sentiment scores

export default function reducer(state = {
  tweets: [],
  sentimentScores: [],
  fetching: false,
}, action) {
  switch (action.type) {
    case 'FETCH_TWEETS': {
      return { ...state, fetching: true };
    }
    case 'ADD_TWEETS': {
      // TODO: need to make it so the tweets added are old tweets plus new from stream
      return { ...state, tweets: [action.payload] };
    }
    case 'ADD_SENTIMENT': {
      return { ...state, sentimentScores: [...state.sentimentScores, action.payload] };
    }
    default: { return state; }
  }
}
