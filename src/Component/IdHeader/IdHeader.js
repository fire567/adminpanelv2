import React from 'react';
import classes from './IdHeader.module.css';

const IdHeader = ({ string }) => {
  return <div className={classes.id_field}>{string}</div>;
};

export default IdHeader;
