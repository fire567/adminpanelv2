import React from 'react';
import classes from './Price.module.css';

const Price = ({ defaultItem }) => {
  return <div className={classes.wrapper}>Цена: {defaultItem}</div>;
};

export default Price;
