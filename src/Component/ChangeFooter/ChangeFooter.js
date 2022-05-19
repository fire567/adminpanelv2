import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './ChangeFooter.module.css';

const ChangeFooter = ({
  setIsAcceptBtnTriggered,
  isAcceptBtnTriggered,
  setIsNeedCheck,
}) => {
  const history = useHistory();
  const cancelBtnHandler = () => {
    history.goBack();
  };

  const acceptBtnHandler = () => {
    setIsAcceptBtnTriggered(!isAcceptBtnTriggered);
    setIsNeedCheck(true);
  };

  return (
    <div className={classes.buttons_form}>
      <button className={classes.cancel} onClick={cancelBtnHandler}>
        Отменить
      </button>
      <button className={classes.apply} onClick={acceptBtnHandler}>
        Принять
      </button>
    </div>
  );
};

export default ChangeFooter;
