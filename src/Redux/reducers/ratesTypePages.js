export default (state = null, action) => {
  if (action.type === 'GET_RATESTYPEPAGES') {
    return action.payload;
  }

  return state;
};
