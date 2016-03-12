import React, { PropTypes } from 'react';

const App = ({ children }) => (
  <div className="container">
    <h1>YARS</h1>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.element
};

export default App;
