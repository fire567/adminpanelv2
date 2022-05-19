export default (state = null, action) => {
  if (action.type === 'GET_CATEGORIESLIST') {
    return action.payload;
  }

  return state;
};
