export default (state = null, action) => {
  if (action.type === 'GET_ORDERSTATUSESPAGES') {
    return action.payload;
  }

  return state;
};
