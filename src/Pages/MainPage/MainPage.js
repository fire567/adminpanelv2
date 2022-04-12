/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { postLogout, postAuth } from '../../Redux/actions';
import Sidebar from '../../Component/Sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import classes from './MainPage.module.css';

const MainPage = ({ match }) => {
  const [cookies, setCookie, removeCookies] = useCookies(['access']);
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <div className={classes.page_form}>
      <Sidebar match={match} />
    </div>
  );
};

export default MainPage;
