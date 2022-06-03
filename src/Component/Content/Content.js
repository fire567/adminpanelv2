import React from 'react';
import ContentRouts from './ContentRouts/ContentRouts';
import classes from './Content.module.css';

const Content = ({ currentLink, match }) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>{currentLink}</div>
      <div className={classes.main_content}>
        <ContentRouts match={match} />
      </div>
    </div>
  );
};

export default Content;
