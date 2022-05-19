import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
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
import PopUpOptions from '../../../../Component/PopUpOption/PopUpOptions';
import DateInput from '../../../../Component/DateInput/DateInput';
import ExtraOptions from '../../../../Component/ExtraOptions/ExtraOptions';
import Price from '../../../../Component/Price/Price';
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
  }, []);

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
      setChangeArr([
        {
          id: 0,
          component: (
            <PopUpOptions
              items={cities.data}
              setItem={setCurrentCitie}
              currentItem={currentCitie}
              defaultItem={currentOrder.data.cityId}
              label={'Город'}
              isNeedCheck={isNeedCheck}
            />
          ),
        },
        {
          id: 1,
          component: (
            <PopUpOptions
              items={validPoints ? validPoints : pointsList.data}
              setItem={setCurrentPoint}
              currentItem={currentPoint}
              defaultItem={currentCitie ? null : currentOrder.data.pointId}
              label={'Адрес'}
              isNeedCheck={isNeedCheck}
            />
          ),
        },
        {
          id: 2,
          component: (
            <PopUpOptions
              items={orderStatuses.data}
              setItem={setCurrentStatus}
              currentItem={currentStatus}
              defaultItem={currentOrder.data.orderStatusId}
              label={'Статус'}
              isNeedCheck={isNeedCheck}
            />
          ),
        },
        {
          id: 3,
          component: (
            <DateInput
              label={'С:'}
              setItem={setCurrentSinceDate}
              currentItem={currentSinceDate}
              defaultItem={currentOrder.data.dateFrom}
            />
          ),
        },
        {
          id: 4,
          component: (
            <DateInput
              label={'По:'}
              setItem={setCurrentEndDate}
              currentItem={currentEndDate}
              defaultItem={currentOrder.data.dateTo}
              minTime={currentSinceDate && currentSinceDate.getTime()}
              maxTime={setHours(setMinutes(new Date(), 59), 23)}
              minDate={
                currentSinceDate ? currentSinceDate : currentOrder.data.dateFrom
              }
            />
          ),
        },
        {
          id: 5,
          component: (
            <PopUpOptions
              items={rates.data}
              label={'Тариф'}
              setItem={setCurrentRate}
              currentItem={currentRate}
              defaultItem={currentOrder.data.rateId}
              isNeedCheck={isNeedCheck}
            />
          ),
        },
        {
          id: 6,
          component: (
            <ExtraOptions
              defaultItem={extraObj}
              setIsFullTank={setIsFullTank}
              isFullTank={isFullTank}
              setIsChair={setIsChair}
              isChair={isChair}
              setIsRightWheel={setIsRightWheel}
              isRightWheel={isRightWheel}
            />
          ),
        },
        {
          id: 7,
          component: (
            <Price
              defaultItem={
                currentPrice ? currentPrice : currentOrder.data.price
              }
            />
          ),
        },
      ]);
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

  const calculatePrice = () => {
    const miliseconds =
      Date.parse(currentEndDate ? currentEndDate : currentOrder.data.dateTo) -
      Date.parse(
        currentSinceDate ? currentSinceDate : currentOrder.data.dateFrom
      );
    if (
      currentRate
        ? currentRate.price
        : currentOrder.data.rateId
        ? currentOrder.data.rateId.price === 7
        : false
    ) {
      return Math.floor(
        (miliseconds / (1000 * 60)) * currentRate
          ? currentRate.price
          : currentOrder.data.rateId
          ? currentOrder.data.rateId.price
          : 0 + currentOrder.data.carId
          ? currentOrder.data.carId.priceMin
          : 0
      );
    }
    return Math.floor(
      (miliseconds / (1000 * 60 * 60 * 24 * 31)) * currentRate
        ? currentRate.price
        : currentOrder.data.rateId.price + currentOrder.data.carId
        ? currentOrder.data.carId.priceMin
        : 0
    );
  };

  useEffect(() => {
    if (currentOrder) {
      if (currentRate || currentOrder.data.rateId) {
        setCurrentPrice(calculatePrice);
      }
      if (extraObj && extraObj.isFullTank === true) {
        setCurrentPrice((prev) => Math.floor(prev + 500));
      } else {
        setCurrentPrice((prev) => Math.floor(prev + 0));
      }
      if (extraObj && extraObj.isChair === true) {
        setCurrentPrice((prev) => Math.floor(prev + 200));
      } else {
        setCurrentPrice((prev) => Math.floor(prev + 0));
      }
      if (extraObj && extraObj.isRightWheel === true) {
        setCurrentPrice((prev) => Math.floor(prev + 1500));
      } else {
        setCurrentPrice((prev) => Math.floor(prev + 0));
      }
    }
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
    } else console.log(changeObj);
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
