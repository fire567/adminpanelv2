import React from 'react';
import classes from './ChangeItem.module.css';

const ChangeItem = ({ changeArr }) => {
  return (
    <div className={classes.wrapper}>
      {changeArr.map((item) => (
        <div className={classes.component} key={item.id}>
          {item.component}
        </div>
      ))}
    </div>
  );
};

export default ChangeItem;
