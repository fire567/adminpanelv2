import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Orders from '../../Pages/MainPage/Orders/Orders';
import CarsList from '../../Pages/MainPage/CarsList/CarsList';
import CitiesList from '../../Pages/MainPage/CitiesList/CitiesList';
import PointsList from '../../Pages/MainPage/PointsList/PointsList';
import Tariff from '../../Pages/MainPage/Tariff/Tariff';
import classes from './Content.module.css';
import TariffTypes from '../../Pages/MainPage/TariffTypes/TariffTypes';
import CarCategories from '../../Pages/MainPage/CarCategories/CarCategories';
import OrderStatuses from '../../Pages/MainPage/OrderStatuses/OrderStatuses';
import ChangeOrder from '../../Pages/MainPage/Orders/ChangeOrder/ChangeOrder';

const Content = ({ currentLink }) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>{currentLink}</div>
      <div className={classes.main_content}>
        <Switch>
          <Route exact path={'/main-page/orders'} component={Orders} />
          <Route exact path={'/main-page/cars-list'} component={CarsList} />
          <Route exact path={'/main-page/cities'} component={CitiesList} />
          <Route exact path={'/main-page/places'} component={PointsList} />
          <Route exact path={'/main-page/rates'} component={Tariff} />
          <Route
            exact
            path={'/main-page/rates-types'}
            component={TariffTypes}
          />
          <Route
            exact
            path={'/main-page/cars-categories'}
            component={CarCategories}
          />
          <Route
            exact
            path={'/main-page/orders-status'}
            component={OrderStatuses}
          />

          <Route
            exact
            path={'/main-page/:name/change/:id'}
            component={ChangeOrder}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Content;
