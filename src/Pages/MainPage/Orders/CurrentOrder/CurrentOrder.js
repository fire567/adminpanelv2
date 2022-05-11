import classNames from 'classnames';
import React from 'react';
import Moment from 'react-moment';
import { extra } from '../../../../consts';
import classes from './CurrentOrder.module.css';

const CurrentOrder = ({ item }) => {
  const checkboxStyle = (extra) => {
    if (extra.id === 0 && item.isFullTank === true) {
      return classes.opt_extra_form_active;
    } else if (extra.id === 1 && item.isNeedChildChair === true) {
      return classes.opt_extra_form_active;
    } else if (extra.id === 2 && item.isRightWheel === true) {
      return classes.opt_extra_form_active;
    }

    return classes.opt_extra_form;
  };

  return (
    <div className={classes.order}>
      <div className={classes.desc_side}>
        <div
          className={classes.img}
          style={{
            backgroundImage: `url(${item.carId && item.carId.thumbnail.path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '60%',
            backgroundPosition: 'center',
          }}
        />
        <div className={classes.description}>
          <div className={classes.string}>
            <b>{item.carId ? item.carId.name : 'none'}</b> в{' '}
            <b>{item.pointId ? item.pointId.name : 'none'}</b>,
            <b>{item.pointId ? item.pointId.address : 'none'}</b>
          </div>
          <div className={classes.string}>
            <Moment date={item.dateFrom} format={'DD.MM.YYYY hh:mm'} /> -{' '}
            <Moment date={item.dateTo} format={'DD.MM.YYYY hh:mm'} />
          </div>
          <div className={classes.string}>
            Цвет: <b>{item.color}</b>
          </div>
        </div>
      </div>
      <div className={classes.extra}>
        {extra.map((item) => (
          <div className={checkboxStyle(item)} key={item.id}>
            <input type='checkbox' className={classes.checkbox} />
            <label className={classes.opt_extra}>{item.name}</label>
          </div>
        ))}
      </div>
      <div className={classes.price}>{item.price} ₽</div>
      <div className={classes.buttons}>
        <button className={classNames(classes.button, classes.accept)}>
          <div className={classes.accept_icon} />
          Готово
        </button>
        <button className={classNames(classes.button, classes.decline)}>
          <div className={classes.decline_icon} />
          Отмена
        </button>
        <button className={classNames(classes.button, classes.change)}>
          <div className={classes.change_icon} />
          Изменить
        </button>
      </div>
    </div>
  );
};

export default CurrentOrder;
