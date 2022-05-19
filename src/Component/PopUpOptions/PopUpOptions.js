import React from 'react';
import classes from './PopUpOptions.module.css';

const PopUpOptions = () => {
  return (
    <div className={classes.form}>
      <div className={classes.options_icons}>
        <div className={classes.up_arrow} />
        <div className={classes.down_arrow} />
      </div>
      <div className={classes.input}>{'Пусто'}</div>
    </div>
  );
};

export default PopUpOptions;
