export default (state = null, action) => {
  if (action.type === 'GET_RATES') {
    return action.payload;
  }

  return state;
};
