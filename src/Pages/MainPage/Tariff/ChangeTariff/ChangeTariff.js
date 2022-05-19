import React, { useEffect, useState } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import { useCookies } from 'react-cookie';
import {
  changeRate,
  getCurrentRate,
  getRateTypeId,
} from '../../../../Redux/actions';
import { setRateChangeArr } from '../../../../consts';
import { useDispatch, useSelector } from 'react-redux';

const ChangeTariff = ({ match }) => {
  const dispatch = useDispatch();
  const currentRate = useSelector((state) => state.currentRate);
  const rateTypes = useSelector((state) => state.rateTypes);
  const [cookies, setCookies] = useCookies('access');
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [price, setPrice] = useState(null);
  const [rateType, setRateType] = useState(null);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    dispatch(getCurrentRate(match.params.id));
    dispatch(getRateTypeId());
  }, []);

  useEffect(() => {
    if (currentRate && rateTypes) {
      setChangeObj({
        rateTypeId: rateType ? rateType : currentRate.data.rateTypeId,
        price: price !== null ? price : currentRate.data.price,
      });
    }
  }, [currentRate, rateTypes, rateType, price]);

  useEffect(() => {
    if (currentRate && rateTypes) {
      setRateChangeArr(
        setChangeArr,
        currentRate,
        rateTypes,
        price,
        setPrice,
        rateType,
        setRateType,
        isNeedCheck,
        setIsNeedCheck
      );
    }
  }, [currentRate, rateTypes, price, rateType, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.price && changeObj.rateTypeId) {
      dispatch(
        changeRate(
          match.params.id,
          changeObj.rateTypeId,
          changeObj.price,
          cookies.access
        )
      );
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={`Заказ № ${match.params.id}`} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default ChangeTariff;
