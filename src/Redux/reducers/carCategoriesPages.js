export default (state = null, action) => {
  if (action.type === 'GET_CARCATEGORIESPAGES') {
    return action.payload;
  }

  return state;
};
