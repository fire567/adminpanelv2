import { combineReducers } from 'redux';
import auth from './auth';
import orders from './orders';
import ordersPagesCount from './ordersPagesCount';
import cities from './cities';
import rateTypes from './rateTypes';
import rates from './rates';
import cars from './cars';
import carsPagesCount from './carsPagesCount';
import citiesList from './citiesList';
import citiesPages from './citiesPages';
import points from './points';
import pointsPagesCount from './pointsPagesCount';
import ratesList from './ratesList';
import ratesPages from './ratesPages';
import rateTypesList from './rateTypesList';
import ratesTypePages from './ratesTypePages';
import carCategories from './carCategories';
import carCategoriesPages from './carCategoriesPages';
import orderStatuses from './orderStatuses';
import orderStatusesPages from './orderStatusesPages';
import currentOrder from './currentOrder';
import pointsList from './pointsList';

export default combineReducers({
  auth,
  orders,
  ordersPagesCount,
  cities,
  rateTypes,
  rates,
  cars,
  carsPagesCount,
  citiesList,
  citiesPages,
  points,
  pointsPagesCount,
  ratesList,
  ratesPages,
  rateTypesList,
  ratesTypePages,
  carCategories,
  carCategoriesPages,
  orderStatuses,
  orderStatusesPages,
  currentOrder,
  pointsList,
});
