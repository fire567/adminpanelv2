import React, { useEffect, useState } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getRateTypeId, addRate } from '../../../../Redux/actions';
import { setRateChangeArr } from '../../../../consts';

const AddTariff = ({ match }) => {
  const dispatch = useDispatch();
  const rateTypes = useSelector((state) => state.rateTypes);
  const [cookies, setCookies] = useCookies('access');
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [price, setPrice] = useState(null);
  const [rateType, setRateType] = useState(null);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    dispatch(getRateTypeId());
  }, []);

  useEffect(() => {
    if (rateTypes) {
      setChangeObj({
        rateTypeId: rateType && rateType,
        price: price !== null && price,
      });
    }
  }, [rateTypes, rateType, price]);

  useEffect(() => {
    if (rateTypes) {
      setRateChangeArr(
        setChangeArr,
        null,
        rateTypes,
        price,
        setPrice,
        rateType,
        setRateType,
        isNeedCheck,
        setIsNeedCheck
      );
    }
  }, [rateTypes, price, rateType, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.price && changeObj.rateTypeId) {
      dispatch(addRate(changeObj.rateTypeId, changeObj.price, cookies.access));
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={`Добавить тариф`} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default AddTariff;
