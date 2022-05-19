import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.links}>
        <li className={classes.link}>Главная страница</li>
        <li className={classes.link}>Ссылка</li>
      </div>
      <div className={classes.copiright}>Copyright © 2020 Simbirsoft</div>
    </div>
  );
};

export default Footer;
