import React from 'react';
import orders from './assets/orders.svg';
import carsList from './assets/cars-list.svg';
import cities from './assets/cities.svg';
import places from './assets/places.svg';
import rates from './assets/rates.svg';
import ratesType from './assets/places.svg';
import carCategory from './assets/cities.svg';
import error from './assets/error.svg';
import PopUpOptions from './Component/PopUpOption/PopUpOptions';
import DateInput from './Component/DateInput/DateInput';
import ExtraOptions from './Component/ExtraOptions/ExtraOptions';
import { setHours, setMinutes } from 'date-fns';
import Price from './Component/Price/Price';
import TextInput from './Component/TextInput/TextInput';

export const links = [
  { id: '0', name: 'Заказы', svg: orders, path: 'orders' },
  { id: '1', name: 'Список авто', svg: carsList, path: 'cars-list' },
  { id: '2', name: 'Города', svg: cities, path: 'cities' },
  { id: '3', name: 'Места выдачи', svg: places, path: 'places' },
  { id: '4', name: 'Тарифы', svg: rates, path: 'rates' },
  { id: '5', name: 'Типы тарифов', svg: ratesType, path: 'rates-types' },
  {
    id: '6',
    name: 'Категории автомобилей',
    svg: carCategory,
    path: 'cars-categories',
  },
  { id: '7', name: 'Статусы заказов', svg: error, path: 'orders-status' },
];

export const extra = [
  { id: 0, name: 'Полный бак' },
  { id: 1, name: 'Детское кресло' },
  { id: 2, name: 'Правый руль' },
];

export const carSections = [
  { id: 0, text: 'Модель' },
  { id: 1, text: 'Мин. цена' },
  { id: 2, text: 'Макс.цена' },
  { id: 3, text: 'Изменить' },
  { id: 4, text: 'Удалить' },
];

export const citySections = [
  { id: 0, text: 'Город' },
  { id: 1, text: 'Изменить' },
  { id: 2, text: 'Удалить' },
];

export const pointSections = [
  { id: 0, text: 'Город' },
  { id: 1, text: 'Адрес' },
  { id: 1, text: 'Изменить' },
  { id: 2, text: 'Удалить' },
];

export const tariffSections = [
  { id: 0, text: 'Название' },
  { id: 1, text: 'Цена' },
  { id: 1, text: 'Изменить' },
  { id: 2, text: 'Удалить' },
];

export const tariffsTypeSections = [
  { id: 0, text: 'Название' },
  { id: 1, text: 'Длительность' },
  { id: 1, text: 'Изменить' },
  { id: 2, text: 'Удалить' },
];

export const CarCategorySections = [
  { id: 0, text: 'Название' },
  { id: 1, text: 'Описание' },
  { id: 2, text: 'Изменить' },
  { id: 3, text: 'Удалить' },
];

export const orderStatusessections = [
  { id: 0, text: 'Название' },
  { id: 1, text: 'Изменить' },
  { id: 2, text: 'Удалить' },
];

export const setOrderChangeArr = (
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
) => {
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
          defaultItem={currentPrice ? currentPrice : currentOrder.data.price}
        />
      ),
    },
  ]);
};

export const setCitieChangeArr = (
  setChangeArr,
  currentCity,
  setCityInput,
  cityInput,
  isNeedCheck,
  setIsNeedCheck
) => {
  setChangeArr([
    {
      id: 0,
      component: (
        <TextInput
          defaultItem={currentCity.data.name}
          label={'Название'}
          setItem={setCityInput}
          currentItem={cityInput}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
  ]);
};

export const setCitieAddArr = (
  setChangeArr,
  setCityInput,
  cityInput,
  isNeedCheck,
  setIsNeedCheck
) => {
  setChangeArr([
    {
      id: 0,
      component: (
        <TextInput
          defaultItem={null}
          label={'Название'}
          setItem={setCityInput}
          currentItem={cityInput}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
  ]);
};

export const setPointChangeArr = (
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
) => {
  setChangeArr([
    {
      id: 0,
      component: (
        <PopUpOptions
          items={cities.data}
          label={'Город'}
          setItem={setCity}
          currentItem={city}
          defaultItem={currentPoint ? currentPoint.data.cityId : null}
          isNeedCheck={isNeedCheck}
        />
      ),
    },
    {
      id: 1,
      component: (
        <TextInput
          defaultItem={currentPoint ? currentPoint.data.address : null}
          label={'Адрес'}
          setItem={setAddress}
          currentItem={address}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
    {
      id: 2,
      component: (
        <TextInput
          defaultItem={currentPoint ? currentPoint.data.name : null}
          label={'Название'}
          setItem={setName}
          currentItem={name}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
  ]);
};

export const setRateChangeArr = (
  setChangeArr,
  currentRate,
  rateTypeId,
  price,
  setPrice,
  rateType,
  setRateType,
  isNeedCheck,
  setIsNeedCheck
) => {
  setChangeArr([
    {
      id: 0,
      component: (
        <PopUpOptions
          items={rateTypeId.data}
          label={'Типы тарифов'}
          setItem={setRateType}
          currentItem={rateType}
          defaultItem={currentRate && currentRate.data.rateTypeId}
          isNeedCheck={isNeedCheck}
        />
      ),
    },
    {
      id: 1,
      component: (
        <TextInput
          defaultItem={currentRate && currentRate.data.price}
          label={'Цена'}
          setItem={setPrice}
          currentItem={price}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
  ]);
};

export const setRateTypeChangeArr = (
  setChangeArr,
  currentRateType,
  name,
  setName,
  unit,
  setUnit,
  isNeedCheck,
  setIsNeedCheck
) => {
  setChangeArr([
    {
      id: 0,
      component: (
        <TextInput
          defaultItem={currentRateType && currentRateType.data.name}
          label={'Тариф'}
          setItem={setName}
          currentItem={name}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
    {
      id: 1,
      component: (
        <TextInput
          defaultItem={currentRateType && currentRateType.data.unit}
          label={'Название'}
          setItem={setUnit}
          currentItem={unit}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
  ]);
};

export const setCarCategoryChangeArr = (
  setChangeArr,
  currentCarCategory,
  description,
  setDescription,
  name,
  setName,
  isNeedCheck,
  setIsNeedCheck
) => {
  setChangeArr([
    {
      id: 0,
      component: (
        <TextInput
          defaultItem={
            currentCarCategory && currentCarCategory.data.description
          }
          label={'Описание'}
          setItem={setDescription}
          currentItem={description}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
    {
      id: 1,
      component: (
        <TextInput
          defaultItem={currentCarCategory && currentCarCategory.data.name}
          label={'Название'}
          setItem={setName}
          currentItem={name}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
  ]);
};

export const setOrderStatusChangeArr = (
  setChangeArr,
  currentOrderStatus,
  name,
  setName,
  isNeedCheck,
  setIsNeedCheck
) => {
  setChangeArr([
    {
      id: 0,
      component: (
        <TextInput
          defaultItem={currentOrderStatus && currentOrderStatus.data.name}
          label={'Название'}
          setItem={setName}
          currentItem={name}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      ),
    },
  ]);
};

export const setPrice = (
  currentOrder,
  setCurrentPrice,
  currentRate,
  extraObj,
  currentEndDate,
  currentSinceDate
) => {
  if (currentOrder) {
    if (currentRate || currentOrder.data.rateId) {
      setCurrentPrice(
        calculatePrice(
          currentRate,
          currentEndDate,
          currentSinceDate,
          currentOrder
        )
      );
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
};

const calculatePrice = (
  currentRate,
  currentEndDate,
  currentSinceDate,
  currentOrder
) => {
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
