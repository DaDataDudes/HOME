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

// .q0-9 { fill:'rgb(247,251,255)'; }
// .q1-9 { fill:'rgb(222,235,247)'; }
// .q2-9 { fill:'rgb(198,219,239)'; }
// .q3-9 { fill:'rgb(158,202,225)'; }
// .q4-9 { fill:'rgb(107,174,214)'; }
// .q5-9 { fill:'rgb(66,146,198)'; }
// .q6-9 { fill:'rgb(33,113,181)'; }
// .q7-9 { fill:'rgb(8,81,156)'; }
// .q8-9 { fill:'rgb(8,48,107)';

function strokeColor() {
  return '#FFF';
}

function fillColor(total) {
  if (!total) {
    return '#C0C0C0';
  }
  const color = +total.total;
    if (color > 9000){
      return 'rgb(8,48,107)';
    }
    if (color > 8000){
      return 'rgb(8,81,156)';
    }
    if (color > 7000){
      return 'rgb(33,113,181)';
    }
    if (color > 6000){
      return 'rgb(66,146,198)';
    }
    if (color > 5000){
      return 'rgb(107,174,214)';
    }
    if (color > 4000){
      return 'rgb(158,202,225)';
    }
    if (color > 3000){
      return 'rgb(198,219,239)';
    }
    if (color > 2000){
      return 'rgb(222,235,247)';
    }
    if (color > 1000){
      return 'rgb(247,251,255)';
    }
    return '#C0C0C0';
  }


const Map = ({ updateInfo, totals, info, width = 500, height = 500 }) => {
  const counties = topojson.feature(hawaii, hawaii.objects.hi_ct).features;
  if (!totals) {
    return <div></div>;
  }
  return (
    <div>
      <div className="county-info">
        <h1>{info.location}</h1>
      </div>
      <Svg width={width} height={height}>
        <g className="counties">
          {counties.map((county, i) => {
            return (
              <path key={i} d={pathGenerator(county)} name={county.id} fill={fillColor(totals[i])} className={quantize(randomNum())} stroke={strokeColor()} onMouseOver={updateInfo} />
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
