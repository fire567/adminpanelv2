export default (state = null, action) => {
  if (action.type === 'GET_ORDERS') {
    return action.payload;
  }

  return state;
};
