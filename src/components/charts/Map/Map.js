import React from 'react';
import d3 from 'd3';
import topojson from 'topojson';
import Svg from 'components/charts/Svg';

const hawaii = require('assets/hawaii-topojson.json');
let tool;

const quantize = d3.scale.quantize()
  .domain([0, 100])
  .range(d3.range(9).map(i => `q-${i}`));

const projection = d3.geo.albers()
  .center([0, 18.5])
  .rotate([157.967, -2.941])
  .scale(41284)
  .translate([228, 199]);

const pathGenerator = d3.geo.path()
  .projection(projection);

function randomNum(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function strokeColor() {
  return '#FFF';
}

function fillColor() {
  return '#C0C0C0';
}

const Map = ({ updateInfo, data, info, width = 500, height = 500 }) => {
  const counties = topojson.feature(hawaii, hawaii.objects.hi_ct).features;
  return (
    <div>
      <div className="county-info">
        <h1>{info.location}</h1>
      </div>
      <Svg width={width} height={height}>
        <g className="counties">
          {counties.map((county, i) => {
            return (
              <path key={i} d={pathGenerator(county)} name={county.id} fill={fillColor()} className={quantize(randomNum())} stroke={strokeColor()} onMouseOver={updateInfo} />
            );
          })}
        </g>
      </Svg>
    </div>
  );
};

Map.defaultProps = {};

Map.propTypes = {};

export default Map;
