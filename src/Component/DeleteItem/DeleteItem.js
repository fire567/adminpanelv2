import classNames from 'classnames';
import React from 'react';
import { useCookies } from 'react-cookie';
import {
  deleteCar,
  deleteCategory,
  deleteCity,
  deleteOrderStatus,
  deletePoint,
  deleteRate,
  deleteRateType,
} from '../../Redux/actions/index';
import { useDispatch } from 'react-redux';
import classes from './DeleteItem.module.css';

const DeleteItem = ({
  isPopUpActive,
  setIsPopUpActive,
  linkName,
  deleteId,
  pageCount,
}) => {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies('access');
  const declineBtnHandler = () => {
    setIsPopUpActive(false);
  };

  const acceptBtnHandler = () => {
    if (linkName === 'cities') {
      dispatch(
        deleteCity(deleteId, cookie.access, setIsPopUpActive, pageCount)
      );
    } else if (linkName === 'places') {
      dispatch(
        deletePoint(deleteId, cookie.access, setIsPopUpActive, pageCount)
      );
    } else if (linkName === 'rates') {
      dispatch(
        deleteRate(deleteId, cookie.access, setIsPopUpActive, pageCount)
      );
    } else if (linkName === 'rates-types') {
      dispatch(
        deleteRateType(deleteId, cookie.access, setIsPopUpActive, pageCount)
      );
    } else if (linkName === 'cars-categories') {
      dispatch(
        deleteCategory(deleteId, cookie.access, setIsPopUpActive, pageCount)
      );
    } else if (linkName === 'orders-status') {
      dispatch(
        deleteOrderStatus(deleteId, cookie.access, setIsPopUpActive, pageCount)
      );
    } else if (linkName === 'cars-list') {
      dispatch(deleteCar(deleteId, cookie.access, setIsPopUpActive, pageCount));
    }
  };

  return (
    <div
      className={classNames(classes.popUp, {
        [classes.popUp_active]: isPopUpActive,
        [classes.popUp_closed]: !isPopUpActive,
      })}
    >
      <div className={classes.popUp_content}>
        <div className={classes.label}>
          Вы действительно хотите удалить сущность:
        </div>
        <div className={classes.label}>{deleteId} ?</div>
        <div className={classes.buttons_form}>
          <button className={classes.accept_btn} onClick={acceptBtnHandler}>
            Принять
          </button>
          <button className={classes.decline_btn} onClick={declineBtnHandler}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
