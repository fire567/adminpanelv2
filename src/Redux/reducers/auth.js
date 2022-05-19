export default (state = null, action) => {
  if (action.type === 'POST_AUTH') {
    return action.payload;
  }

  return state;
};
