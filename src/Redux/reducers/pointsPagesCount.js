export default (state = null, action) => {
  if (action.type === 'GET_POINTPAGES') {
    return action.payload;
  }

  return state;
};
