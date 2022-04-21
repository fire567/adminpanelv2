import { combineReducers } from 'redux';
import auth from './auth';
import orders from './orders';
import ordersPagesCount from './ordersPagesCount';
import cities from './cities';
import rateTypes from './rateTypes';
import rates from './rates';

export default combineReducers({
  auth,
  orders,
  ordersPagesCount,
  cities,
  rateTypes,
  rates,
});
