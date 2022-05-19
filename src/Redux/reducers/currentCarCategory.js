export default (state = null, action) => {
  if (action.type === 'GET_CURRENTCARCATEGORY') {
    return action.payload;
  }

  return state;
};
