export default (state = null, action) => {
  if (action.type === 'GET_CARCATEGORIES') {
    return action.payload;
  }

  return state;
};
