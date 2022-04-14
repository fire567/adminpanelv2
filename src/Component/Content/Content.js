import React from 'react';
import { Route } from 'react-router-dom';
import Orders from '../../Pages/MainPage/Orders/Orders';
import classes from './Content.module.css';

const Content = ({ currentLink }) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>{currentLink}</div>
      <div className={classes.main_content}>
        <Route path={'/main-page/orders'} component={Orders} />
      </div>
    </div>
  );
};

export default Content;
