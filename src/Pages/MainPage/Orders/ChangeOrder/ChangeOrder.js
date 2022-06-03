import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCities,
  getCurrentOrder,
  getOrderStatuses,
  getRates,
  getPointsList,
  changeCurrentOrder,
} from '../../../../Redux/actions';
import IdHeader from '../../../../Component/IdHeader/IdHeader';
import ChangeItem from '../../../../Component/ChangeItem/ChangeItem';
import ChangeFooter from '../../../../Component/ChangeFooter/ChangeFooter';
import { setOrderChangeArr, setPrice } from '../../../../consts';
import Loading from '../../../../Component/Loading/Loading';
import {
  reduceCities,
  reduceRates,
  reducePointsList,
  reduceCurrentOrder,
  reduceOrderStatuses,
} from '../../../../Redux/reducers';

const ChangeOrder = ({ match }) => {
  const dispatch = useDispatch();
  const mapState = (state) => ({
    pointsList: reducePointsList(state),
    currentOrder: reduceCurrentOrder(state),
    cities: reduceCities(state),
    orderStatuses: reduceOrderStatuses(state),
    rates: reduceRates(state),
  });
  const { pointsList, currentOrder, cities, orderStatuses, rates } =
    useSelector(mapState);
  const [changeArr, setChangeArr] = useState(null);
  const [currentCitie, setCurrentCitie] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [validPoints, setValidPoints] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentSinceDate, setCurrentSinceDate] = useState(null);
  const [currentEndDate, setCurrentEndDate] = useState(null);
  const [isFullTank, setIsFullTank] = useState(null);
  const [isChair, setIsChair] = useState(null);
  const [isRightWheel, setIsRightWheel] = useState(null);
  const [extraObj, setExtraObj] = useState(null);
  const [currentRate, setCurrentRate] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [changeObj, setChangeObj] = useState(null);
  const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);

  useEffect(() => {
    dispatch(getCities());
    dispatch(getPointsList());
    dispatch(getCurrentOrder(match.params.id));
    dispatch(getOrderStatuses());
    dispatch(getRates());
  }, [match]);

  const validPointsHandler = (id) => {
    const filteredArr = pointsList.data.filter((point) => {
      return point.cityId && point.cityId.id === id;
    });

    return filteredArr;
  };

  useEffect(() => {
    if (currentCitie) {
      setCurrentPoint(null);
      setValidPoints(validPointsHandler(currentCitie.id));
    } else if (currentOrder) {
      setCurrentPoint(null);
      setValidPoints(
        validPointsHandler(
          currentOrder.data.cityId ? currentOrder.data.cityId.id : 0
        )
      );
    }
  }, [currentCitie, currentOrder]);

  useEffect(() => {
    if (currentSinceDate) {
      setCurrentEndDate(currentSinceDate);
    }
  }, [currentSinceDate]);

  useEffect(() => {
    if (currentOrder) {
      setExtraObj({
        isFullTank:
          isFullTank !== null ? isFullTank : currentOrder.data.isFullTank,
        isChair:
          isChair !== null ? isChair : currentOrder.data.isNeedChildChair,
        isRightWheel:
          isRightWheel !== null ? isRightWheel : currentOrder.data.isRightWheel,
      });
    }
  }, [currentOrder, isRightWheel, isFullTank, isChair]);

  useEffect(() => {
    if (
      cities &&
      pointsList &&
      currentOrder &&
      rates &&
      orderStatuses &&
      extraObj
    ) {
      setOrderChangeArr(
        setChangeArr,
        setCurrentCitie,
        currentCitie,
        currentOrder,
        isNeedCheck,
        validPoints,
        pointsList,
        setCurrentPoint,
        currentPoint,
        orderStatuses,
        setCurrentStatus,
        currentStatus,
        setCurrentSinceDate,
        currentSinceDate,
        setCurrentEndDate,
        currentEndDate,
        setCurrentRate,
        currentRate,
        extraObj,
        setIsFullTank,
        isFullTank,
        setIsChair,
        isChair,
        setIsRightWheel,
        isRightWheel,
        currentPrice,
        cities,
        rates
      );
    }
  }, [
    cities,
    currentCitie,
    pointsList,
    currentPoint,
    currentOrder,
    currentStatus,
    currentSinceDate,
    currentEndDate,
    currentRate,
    rates,
    validPoints,
    extraObj,
    currentPrice,
    isNeedCheck,
  ]);

  useEffect(() => {
    if (currentOrder) {
      setChangeObj({
        currentPoint: currentCitie ? currentPoint : currentOrder.data.pointId,
        currentStatus: currentStatus
          ? currentStatus
          : currentOrder.data.orderStatusId,
        currentSinceDate: currentSinceDate
          ? currentSinceDate
          : currentOrder.data.dateFrom,
        currentEndDate: currentEndDate
          ? currentEndDate
          : currentOrder.data.dateTo,
        currentRate: currentRate ? currentRate : currentOrder.data.rateId,
        currentCitie: currentCitie ? currentCitie : currentOrder.data.cityId,
        currentPrice: currentPrice ? currentPrice : currentOrder.data.price,
        isChair: isChair ? isChair : currentOrder.data.isNeedChildChair,
        isFullTank: isFullTank ? isFullTank : currentOrder.data.isFullTank,
        isRightWheel: isRightWheel
          ? isRightWheel
          : currentOrder.data.isRightWheel,
      });
    }
  }, [
    currentPoint,
    currentOrder,
    currentStatus,
    currentSinceDate,
    currentEndDate,
    currentRate,
    currentCitie,
    currentPrice,
    extraObj,
    currentPrice,
  ]);

  useEffect(() => {
    setPrice(
      currentOrder,
      setCurrentPrice,
      currentRate,
      extraObj,
      currentEndDate,
      currentSinceDate
    );
  }, [currentOrder, currentRate, extraObj, currentSinceDate, currentEndDate]);

  useEffect(() => {
    if (
      changeObj &&
      changeObj.currentPoint &&
      changeObj.currentStatus &&
      changeObj.currentSinceDate &&
      changeObj.currentEndDate &&
      changeObj.currentRate &&
      changeObj.currentCitie &&
      changeObj.currentPrice
    ) {
      dispatch(
        changeCurrentOrder(
          match.params.id,
          changeObj.currentStatus,
          changeObj.currentCitie,
          changeObj.currentPoint,
          changeObj.currentSinceDate,
          changeObj.currentEndDate,
          changeObj.currentRate,
          changeObj.currentPrice,
          changeObj.isFullTank,
          changeObj.isChair,
          changeObj.isRightWheel
        )
      );
    } else;
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

export default ChangeOrder;
