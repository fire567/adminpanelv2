import React from 'react';
import classes from './LoginInput.module.css';

const LoginInput = ({
  label,
  placeHolder,
  setText,
  value,
  error,
  hideError,
  setInvalid,
}) => {
  const changeTextHandler = (event) => {
    setText(event.target.value);
    hideError('');
    setInvalid(false);
  };

  return (
    <>
      <div className={classes.input_form}>
        <div className={classes.label}>{label}</div>
        <input
          className={classes.input}
          placeholder={placeHolder}
          value={value}
          onChange={(event) => changeTextHandler(event)}
        />
      </div>
      {error && <div className={classes.error_message}>{error}</div>}
    </>
  );
};

export default LoginInput;
