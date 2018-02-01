// socket state so that we can use it everywhere in the app if need be

export default function reducer(state = {
  socket: null,
}, action) {
  switch (action.type) {
    case 'NEW_SOCKET': {
      return { ...state, socket: action.payload };
    }
    default: { return state; }
  }
}
