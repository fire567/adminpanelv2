import React from 'react';
import classes from './AddItemsHeader.module.css';

const AddItemsHeader = () => {
  return (
    <div className={classes.header_form}>
      <button className={classes.button}>Добавить</button>
    </div>
  );
};

export default AddItemsHeader;
