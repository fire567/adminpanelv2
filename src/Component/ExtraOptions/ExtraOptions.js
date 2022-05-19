import React from 'react';
import { extra } from '../../consts';
import classes from './ExtraOptions.module.css';

const ExtraOptions = ({
  defaultItem,
  setIsFullTank,
  setIsChair,
  setIsRightWheel,
  isFullTank,
  isChair,
  isRightWheel,
}) => {
  const extraHandler = (item) => {
    if (item.id === 0) {
      setIsFullTank(!isFullTank);
    } else if (item.id === 1) {
      setIsChair(!isChair);
    } else if (item.id === 2) {
      console.log('asd');
      setIsRightWheel(!isRightWheel);
    }
  };

  return (
    <div className={classes.opt_form}>
      <div className={classes.tarif_form}>
        {extra.map((item) => (
          <div
            className={
              Object.values(defaultItem)[item.id]
                ? classes.opt_extra_form_active
                : classes.opt_extra_form
            }
            key={item.id}
          >
            <input type='checkbox' className={classes.checkbox} />
            <label
              className={classes.opt_extra}
              onClick={() => extraHandler(item)}
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraOptions;
