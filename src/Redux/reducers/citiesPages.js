export default (state = null, action) => {
  if (action.type === 'GET_CITIESPAGES') {
    return action.payload;
  }

  return state;
};
