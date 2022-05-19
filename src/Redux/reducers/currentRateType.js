export default (state = null, action) => {
  if (action.type === 'GET_CURRENTRATETYPE') {
    return action.payload;
  }

  return state;
};
