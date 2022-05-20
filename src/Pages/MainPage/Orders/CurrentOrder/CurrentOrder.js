import classNames from 'classnames';
import React from 'react';
import Moment from 'react-moment';
import { extra } from '../../../../consts';
import { useHistory } from 'react-router-dom';
import classes from './CurrentOrder.module.css';
import { changeCurrentOrderStatus } from '../../../../Redux/actions';
import { useDispatch } from 'react-redux';

const CurrentOrder = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  const onChangeLink = () => {
    history.push(`orders/change/${item.id}`);
  };

  const changeStatusToCancel = () => {
    dispatch(
      changeCurrentOrderStatus(item.id, {
        name: 'Отмененные',
        id: '5e26a1f5099b810b946c5d8c',
      })
    );
  };

  const changeStatusToDone = () => {
    dispatch(
      changeCurrentOrderStatus(item.id, {
        name: 'Завершенные',
        id: '6278c4ba9535e90010bfaf36',
      })
    );
  };

  return (
    <div className={classes.order}>
      <div className={classes.desc_side}>
        {item.carId ? (
          <div
            className={classes.img}
            style={{
              backgroundImage: `url(${item.carId.thumbnail.path})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '60%',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <div className={classes.empty_img}>Нет фото</div>
        )}

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
        <button
          className={classNames(classes.button, classes.accept)}
          onClick={changeStatusToDone}
        >
          <div className={classes.accept_icon} />
          Готово
        </button>
        <button
          className={classNames(classes.button, classes.decline)}
          onClick={changeStatusToCancel}
        >
          <div className={classes.decline_icon} />
          Отмена
        </button>
        <button
          className={classNames(classes.button, classes.change)}
          onClick={onChangeLink}
        >
          <div className={classes.change_icon} />
          Изменить
        </button>
      </div>
    </div>
  );
};

export default CurrentOrder;
