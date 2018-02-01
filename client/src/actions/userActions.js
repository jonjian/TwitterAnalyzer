// paths: 'CHANGE_USER', 'ADD_SUBSCRIPTION', 'DELETE_SUBSCRIPTION'

export const changeUser = user => ({
  type: 'CHANGE_USER',
  payload: user,
});

export const addSub = sub => ({
  type: 'ADD_SUBSCRIPTION',
  payload: sub,
});

export const deleteSub = sub => ({
  type: 'ADD_SUBSCRIPTION',
  payload: sub,
});
