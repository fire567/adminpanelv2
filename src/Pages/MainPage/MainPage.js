import React, { useEffect } from 'react';
import { withCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { postAuth } from '../../Redux/actions';
import { useHistory } from 'react-router-dom';

const MainPage = ({ cookies }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(postAuth(null, null));
    if (!cookies.cookies.access) {
      history.push('/');
    }
  }, [cookies.cookies]);

  const logOut = () => {
    cookies.remove('access');
  };

  return <div onClick={() => logOut()}>Выход</div>;
};

export default withCookies(MainPage);
