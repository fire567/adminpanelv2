import React, { useState, useEffect } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import Loading from '../../../../Component/Loading/Loading';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getCities } from '../../../../Redux/actions';
import { setPointChangeArr } from '../../../../consts';
import { addPoint } from '../../../../Redux/actions';

const AddPoint = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [name, setName] = useState(null);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    dispatch(getCities());
  }, []);

  useEffect(() => {
    if (cities) {
      setChangeObj({
        cityId: city !== null && city,
        address: address !== null && address,
        name: name !== null && name,
      });
    }
  }, [city, address, name]);

  useEffect(() => {
    if (cities) {
      setPointChangeArr(
        setChangeArr,
        null,
        address,
        setAddress,
        city,
        setCity,
        name,
        setName,
        isNeedCheck,
        setIsNeedCheck,
        cities
      );
    }
  }, [cities, address, city, name, isNeedCheck]);

  useEffect(() => {
    if (changeObj && changeObj.cityId && changeObj.address && changeObj.name) {
      dispatch(
        addPoint(
          changeObj.cityId,
          changeObj.address,
          changeObj.name,
          cookies.access
        )
      );
    }
  }, [isAcceptBtnTriggered]);

  return (
    <>
      <IdHeader string={`Добавить место`} />
      {changeArr ? <ChangeItem changeArr={changeArr} /> : <Loading />}
      <ChangeFooter
        setIsAcceptBtnTriggered={setIsAcceptBtnTriggered}
        isAcceptBtnTriggered={isAcceptBtnTriggered}
        setIsNeedCheck={setIsNeedCheck}
      />
    </>
  );
};

export default AddPoint;
