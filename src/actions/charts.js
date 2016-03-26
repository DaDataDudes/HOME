import choroInfo from 'seed/counties';

export const GET_DATA_SUCCESS = 'GET_DATA';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';
export const GET_CHOROINFO_SUCCESS = 'GET_CHOROINFO_SUCCESS';
export const UPDATE_CHOROINFO_SUCCESS = 'UPDATE_CHOROINFO_SUCCESS';

export function updateChoroInfo(county) {
  const info = choroInfo.find(name => name.id === county);
  return {
    type: UPDATE_CHOROINFO_SUCCESS,
    info,
  };
}

export function getChoroInfo() {
  return {
    type: GET_CHOROINFO_SUCCESS,
    choroInfo,
  };
}

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
