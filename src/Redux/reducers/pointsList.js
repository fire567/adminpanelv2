export default (state = null, action) => {
  if (action.type === 'GET_POINTSLIST') {
    return action.payload;
  }

  return state;
};
