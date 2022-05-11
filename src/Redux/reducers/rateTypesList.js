export default (state = null, action) => {
  if (action.type === 'GET_RATESTYPELIST') {
    return action.payload;
  }

  return state;
};
