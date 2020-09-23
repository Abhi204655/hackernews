import React from 'react';
import ReactDOM from 'react-dom';
import './globals.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './store';


import * as serviceWorker from './serviceWorker';

const renderApp = () => {

  const initialState = {};
  const store = configureStore(initialState);

  store.dispatch({ type: '@hnClone/@@init' });
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

renderApp();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
