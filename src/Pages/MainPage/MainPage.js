import React, { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import Content from '../../Component/Content/Content';
import ChangeCar from './CarsList/ChangeCar/ChangeCar';
import AddCar from './CarsList/AddCar/AddCar';
import classes from './MainPage.module.css';
import { Redirect } from 'react-router-dom';
import { links } from '../../consts';
import ErrorPage from '../ErrorPage/ErrorPage';

const MainPage = ({ match }) => {
  const [currentLink, setCurrentLink] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    links.map((link) => {
      if (link.path === match.params.name) {
        setCurrentLink(link.name);
      }
    });
  }, [match]);

  const isOpenHandler = () => {
    setIsOpened(true);
  };

  const showCarsContent = () => {
    if (match.params.action === 'change') {
      return <ChangeCar match={match} />;
    } else if (match.params.action === 'add') {
      return <AddCar match={match} />;
    }
    return <Redirect to={'/main-page/error'} component={ErrorPage} />;
  };

  return (
    <div className={classes.page_form}>
      <Sidebar
        match={match}
        setCurrentLink={setCurrentLink}
        setIsOpened={setIsOpened}
        isOpened={isOpened}
        currentLink={currentLink}
      />
      <div className={classes.content_block}>
        <Header />
        {match.params.action && match.params.name === 'cars-list' ? (
          showCarsContent()
        ) : (
          <div className={classes.content}>
            <Content currentLink={currentLink} match={match} />
            <div
              className={
                isOpened ? classes.burger_btn_hidden : classes.burger_btn
              }
              onClick={isOpenHandler}
            >
              <div className={classes.burger} />
              <div className={classes.burger} />
              <div className={classes.burger} />
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
