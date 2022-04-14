/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { postLogout, postAuth } from '../../Redux/actions';
import { useHistory } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  const ref = useRef(null);
  const secondref = useRef(null);
  const [cookies, setCookie, removeCookies] = useCookies(['access']);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpened, setIsOpened] = useState(false);

  const popUpHandler = () => {
    setIsOpened(!isOpened);
  };

  const isClosePopUp = (e) => {
    if (
      ref.current &&
      secondref.current.className !== e.target.className &&
      ref.current.className !== e.target.className
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    if (!cookies.access) {
      history.push('/');
    }
  }, [cookies]);

  const logOut = () => {
    dispatch(postAuth(null, null));
    dispatch(postLogout(cookies));
    removeCookies('access', { path: '/' });
    location.reload();
  };

  window.addEventListener('click', isClosePopUp);

  return (
    <div className={classes.header}>
      <div className={classes.search_icon}></div>
      <input className={classes.search_bar} placeholder={'Поиск ...'} />
      <div className={classes.notifications}>
        <div className={classes.notification_bell} />
        <div className={classes.notification_count} />
      </div>
      <div className={classes.user}>
        <div className={classes.avatar} />
        <div className={classes.user_name}>Admin</div>
        <div
          className={classes.popup_btn}
          onClick={popUpHandler}
          ref={secondref}
        />
      </div>
      {isOpened && (
        <div className={classes.popup} ref={ref}>
          <button className={classes.exit_btn} onClick={logOut}>
            Выход
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
