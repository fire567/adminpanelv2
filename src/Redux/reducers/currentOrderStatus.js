export default (state = null, action) => {
  if (action.type === 'GET_CURRENTORDERSTATUS') {
    return action.payload;
  }

  return state;
};
