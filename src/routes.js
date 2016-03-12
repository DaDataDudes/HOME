import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import NotFound from 'containers/NotFound';

export default (
  <Route path="/" component={App} history={browserHistory}>
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="*" component={NotFound} />
  </Route>
);
