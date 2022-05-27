import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAlertActive } from '../../Redux/actions';
import classes from './Alert.module.css';

const Alert = () => {
  const dispatch = useDispatch();
  const isAlertActive = useSelector((state) => state.isAlertActive);

  useEffect(() => {
    if (isAlertActive) {
      setTimeout(closeAlert, 7000);
    }
  }, [isAlertActive]);

  const closeAlert = () => {
    dispatch(setIsAlertActive(false));
  };

  return (
    <div className={isAlertActive ? classes.wrapper : classes.wrapper_closed}>
      <div className={classes.left_side}>
        <div className={classes.accept_icon} />
        Успех! Вы добавили машину
      </div>
      <div className={classes.cancel_icon} onClick={closeAlert} />
    </div>
  );
};

export default Alert;
