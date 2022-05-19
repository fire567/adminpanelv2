import React from 'react';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import classes from './DateInput.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({
  label,
  setItem,
  currentItem,
  defaultItem,
  minTime,
  minDate,
}) => {
  const dateHandler = (item) => {
    setItem(item);
  };

  /*
    minTime={}
        maxTime={}
        minDate={}
    */

  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>{label}</div>
      <DatePicker
        className={classes.date}
        selected={currentItem ? currentItem : defaultItem}
        onChange={(item) => dateHandler(item)}
        showTimeSelect
        timeFormat='HH:mm'
        minTime={minTime ? minTime : setHours(setMinutes(new Date(), 0), 0)}
        maxTime={setHours(setMinutes(new Date(), 59), 23)}
        minDate={minDate && minDate}
        //disabled={isDisabled}
        dateFormat='dd/MM/yyyy HH:mm'
        placeholderText={'Введите дату и время'}
        calendarClassName={classes.calendar}
      />
    </div>
  );
};

export default DateInput;
