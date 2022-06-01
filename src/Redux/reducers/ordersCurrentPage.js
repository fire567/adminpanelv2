export default (state = 0, action) => {
  if (action.type === 'ORDERS_CURRENTPAGE') {
    return action.payload;
  }

  return state;
};
