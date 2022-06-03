import React from 'react';
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.loading_content}>
      <div className={classes.img} />
    </div>
  );
};

export default Loading;
