import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
  const history = useHistory();

  const toMainPageHandler = () => {
    history.push('/main-page/orders');
  };

  return (
    <div className={classes.error_content}>
      <div className={classes.message_form}>
        <div className={classes.error_code}>404</div>
        <div className={classes.message}>Что то пошло не так</div>
        <div className={classes.suggestion}>
          Попробуйте перезагрузить страницу
        </div>
        <button className={classes.back_button} onClick={toMainPageHandler}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
