import React from 'react';
import d3 from 'd3';
import topojson from 'topojson';
import Svg from 'components/charts/Svg';

const hawaii = require('assets/hawaii-topojson.json');

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

function randomRgb() {
  return `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
}

const Map = ({ data, width = 500, height = 500 }) => {
  // if (!mapData || !data) {
  //   return false;
  // }

  const counties = topojson.feature(hawaii, hawaii.objects.hi_ct).features;

  console.log('mapData', counties);

  // counties.forEach(function(ct) {
  //   ct["name"] = ct_names_map[ct.id];
  //   ct["county"] = ct_counties_map[ct.id];
  //   console.log('counties ct: ', ct);
  // });


  return (
    <Svg width={width} height={height}>
      <g className="counties">
        {counties.map((county, i) => {
          console.log(county);
          return (
            <path key={i} d={pathGenerator(county)} className={quantize(randomNum())} fill={randomRgb()} />
          );
        })}
      </g>
    </Svg>
  );
};

Map.defaultProps = {};

Map.propTypes = {};

export default Map;
