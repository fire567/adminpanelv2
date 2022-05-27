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
import currentCity from './currentCity';
import currentPoint from './currentPoint';
import currentRate from './currentRate';
import currentRateType from './currentRateType';
import currentOrderStatus from './currentOrderStatus';
import currentCarCategory from './currentCarCategory';
import currentCar from './currentCar';
import categoriesList from './categoriesList';
import isAlertActive from './isAlertActive';

export const reduceOrders = (state) => state.orders;
export const reduceOrdersPagesCount = (state) => state.ordersPagesCount;
export const reduceCities = (state) => state.cities;
export const reduceRateTypes = (state) => state.rateTypes;
export const reduceRates = (state) => state.rates;
export const reducePointsList = (state) => state.pointsList;
export const reduceCurrentOrder = (state) => state.currentOrder;
export const reduceOrderStatuses = (state) => state.orderStatuses;

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
  currentCity,
  currentPoint,
  currentRate,
  currentRateType,
  currentOrderStatus,
  currentCarCategory,
  currentCar,
  categoriesList,
  isAlertActive,
});
