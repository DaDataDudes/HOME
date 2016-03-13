import React from 'react';

const Svg = ({ children, width, height }) => (
  <svg width={width} height={height}>
    {children}
  </svg>
);

Svg.defaultProps = {};

Svg.propTypes = {};

export default Svg;
