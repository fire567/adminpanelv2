export default (state = null, action) => {
  if (action.type === 'GET_CURRENTCITY') {
    return action.payload;
  }

  return state;
};
