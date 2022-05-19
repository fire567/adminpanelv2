import React, { useEffect, useState } from 'react';
import Loading from '../../../../Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import classes from './AddCar.module.css';
import { getCategoriesList } from '../../../../Redux/actions';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ProgressBar from '../../../../Component/ProgressBar/ProgressBar';
import ChangeCarContent from '../../../../Component/ChangeCarContent/ChangeCarContent';
import ChangeCarFooter from '../../../../Component/ChangeCarFooter/ChangeCarFooter';

const AddCar = ({ match }) => {
  const [cookies, setCookie] = useCookies('access');
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categoriesList);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [changeObj, setChangeObj] = useState(null);
  const [colors, setColors] = useState([]);
  const [percents, setPercents] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  //const [isAcceptBtnTriggered, setIsAcceptBtnTriggered] = useState(false);
  const [isNeedCheck, setIsNeedCheck] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesList());
  }, []);

  useEffect(() => {
    if (categoriesList)
      setChangeObj({
        priceMin,
        priceMax,
        name,
        description,
        categoryId,
        colors,
        thumbnail,
      });
  }, [
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

  return categoriesList && changeObj ? (
    <>
      <div className={classes.header}>Список авто</div>
      <div className={classes.cars_content}>
        <ProgressBar
          currentCar={null}
          percents={percents}
          setThumbnail={setThumbnail}
          changeObj={changeObj}
        />
        <div className={classes.content_side}>
          <div className={classes.content_header}>Настройки автомобиля</div>
          <ChangeCarContent
            currentCar={null}
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

export default AddCar;
