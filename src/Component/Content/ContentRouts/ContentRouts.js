import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Orders from '../../../Pages/MainPage/Orders/Orders';
import CarsList from '../../../Pages/MainPage/CarsList/CarsList';
import CitiesList from '../../../Pages/MainPage/CitiesList/CitiesList';
import PointsList from '../../../Pages/MainPage/PointsList/PointsList';
import Tariff from '../../../Pages/MainPage/Tariff/Tariff';
import TariffTypes from '../../../Pages/MainPage/TariffTypes/TariffTypes';
import CarCategories from '../../../Pages/MainPage/CarCategories/CarCategories';
import OrderStatuses from '../../../Pages/MainPage/OrderStatuses/OrderStatuses';
import ChangeOrder from '../../../Pages/MainPage/Orders/ChangeOrder/ChangeOrder';
import ChangeCitie from '../../../Pages/MainPage/CitiesList/ChangeCitie/ChangeCitie';
import ChangePoints from '../../../Pages/MainPage/PointsList/ChangePoints/ChangePoints';
import ChangeTariff from '../../../Pages/MainPage/Tariff/ChangeTariff/ChangeTariff';
import ChangeTariffType from '../../../Pages/MainPage/TariffTypes/ChangeTariffType/ChangeTariffType';
import ChangeCarCategory from '../../../Pages/MainPage/CarCategories/ChangeCarCategory/ChangeCarCategory';
import ChangeOrderStatuses from '../../../Pages/MainPage/OrderStatuses/ChangeOrderStatuses/ChangeOrderStatuses';
import AddCitie from '../../../Pages/MainPage/CitiesList/AddCitie/AddCitie';
import AddPoint from '../../../Pages/MainPage/PointsList/AddPoint/AddPoint';
import AddTariff from '../../../Pages/MainPage/Tariff/AddTariff/AddTariff';
import AddTariffType from '../../../Pages/MainPage/TariffTypes/AddTariffType/AddTariffType';
import AddCarCategory from '../../../Pages/MainPage/CarCategories/AddCarCategory/AddCarCategory';
import AddOrderStatus from '../../../Pages/MainPage/OrderStatuses/AddOrderStatus/AddOrderStatus';
import ErrorPage from '../../../Pages/ErrorPage/ErrorPage';

const ContentRouts = ({ match }) => {
  return (
    <>
      <Switch>
        <Route exact path={'/main-page/orders'} component={Orders} />
        <Route
          exact
          path={'/main-page/cars-list'}
          render={() => <CarsList linkName={match.params.name} />}
        />
        <Route
          exact
          path={'/main-page/cities'}
          render={() => <CitiesList linkName={match.params.name} />}
        />
        <Route
          exact
          path={'/main-page/places'}
          render={() => <PointsList linkName={match.params.name} />}
        />
        <Route
          exact
          path={'/main-page/rates'}
          render={() => <Tariff linkName={match.params.name} />}
        />
        <Route
          exact
          path={'/main-page/rates-types'}
          render={() => <TariffTypes linkName={match.params.name} />}
        />
        <Route
          exact
          path={'/main-page/cars-categories'}
          render={() => <CarCategories linkName={match.params.name} />}
        />
        <Route
          exact
          path={'/main-page/orders-status'}
          render={() => <OrderStatuses linkName={match.params.name} />}
        />

        <Route
          exact
          path={'/main-page/orders/change/:id'}
          component={ChangeOrder}
        />
        <Route
          exact
          path={'/main-page/cities/change/:id'}
          component={ChangeCitie}
        />
        <Route
          exact
          path={'/main-page/places/change/:id'}
          component={ChangePoints}
        />
        <Route
          exact
          path={'/main-page/rates/change/:id'}
          component={ChangeTariff}
        />
        <Route
          exact
          path={'/main-page/rates-types/change/:id'}
          component={ChangeTariffType}
        />
        <Route
          exact
          path={'/main-page/cars-categories/change/:id'}
          component={ChangeCarCategory}
        />
        <Route
          exact
          path={'/main-page/orders-status/change/:id'}
          component={ChangeOrderStatuses}
        />

        <Route exact path={'/main-page/cities/add/'} component={AddCitie} />
        <Route exact path={'/main-page/places/add/'} component={AddPoint} />
        <Route exact path={'/main-page/rates/add/'} component={AddTariff} />
        <Route
          exact
          path={'/main-page/rates-types/add/'}
          component={AddTariffType}
        />
        <Route
          exact
          path={'/main-page/cars-categories/add/'}
          component={AddCarCategory}
        />
        <Route
          exact
          path={'/main-page/orders-status/add/'}
          component={AddOrderStatus}
        />
        <Redirect to={'/main-page/error'} component={ErrorPage} />
      </Switch>
    </>
  );
};

export default ContentRouts;
