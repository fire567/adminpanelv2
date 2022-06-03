import React, { useState, useEffect } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import Loading from '../../../../Component/Loading/Loading';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import { addCity } from '../../../../Redux/actions';
import { setCitieAddArr } from '../../../../consts';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

const AddCitie = () => {
  const [cookies, setCookie] = useCookies('access');
  const dispatch = useDispatch();
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [changeArr, setChangeArr] = useState(null);

  useEffect(() => {
    setCitieAddArr(
      setChangeArr,
      setCityInput,
      cityInput,
      isNeedCheck,
      setIsNeedCheck
    );
  }, [isNeedCheck, cityInput]);

  useEffect(() => {
    if (cityInput) {
      dispatch(addCity(cityInput, cookies.access));
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={'Добавить город'} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default AddCitie;
