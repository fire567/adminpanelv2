import React, { useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import Content from '../../Component/Content/Content';
import classes from './MainPage.module.css';

const MainPage = ({ match }) => {
  const [currentLink, setCurrentLink] = useState('Заказы');

  return (
    <div className={classes.page_form}>
      <Sidebar match={match} setCurrentLink={setCurrentLink} />
      <div className={classes.content_block}>
        <Header />
        <div className={classes.content}>
          <Content currentLink={currentLink} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
