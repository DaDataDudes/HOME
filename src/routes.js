import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import Choropleth from 'containers/Choropleth';
import HumanList from 'containers/HumanList';
import FormPage from 'containers/FormPage';
import ChartsD3 from 'containers/ChartsD3';
import NotFound from 'containers/NotFound';

export default (
  <Route path="/" component={App} history={browserHistory}>
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
    <Route path="choropleth" component={Choropleth} />
    <Route path="dashboard" component={Dashboard} >
      <IndexRoute component={ChartsD3} />
      <Route path="humanList" component={HumanList} />
    </Route>
    <Route path="form" component={FormPage} />
    <Route path="charts" component={ChartsD3} />
    <Route path="*" component={NotFound} />
  </Route>
);
