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
}) => {
  const [isValid, setIsValid] = useState(true);

  const inputHandler = (e) => {
    setItem(e.target.value);
    setIsValid(true);
    setIsNeedCheck(false);
  };

  useEffect(() => {
    if (isNeedCheck && currentItem === '') {
      setIsValid(false);
    } else setIsValid(true);
  }, [isNeedCheck]);

  return (
    <div className={classes.input_form}>
      <div className={classes.label}>{label}</div>
      <div className={classes.input_wrapper}>
        <input
          className={classNames(classes.input, {
            [classes.input_error]: !isValid,
            [classes.input_default]: isValid,
          })}
          defaultValue={defaultItem && defaultItem}
          onChange={(e) => inputHandler(e)}
        />
        {!isValid && (
          <div className={classes.error_message}>Введите данные</div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
