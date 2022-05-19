import React, { useState, useEffect } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setRateTypeChangeArr } from '../../../../consts';
import { addRateType } from '../../../../Redux/actions';

const AddTariffType = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);
  const [unit, setUnit] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setChangeObj({
      unit,
      name,
    });
  }, [unit, name]);

  useEffect(() => {
    setRateTypeChangeArr(
      setChangeArr,
      null,
      name,
      setName,
      unit,
      setUnit,
      isNeedCheck,
      setIsNeedCheck
    );
  }, [name, unit, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.unit && changeObj.name) {
      dispatch(addRateType(changeObj.unit, changeObj.name, cookies.access));
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={`Добавить тип тарифа`} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default AddTariffType;
