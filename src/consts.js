import orders from './assets/orders.svg';
import carsList from './assets/cars-list.svg';
import cities from './assets/cities.svg';
import places from './assets/places.svg';
import rates from './assets/rates.svg';
import ratesType from './assets/places.svg';
import carCategory from './assets/cities.svg';
import error from './assets/error.svg';

export const links = [
  { id: '0', name: 'Заказы', svg: orders, path: 'orders' },
  { id: '1', name: 'Список авто', svg: carsList, path: 'cars-list' },
  { id: '2', name: 'Города', svg: cities, path: 'cities' },
  { id: '3', name: 'Места выдачи', svg: places, path: 'places' },
  { id: '4', name: 'Тарифы', svg: rates, path: 'rates' },
  { id: '5', name: 'Типы тарифов', svg: ratesType, path: 'rates-types' },
  {
    id: '6',
    name: 'Категории автомобилей',
    svg: carCategory,
    path: 'cars-categories',
  },
  { id: '7', name: 'Статусы заказов', svg: error, path: 'orders-status' },
];

export const extra = [
  { id: 0, name: 'Полный бак' },
  { id: 2, name: 'Детское кресло' },
  { id: 3, name: 'Правый руль' },
];
