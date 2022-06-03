import React, { useState } from 'react';
import classNames from 'classnames';
import classes from './ColorPicker.module.css';

const ColorPicker = ({ label, defaultItem, setColors }) => {
  const [text, setText] = useState('');

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  const addColorHandler = () => {
    if (text) {
      setColors((prev) => [...prev, text]);
      setText('');
    }
  };

  const deleteColorHandler = (currentIndex) => {
    setColors((prev) => {
      let newArr = [];
      prev.map((item, index) => {
        if (currentIndex === index) {
          prev.splice(index, 1);
        }
      });
      newArr = [...prev];
      return newArr;
    });
  };

  return (
    <div className={classes.input_form}>
      <div className={classes.label}>{label}</div>
      <div className={classes.input_wrapper}>
        <input
          className={classNames(classes.input, classes.input_default)}
          onChange={(e) => inputHandler(e)}
          value={text}
        />
        <div className={classes.add_button} onClick={addColorHandler}>
          <div className={classes.chrest} />
        </div>
      </div>
      <div className={classes.colors_list}>
        {defaultItem.map((color, index) => (
          <React.Fragment key={index}>
            <div
              className={classes.color_form_active}
              onClick={() => deleteColorHandler(index)}
            >
              <input type={'checkbox'} className={classes.checkbox} />
              <label>{color}</label>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
