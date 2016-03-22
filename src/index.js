import Firebase from 'firebase';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from 'routes';
import configureStore from 'store';
import { FIREBASE_URL } from 'config';
import 'normalize.css';
import 'styles/app.css';

const store = configureStore({
  firebase: new Firebase(FIREBASE_URL),
});
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
