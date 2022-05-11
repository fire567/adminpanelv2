import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { postLogout, postAuth } from '../../Redux/actions';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
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

  return <div onClick={() => logOut()}>Выход</div>;
};

export default MainPage;
