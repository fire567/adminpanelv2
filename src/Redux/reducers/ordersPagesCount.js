export default (state = null, action) => {
  if (action.type === 'GET_ORDERSPAGES') {
    return action.payload;
  }

  return state;
};
