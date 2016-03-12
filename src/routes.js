import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import FormPage from 'containers/FormPage';
import Counter from 'containers/Counter';
import NotFound from 'containers/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="form" component={FormPage} />
    <Route path="counter" component={Counter} />
    <Route path="*" component={NotFound} />
  </Route>
);
