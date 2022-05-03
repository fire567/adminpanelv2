export default (state = null, action) => {
  if (action.type === 'GET_CURRENTORDER') {
    return action.payload;
  }

  return state;
};
