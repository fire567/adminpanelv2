import classNames from 'classnames';
import { isValid } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import classes from './PopUpOption.module.css';

const PopUpOptions = ({
  items,
  setItem,
  currentItem,
  label,
  defaultItem,
  isNeedCheck,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isValid, setisValid] = useState(true);

  const isOpenedHandler = () => {
    setIsOpened(!isOpened);
  };

  const optionHandler = (item) => {
    setItem(item);
    setisValid(true);
    setIsOpened(!isOpened);
  };

  const showItem = (item) => {
    if (label === 'Адрес') {
      return item.address;
    } else if (label === 'Тариф') {
      return item.rateTypeId.name;
    } else return item.name;
  };

  useEffect(() => {
    if (isNeedCheck && !currentItem && !defaultItem) {
      setisValid(false);
    } else setisValid(true);
  }, [isNeedCheck]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>{label}:</div>
      <div
        className={classNames(classes.input, {
          [classes.input_error]: !isValid,
          [classes.input_default]: isValid,
        })}
        onClick={isOpenedHandler}
      >
        <div className={classes.icon} />
        {currentItem
          ? showItem(currentItem)
          : defaultItem && showItem(defaultItem)}
        {!isValid && (
          <div className={classes.error_message}>Введите данные</div>
        )}
      </div>
      {isOpened &&
        (items.length > 0 ? (
          <div className={classes.options}>
            {items.map((item) => (
              <div
                key={item.id}
                className={classes.option}
                onClick={() => optionHandler(item)}
              >
                {showItem(item)}
              </div>
            ))}
          </div>
        ) : (
          <div className={classes.empty}>Нет данных</div>
        ))}
    </div>
  );
};

export default PopUpOptions;
