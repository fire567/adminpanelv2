export default (state = null, action) => {
  if (action.type === 'GET_CURRENTRATE') {
    return action.payload;
  }

  return state;
};
