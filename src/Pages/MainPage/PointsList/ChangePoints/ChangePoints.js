import React, { useEffect, useState } from 'react';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import Loading from '../../../../Component/Loading/Loading';
import {
  getCurrentPoint,
  getCities,
  changePoint,
} from '../../../../Redux/actions';
import { setPointChangeArr } from '../../../../consts';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

const ChangePoints = ({ match }) => {
  const [cookies, setCookies] = useCookies('access');
  const dispatch = useDispatch();
  const currentPoint = useSelector((state) => state.currentPoint);
  const cities = useSelector((state) => state.cities);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [name, setName] = useState(null);
  const [changeArr, setChangeArr] = useState(null);
  const [changeObj, setChangeObj] = useState(null);

  useEffect(() => {
    dispatch(getCurrentPoint(match.params.id));
    dispatch(getCities());
  }, []);

  useEffect(() => {
    if (currentPoint && cities) {
      setPointChangeArr(
        setChangeArr,
        currentPoint,
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
  }, [currentPoint, cities, address, city, name, isNeedCheck]);

  useEffect(() => {
    if (currentPoint) {
      setChangeObj({
        cityId: city !== null ? city : currentPoint.data.cityId,
        address: address !== null ? address : currentPoint.data.address,
        name: name !== null ? name : currentPoint.data.name,
      });
    }
  }, [currentPoint, city, address, name]);

  useEffect(() => {
    if (
      changeObj &&
      changeObj.address !== '' &&
      changeObj.name !== '' &&
      changeObj.cityId
    ) {
      dispatch(
        changePoint(
          match.params.id,
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

export default ChangePoints;
