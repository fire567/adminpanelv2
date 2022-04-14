import React from 'react';
import OptionFilter from '../OptionFilter/OptionFilter';
import classes from './FilterItems.module.css';

const FilterItems = () => {
  return (
    <div className={classes.filter_form}>
      <div className={classes.inputs}>
        <OptionFilter />
        <OptionFilter />
        <OptionFilter />
      </div>
      <button className={classes.accept}>Применить</button>
    </div>
  );
};

export default FilterItems;
