export default (state = null, action) => {
  if (action.type === 'GET_CURRENTPOINT') {
    return action.payload;
  }

  return state;
};
