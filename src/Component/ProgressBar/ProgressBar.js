import React from 'react';
import classes from './ProgressBar.module.css';

const ProgressBar = ({ currentCar, percents, setThumbnail, changeObj }) => {
  const picHandler = (e) => {
    let file = e.target.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onloadend = function () {
      setThumbnail({
        mimetype: '',
        originalname: file.name,
        path: reader.result,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  const isCategoryId = () => {
    if (currentCar && currentCar.data['categoryId']) {
      return currentCar.data.categoryId.name;
    } else if (changeObj && changeObj.categoryId) {
      return changeObj.categoryId.name;
    }
    return 'Пусто';
  };

  return (
    <div className={classes.progressbar_side}>
      <div
        className={classes.img}
        style={{
          backgroundImage: `url(${
            currentCar && currentCar.data.thumbnail
              ? currentCar.data.thumbnail.path
              : changeObj.thumbnail && changeObj.thumbnail.path
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '60%',
          backgroundPosition: 'center',
        }}
      />
      <div className={classes.car_name}>
        {currentCar && currentCar.data.name
          ? currentCar.data.name
          : changeObj.name
          ? changeObj.name
          : 'Пусто'}
      </div>
      <div className={classes.car_description}>{isCategoryId()}</div>
      <div className={classes.input_form}>
        <div className={classes.label}>{'Выберете файл...'}</div>
        <input
          type={'file'}
          className={classes.input}
          onChange={(e) => picHandler(e)}
        />
        <div className={classes.search_btn}>Обзор</div>
      </div>
      <div className={classes.progressbar_form}>
        <div className={classes.inf_form}>
          <div className={classes.inf_label}>Заполнено</div>
          <div className={classes.inf_percents}>{percents}%</div>
        </div>
        <div className={classes.progressbar}>
          <div className={classes.progress} style={{ width: `${percents}%` }} />
        </div>
      </div>
      <div className={classes.description_form}>
        <div className={classes.desc_label}>Описание</div>
        <div className={classes.description}>
          {currentCar && currentCar.data.description
            ? currentCar.data.description
            : changeObj.description
            ? changeObj.description
            : 'Пусто'}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
