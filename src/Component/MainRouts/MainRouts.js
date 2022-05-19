import React from 'react';
import LoginPage from '../../Pages/LoginPage/LoginPage';
import MainPage from '../../Pages/MainPage/MainPage';
import { Route, Switch } from 'react-router-dom';

const MainRouts = () => {
  return (
    <>
      <Switch>
        <Route path='/' component={LoginPage} exact />
        <Route path='/main-page/:name' component={MainPage} exact />
        <Route path='/main-page/:name/:action/:id' component={MainPage} exact />
        <Route path='/main-page/:name/:action' component={MainPage} exact />
      </Switch>
    </>
  );
};

export default MainRouts;
