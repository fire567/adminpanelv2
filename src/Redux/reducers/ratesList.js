export default (state = null, action) => {
  if (action.type === 'GET_RATESLIST') {
    return action.payload;
  }

  return state;
};
