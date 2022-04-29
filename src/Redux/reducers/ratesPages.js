export default (state = null, action) => {
  if (action.type === 'GET_RATESPAGES') {
    return action.payload;
  }

  return state;
};
