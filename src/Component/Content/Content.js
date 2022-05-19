import React from 'react';
import ContentRouts from './ContentRouts/ContentRouts';
import classes from './Content.module.css';

const Content = ({ currentLink }) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>{currentLink}</div>
      <div className={classes.main_content}>
        <ContentRouts />
      </div>
    </div>
  );
};

export default Content;
