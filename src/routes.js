import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import FormPage from 'containers/FormPage';
import NotFound from 'containers/NotFound';

export default (
  <Route path="/" component={App} history={browserHistory}>
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="form" component={FormPage} />
    <Route path="*" component={NotFound} />
  </Route>
);
