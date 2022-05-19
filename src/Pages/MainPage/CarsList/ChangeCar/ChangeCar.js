import React, { useEffect, useState } from 'react';
import Loading from '../../../../Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ChangeCar.module.css';
import { getCategoriesList, getCurrentCar } from '../../../../Redux/actions';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ProgressBar from '../../../../Component/ProgressBar/ProgressBar';
import ChangeCarContent from '../../../../Component/ChangeCarContent/ChangeCarContent';
import ChangeCarFooter from '../../../../Component/ChangeCarFooter/ChangeCarFooter';

const ChangeCar = ({ match }) => {
  const [cookies, setCookie] = useCookies('access');
  const dispatch = useDispatch();
  const currentCar = useSelector((state) => state.currentCar);
  const categoriesList = useSelector((state) => state.categoriesList);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [changeObj, setChangeObj] = useState(null);
  const [colors, setColors] = useState([]);
  const [percents, setPercents] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  //const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);

  useEffect(() => {
    dispatch(getCurrentCar(match.params.id));
    dispatch(getCategoriesList());
  }, []);

  useEffect(() => {
    if (currentCar && categoriesList)
      setChangeObj({
        priceMin: priceMin !== null ? priceMin : currentCar.data.priceMin,
        priceMax: priceMax !== null ? priceMax : currentCar.data.priceMax,
        name: name !== null ? name : currentCar.data.name,
        description:
          description !== null ? description : currentCar.data.description,
        categoryId:
          categoryId !== null ? categoryId : currentCar.data.categoryId,
        colors: colors,
        thumbnail: thumbnail !== null ? thumbnail : currentCar.data.thumbnail,
      });
  }, [
    currentCar,
    priceMin,
    priceMax,
    name,
    description,
    categoriesList,
    colors,
    thumbnail,
    categoryId,
  ]);

  useEffect(() => {
    if (changeObj) {
      let count = 0;

      Object.values(changeObj).map((item) => {
        if (item && !Array.isArray(item)) {
          count += 14.28;
        } else if (Array.isArray(item) && item.length > 0) {
          count += 14.28;
        }
      });
      setPercents(Math.round(count));
    }
  }, [changeObj]);

  useEffect(() => {
    if (currentCar && currentCar.data.colors.length > 0) {
      setColors(currentCar.data.colors);
    }
  }, [currentCar]);

  return currentCar && categoriesList && changeObj ? (
    <>
      <div className={classes.header}>Список авто</div>
      <div className={classes.cars_content}>
        <ProgressBar
          currentCar={currentCar}
          percents={percents}
          setThumbnail={setThumbnail}
        />
        <div className={classes.content_side}>
          <div className={classes.content_header}>Настройки автомобиля</div>
          <ChangeCarContent
            currentCar={currentCar}
            setName={setName}
            name={name}
            setDescription={setDescription}
            description={description}
            setPriceMin={setPriceMin}
            priceMin={priceMin}
            setPriceMax={setPriceMax}
            priceMax={priceMax}
            categoriesList={categoriesList}
            setCategoryId={setCategoryId}
            categoryId={categoryId}
            changeObj={changeObj}
            setColors={setColors}
            isNeedCheck={isNeedCheck}
            setIsNeedCheck={setIsNeedCheck}
          />
          <ChangeCarFooter
            setIsNeedCheck={setIsNeedCheck}
            match={match}
            changeObj={changeObj}
            cookies={cookies}
            percents={percents}
          />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ChangeCar;
