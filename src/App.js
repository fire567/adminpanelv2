import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './Redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import MainRouts from './Component/MainRouts/MainRouts';
import { CookiesProvider } from 'react-cookie';
import history from './history';
import classes from './App.module.css';

const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL} history={history}>
      <Provider store={store}>
        <CookiesProvider>
          <div className={classes.app}>
            <MainRouts />
          </div>
        </CookiesProvider>
      </Provider>
    </HashRouter>
  );
};

export default App;
