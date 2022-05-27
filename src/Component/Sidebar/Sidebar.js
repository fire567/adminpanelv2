import React from 'react';
import { links } from '../../consts';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router-dom';
import classes from './Sidebar.module.css';

const Sidebar = ({
  match,
  setCurrentLink,
  isOpened,
  setIsOpened,
  currentLink,
}) => {
  const history = useHistory();

  const linkHandler = (link) => {
    setCurrentLink(link.name);
    setIsOpened(false);
    history.push(`/main-page/${link.path}`);
  };

  const closeMunuHandler = () => {
    setIsOpened(false);
  };

  return (
    <div
      className={isOpened ? classes.sidebar_form_active : classes.sidebar_form}
    >
      <div className={classes.mobile_form}>
        <header className={classes.header}>
          <div className={classes.logo} />
          <div className={classes.product_name}>Need for car</div>
        </header>
        <div>
          {links.map((link) => (
            <li
              key={link.id}
              onClick={() => linkHandler(link)}
              className={classNames(classes.item, {
                [classes.item_active]: match.params.name === link.path,
              })}
            >
              <ReactSVG
                src={link.svg}
                className={classNames(classes.icon, {
                  [classes.icon_active]: match.params.name === link.path,
                })}
              />
              <div className={classes.item_name}>{link.name}</div>
            </li>
          ))}
        </div>
        <div className={classes.close} onClick={closeMunuHandler} />
      </div>
      <div className={classes.epty_side} onClick={closeMunuHandler} />
    </div>
  );
};

export default Sidebar;
