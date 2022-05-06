import React from 'react';
import { links } from '../../consts';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router-dom';
import classes from './Sidebar.module.css';

const Sidebar = ({ match, setCurrentLink, isOpened, setIsOpened }) => {
  const history = useHistory();

  const linkHandler = (link) => {
    history.push(`/main-page/${link.path}`);
    setCurrentLink(link.name);
  };

  const closeMunuHandler = () => {
    setIsOpened(false);
  };

  return (
    <div
      className={isOpened ? classes.sidebar_form_active : classes.sidebar_form}
    >
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
  );
};

export default Sidebar;
