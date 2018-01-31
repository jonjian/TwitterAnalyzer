// user reducer default state: currentUser, subscriptions

export default function reducer(state = {
  currentUser: '',
  subscriptions: [],
}, action) {
  switch (action.type) {
    case 'CHANGE_USER': {
      // TODO: make all these change dynamically according to current user and subscriptions
      return { ...state, currentUser: '' };
    }
    case 'ADD_SUBSCRIPTION': {
      return { ...state, subscriptions: [] };
    }
    case 'DELETE_SUBSCRIPTION': {
      return { ...state, subscriptions: [] };
    }
    default: { return state; }
  }
}
