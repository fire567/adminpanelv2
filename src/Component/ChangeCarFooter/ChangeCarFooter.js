import React from 'react';
import { useDispatch } from 'react-redux';
import classes from './ChangeCarFooter.module.css';
import { changeCar, deleteCar, addCar } from '../../Redux/actions';
import history from '../../history';

const ChangeCarFooter = ({
  setIsNeedCheck,
  match,
  changeObj,
  cookies,
  percents,
}) => {
  const dispatch = useDispatch();

  const acceptBtnHandler = () => {
    setIsNeedCheck(true);
    if (percents === 100) {
      if (match.params.action === 'change') {
        dispatch(
          changeCar(
            match.params.id,
            changeObj.priceMin,
            changeObj.priceMax,
            changeObj.name,
            changeObj.description,
            changeObj.categoryId,
            changeObj.colors,
            changeObj.thumbnail,
            cookies.access
          )
        );
      } else if (match.params.action === 'add') {
        dispatch(
          addCar(
            changeObj.priceMin,
            changeObj.priceMax,
            changeObj.name,
            changeObj.description,
            changeObj.categoryId,
            changeObj.colors,
            changeObj.thumbnail,
            cookies.access
          )
        );
      }
    }
  };

  const declineBtnHandler = () => {
    history.goBack();
  };

  const deleteBtnHandler = () => {
    dispatch(deleteCar(match.params.id, cookies.access));
  };

  return (
    <div className={classes.footer}>
      <div className={classes.left_btns}>
        <button className={classes.accept_btn} onClick={acceptBtnHandler}>
          Сохранить
        </button>
        <button className={classes.decline_btn} onClick={declineBtnHandler}>
          Отменить
        </button>
      </div>
      <div className={classes.right_btns}>
        <button className={classes.delete_btn} onClick={deleteBtnHandler}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default ChangeCarFooter;
