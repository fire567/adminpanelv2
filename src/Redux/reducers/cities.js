export default (state = null, action) => {
  if (action.type === 'GET_CITIES') {
    return action.payload;
  }

  return state;
};
