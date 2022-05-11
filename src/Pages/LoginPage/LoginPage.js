import React, { useEffect, useState } from 'react';
import LoginInput from '../../Component/LoginInput/LoginInput';
import { useDispatch, useSelector } from 'react-redux';
import { postAuth } from '../../Redux/actions';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import classes from './LoginPage.module.css';

const LoginPage = () => {
  const [cookies, setCookie] = useCookies(['access']);
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [mailError, setMailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (auth && auth !== 'error') {
      setCookie(
        'access',
        auth.access_token,
        { path: '/' },
        { expires: auth.expires_in }
      );
    } else if (auth === 'error') {
      setInvalid(true);
    }
  }, [auth, isClicked]);

  useEffect(() => {
    if (cookies.access) {
      history.push('/main-page/cars-list');
    }
  }, [cookies]);

  const loginHandler = () => {
    if (!mail) {
      setMailError('Введите почту');
    }
    if (!password) {
      setPasswordError('Введите пароль');
    }
    if (password && mail) {
      dispatch(postAuth(mail, password));
    }

    setIsClicked(!isClicked);
  };

  return (
    <div className={classes.page_form}>
      <div className={classes.logo_form}>
        <div className={classes.logo}></div>
        <div className={classes.logo_name}>Need for drive</div>
      </div>
      <div className={classes.login_form}>
        <div className={classes.header}>Вход</div>
        <div className={classes.inputs_form}>
          <LoginInput
            label={'Почта'}
            placeHolder={'Введите почту...'}
            setText={setMail}
            value={mail}
            error={mailError}
            hideError={setMailError}
            setInvalid={setInvalid}
            type={'text'}
          />
          <LoginInput
            label={'Пароль'}
            placeHolder={'Введите пароль...'}
            setText={setPassword}
            value={password}
            error={passwordError}
            hideError={setPasswordError}
            setInvalid={setInvalid}
            type={'password'}
          />
        </div>
        <div className={classes.buttons_form}>
          <label className={classes.ask_for_request}>Запросить доступ</label>
          <button className={classes.login_btn} onClick={loginHandler}>
            Войти
          </button>
          {invalid && mail && password && (
            <div className={classes.invalid_data}>
              Неверная почта или пароль
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
