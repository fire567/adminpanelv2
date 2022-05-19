import { getCities, getPoints, getCurrentOrder } from './Redux/actions';

export const changeOrderRequests = (dispatch, id) => {
  dispatch(getCurrentOrder(id));
  dispatch(getCities());
  dispatch(getPoints());
};
