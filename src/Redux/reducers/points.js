export default (state = null, action) => {
  if (action.type === 'GET_POINTS') {
    return action.payload;
  }

  return state;
};
