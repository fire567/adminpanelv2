export default (state = null, action) => {
  if (action.type === 'GET_CURRENTCAR') {
    return action.payload;
  }

  return state;
};
