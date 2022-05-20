import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import classes from './TextInput.module.css';

const TextInput = ({
  defaultItem,
  label,
  setItem,
  currentItem,
  isNeedCheck,
  setIsNeedCheck,
  inputType,
  minPrice,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState('');

  const inputHandler = (e) => {
    setItem(e.target.value);
    setIsValid(true);
    setIsNeedCheck(false);
  };

  useEffect(() => {
    if (minPrice) {
      if (
        (isNeedCheck && currentItem === '') ||
        (isNeedCheck && currentItem < minPrice)
      ) {
        if (currentItem) {
          setMessage('Значение меньше минимальной цены');
        } else setMessage('Введите данные');
        setIsValid(false);
      } else setIsValid(true);
    } else {
      if (isNeedCheck && currentItem === '') {
        setIsValid(false);
        setMessage('Введите данные');
      } else setIsValid(true);
    }
  }, [isNeedCheck]);

  return (
    <div className={classes.input_form}>
      <div className={classes.label}>{label}</div>
      <div className={classes.input_wrapper}>
        <input
          type={inputType && inputType}
          className={classNames(classes.input, {
            [classes.input_error]: !isValid,
            [classes.input_default]: isValid,
          })}
          defaultValue={defaultItem && defaultItem}
          onChange={(e) => inputHandler(e)}
        />
        {!isValid && <div className={classes.error_message}>{message}</div>}
      </div>
    </div>
  );
};

export default TextInput;
