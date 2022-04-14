import React, { useState } from 'react';
import classes from './OptionFilter.module.css';

const OptionFilter = () => {
  const [isPopUp, setIsPopUp] = useState(false);

  const popUpHandler = () => {
    setIsPopUp(!isPopUp);
  };

  return (
    <div className={classes.form} onClick={popUpHandler}>
      <div className={classes.options_icons}>
        <div className={classes.up_arrow} />
        <div className={classes.down_arrow} />
      </div>
      <div className={classes.input}>Прикол</div>
      {isPopUp && (
        <div className={classes.options}>
          <li className={classes.current_option}>qwe</li>
          <li className={classes.current_option}>asd</li>
          <li className={classes.current_option}>zxc</li>
        </div>
      )}
    </div>
  );
};

export default OptionFilter;
