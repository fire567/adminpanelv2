import React, { useEffect, useState } from 'react';
import classes from './OptionFilter.module.css';

const OptionFilter = ({ items, setItem, isEmpty, setIsEmpty }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [label, setLabel] = useState(null);

  const popUpHandler = () => {
    setIsPopUp(!isPopUp);
  };

  useEffect(() => {
    if (isEmpty) {
      setIsEmpty(null);
      setLabel(null);
    }
  }, [isEmpty]);

  const currentOptionHandler = (item) => {
    setLabel(item.name);
    setItem(item.id);
  };

  return (
    <div className={classes.form} onClick={popUpHandler}>
      <div className={classes.options_icons}>
        <div className={classes.up_arrow} />
        <div className={classes.down_arrow} />
      </div>
      <div className={classes.input}>{label ? label : 'Пусто'}</div>
      {isPopUp && (
        <div className={classes.options}>
          {items.map((item) => (
            <li
              className={classes.current_option}
              key={item.id}
              onClick={() => currentOptionHandler(item)}
            >
              {item.name}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionFilter;
