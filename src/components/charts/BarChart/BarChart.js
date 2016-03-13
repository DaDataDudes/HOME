import React from 'react';
import d3 from 'd3';
import Svg from 'components/charts/Svg';

const BarChart = ({ data, width = 500, height = 500 }) => {
  if (!data) {
    return false;
  }

  const x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 320]);

  const Rects = data.map((d, i) => (
    <rect
      key={i}
      fill="red"
      width={`${x(d)}px`}
      height="10px"
      y={20 * i}
    />
  ));

  return (
    <Svg width={width} height={height}>
      <g>
        {Rects}
      </g>
    </Svg>
  );
};

BarChart.defaultProps = {};

BarChart.propTypes = {};

export default BarChart;
