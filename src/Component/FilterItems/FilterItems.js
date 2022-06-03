import React from 'react';
import OptionFilter from '../OptionFilter/OptionFilter';
import classes from './FilterItems.module.css';

const FilterItems = ({
  items,
  setIsApplied,
  isApplied,
  setIsDecline,
  isDecline,
}) => {
  const applyFilter = () => {
    setIsApplied(!isApplied);
  };

  const declineFilter = () => {
    setIsDecline(!isDecline);
  };

  return (
    <div className={classes.filter_form}>
      <div className={classes.inputs}>
        {items &&
          items.map((item) => (
            <OptionFilter
              key={item.id}
              items={item.items}
              setItem={item.setItem}
            />
          ))}
      </div>
      <div className={classes.buttons}>
        <button className={classes.decline} onClick={declineFilter}>
          Отменить
        </button>
        <button className={classes.accept} onClick={applyFilter}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default FilterItems;
