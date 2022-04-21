import React from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './Redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import MainPage from './Pages/MainPage/MainPage';
import { CookiesProvider } from 'react-cookie';
import classes from './App.module.css';

const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <CookiesProvider>
          <div className={classes.app}>
            <Route path='/' component={LoginPage} exact />
            <Route path='/main-page/:name' component={MainPage} exact />
          </div>
        </CookiesProvider>
      </Provider>
    </HashRouter>
  );
};

export default App;
