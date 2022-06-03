export default (state = null, action) => {
  if (action.type === 'GET_CARSPAGES') {
    return action.payload;
  }

  return state;
};
