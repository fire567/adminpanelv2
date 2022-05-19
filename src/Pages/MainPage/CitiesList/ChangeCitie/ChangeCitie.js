import React, { useEffect, useState } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCity, changeCity } from '../../../../Redux/actions';
import { useCookies } from 'react-cookie';
import { setCitieChangeArr } from '../../../../consts';

const ChangeCitie = ({ match }) => {
  const [cookies, setCookie] = useCookies('access');
  const [changeArr, setChangeArr] = useState(null);
  const dispatch = useDispatch();
  const currentCity = useSelector((state) => state.currentCity);
  const [cityInput, setCityInput] = useState(null);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);

  useEffect(() => {
    if (currentCity) {
      setCitieChangeArr(
        setChangeArr,
        currentCity,
        setCityInput,
        cityInput,
        isNeedCheck,
        setIsNeedCheck
      );
    }
  }, [currentCity, cityInput, isNeedCheck]);

  useEffect(() => {
    dispatch(getCurrentCity(match.params.id));
  }, []);

  useEffect(() => {
    if (cityInput !== null) {
      dispatch(changeCity(match.params.id, cityInput, cookies.access));
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

export default ChangeCitie;
