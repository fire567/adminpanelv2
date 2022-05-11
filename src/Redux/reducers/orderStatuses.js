export default (state = null, action) => {
  if (action.type === 'GET_ORDERSTATUSES') {
    return action.payload;
  }

  return state;
};
