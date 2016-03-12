export const GET_DATA_SUCCESS = 'GET_DATA';
const data = [1,2,3,4,5];

export function getChartData() {
  return { type: GET_DATA_SUCCESS, data, };
}

