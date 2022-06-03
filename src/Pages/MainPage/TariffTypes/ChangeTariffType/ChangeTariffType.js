import React, { useState, useEffect } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentRateType, changeRateType } from '../../../../Redux/actions';
import { setRateTypeChangeArr } from '../../../../consts';

const ChangeTariffType = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const currentRateType = useSelector((state) => state.currentRateType);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);
  const [unit, setUnit] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    dispatch(getCurrentRateType(match.params.id));
  }, [match]);

  useEffect(() => {
    if (currentRateType) {
      setChangeObj({
        unit: unit !== null ? unit : currentRateType.data.unit,
        name: name !== null ? name : currentRateType.data.name,
      });
    }
  }, [currentRateType, unit, name]);

  useEffect(() => {
    if (currentRateType) {
      setRateTypeChangeArr(
        setChangeArr,
        currentRateType,
        name,
        setName,
        unit,
        setUnit,
        isNeedCheck,
        setIsNeedCheck
      );
    }
  }, [currentRateType, name, unit, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.unit !== '' && changeObj.name !== '') {
      dispatch(
        changeRateType(
          match.params.id,
          changeObj.unit,
          changeObj.name,
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

export default ChangeTariffType;
