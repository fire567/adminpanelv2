import React from 'react';
import { Route } from 'react-router-dom';
import Orders from '../../Pages/MainPage/Orders/Orders';
import CarsList from '../../Pages/MainPage/CarsList/CarsList';
import CitiesList from '../../Pages/MainPage/CitiesList/CitiesList';
import PointsList from '../../Pages/MainPage/PointsList/PointsList';
import Tariff from '../../Pages/MainPage/Tariff/Tariff';
import classes from './Content.module.css';
import TariffTypes from '../../Pages/MainPage/TariffTypes/TariffTypes';
import CarCategories from '../../Pages/MainPage/CarCategories/CarCategories';
import OrderStatuses from '../../Pages/MainPage/OrderStatuses/OrderStatuses';

const Content = ({ currentLink }) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>{currentLink}</div>
      <div className={classes.main_content}>
        <Route path={'/main-page/orders'} component={Orders} />
        <Route path={'/main-page/cars-list'} component={CarsList} />
        <Route path={'/main-page/cities'} component={CitiesList} />
        <Route path={'/main-page/places'} component={PointsList} />
        <Route path={'/main-page/rates'} component={Tariff} />
        <Route path={'/main-page/rates-types'} component={TariffTypes} />
        <Route path={'/main-page/cars-categories'} component={CarCategories} />
        <Route path={'/main-page/orders-status'} component={OrderStatuses} />
      </div>
    </div>
  );
};

export default Content;
