export default (state = false, action) => {
  if (action.type === 'IS_ALERTACTIVE') {
    return action.payload;
  }

  return state;
};
