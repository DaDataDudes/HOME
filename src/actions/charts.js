export const GET_DATA_SUCCESS = 'GET_DATA';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';

const dummyData = [1, 2, 8, 4, 5];

export function getChartData() {
  return {
    type: GET_DATA_SUCCESS,
    data: dummyData,
  };
}

export function updateChartData() {
  const newData = dummyData.map(() => Math.random(100) * 10);
  return {
    type: UPDATE_DATA_SUCCESS,
    data: newData,
  };
}

