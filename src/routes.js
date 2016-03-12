import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Login from 'containers/Login';
import Home from 'containers/Home';
import NotFound from 'containers/NotFound';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <IndexRoute component={Home} />
    <Route path="*" component={NotFound} />
  </Route>
);
