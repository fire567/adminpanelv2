import React, { useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import Content from '../../Component/Content/Content';
import classes from './MainPage.module.css';

const MainPage = ({ match }) => {
  const [currentLink, setCurrentLink] = useState('Заказы');
  const [isOpened, setIsOpened] = useState(false);

  const isOpenHandler = () => {
    setIsOpened(true);
  };

  return (
    <div className={classes.page_form}>
      <Sidebar
        match={match}
        setCurrentLink={setCurrentLink}
        setIsOpened={setIsOpened}
        isOpened={isOpened}
      />
      <div className={classes.content_block}>
        <Header />
        <div className={classes.content}>
          <Content currentLink={currentLink} />
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
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
