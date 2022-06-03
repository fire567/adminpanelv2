export default (state = null, action) => {
  if (action.type === 'GET_CITIESLIST') {
    return action.payload;
  }

  return state;
};
