import React from 'react';
import TextInput from '../TextInput/TextInput';
import PopUpOptions from '../PopUpOption/PopUpOptions';
import ColorPicker from '../ColorPicker/ColorPicler';
import classes from './ChangeCarContent.module.css';

const ChangeCarContent = ({
  currentCar,
  setName,
  name,
  setDescription,
  description,
  setPriceMin,
  priceMin,
  setPriceMax,
  priceMax,
  categoriesList,
  setCategoryId,
  categoryId,
  changeObj,
  setColors,
  isNeedCheck,
  setIsNeedCheck,
  number,
  setNumber,
}) => {
  return (
    <div className={classes.content}>
      <div className={classes.component_wrapper}>
        <TextInput
          defaultItem={
            currentCar && currentCar.data.name ? currentCar.data.name : null
          }
          label={'Название'}
          setItem={setName}
          currentItem={name}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      </div>
      <div className={classes.component_wrapper}>
        <TextInput
          defaultItem={
            currentCar && currentCar.data.description
              ? currentCar.data.description
              : null
          }
          label={'Описание'}
          setItem={setDescription}
          currentItem={description}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      </div>
      <div className={classes.component_wrapper}>
        <TextInput
          defaultItem={
            currentCar && currentCar.data.priceMin
              ? currentCar.data.priceMin
              : null
          }
          label={'Минимальная цена'}
          setItem={setPriceMin}
          currentItem={priceMin}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
          inputType={'number'}
        />
      </div>
      <div className={classes.component_wrapper}>
        <TextInput
          defaultItem={
            currentCar && currentCar.data.priceMax
              ? currentCar.data.priceMax
              : null
          }
          label={'Максимальная цена'}
          setItem={setPriceMax}
          currentItem={priceMax}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
          inputType={'number'}
          minPrice={changeObj.priceMin}
        />
      </div>
      <div className={classes.component_wrapper}>
        <PopUpOptions
          items={categoriesList.data}
          label={'Типы тарифов'}
          setItem={setCategoryId}
          currentItem={categoryId}
          defaultItem={
            currentCar && currentCar.data.categoryId
              ? currentCar.data.categoryId
              : null
          }
          isNeedCheck={isNeedCheck}
        />
      </div>
      <div className={classes.component_wrapper}>
        <TextInput
          defaultItem={
            currentCar && currentCar.data.number ? currentCar.data.number : null
          }
          label={'Номер'}
          setItem={setNumber}
          currentItem={number}
          isNeedCheck={isNeedCheck}
          setIsNeedCheck={setIsNeedCheck}
        />
      </div>
      <div className={classes.component_wrapper}>
        <ColorPicker
          label={'Цвета'}
          defaultItem={changeObj.colors}
          setColors={setColors}
        />
      </div>
    </div>
  );
};

export default ChangeCarContent;
